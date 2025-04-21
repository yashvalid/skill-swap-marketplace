import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';

export function ConversationList({ users, selectedId, setSelectedConversation }) {
  const [searchUser, setSearchUser] = useState("");

  const filteredUser = users.filter(user => user.otherUser.fullname.firstname.toLowerCase().includes(searchUser.toLowerCase()) || user.otherUser.fullname.lastname.toLowerCase().includes(searchUser.toLowerCase()));


  return (
    <div className="w-80 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
        <div className="mt-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchUser}
            onChange={e => setSearchUser(e.target.value)}
            placeholder="Search messages"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="overflow-y-auto flex-1">
        {filteredUser.map((user) => (
          <div
            key={user.otherUser._id}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedId === user.otherUser._id ? 'bg-indigo-50' : ''
              }`}
            onClick={() => {setSelectedConversation(user)}}
          >
            <div className="flex items-start">
              <img
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {user.otherUser.fullname.firstname}{' '}
                    {user.otherUser.fullname.lastname}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {/* Add timestamp or other metadata here */}
                  </span>
                </div>
                <span className="text-xs text-indigo-600">
                  {user.requestedSkill}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}