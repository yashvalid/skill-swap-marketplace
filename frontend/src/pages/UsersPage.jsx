import React, { useEffect, useState } from 'react'
import { SearchIcon, FilterIcon } from 'lucide-react'
import { UserCard } from '../components/UserCard.jsx'
import axios from 'axios'


export function UsersPage() {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.fullname.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.skillsOffered.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            user.skillsNeeded.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
        
        return matchesSearch
    })

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/all-users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.status === 201)
                    setUsers(response.data.users);
                console.log("all users ",response.data)
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchUsers();
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Platform Users</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Discover users on SkillSwap and connect with potential skill-exchange partners.
                </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                    <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-medium text-gray-900">Community Members</h3>
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {users.length} users
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                {filteredUsers.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No users found matching your search criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUsers.map((user) => (
                            <UserCard key={user._id} user={user} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}