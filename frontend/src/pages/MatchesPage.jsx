import React, { useContext, useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { MatchCard } from '../components/MatchCard';
import { swapReqData } from '../context/SwapReqContext';
import axios from 'axios';

export function MatchesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { swapRequests, setSwapRequests } = useContext(swapReqData);

  useEffect(() => {
    const fetchSwaps = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/skillswap/get-pending-swaps`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log('all pending swaps', response.data);
        if (response.status === 201) {
          setSwapRequests(response.data.pendingSwaps);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSwaps();
  }, [setSwapRequests]);

  // Ensure swapRequests is always an array
  const filteredMatches = (swapRequests || []).filter((match) =>
    match?.fromUser?.fullname?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match?.offersSkill?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match?.requestsSkill?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Skill swap requests</h2>
        <p className="mt-1 text-sm text-gray-500">
          Requests from people who want to learn your skills and can teach you new ones.
        </p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium text-gray-900">Requests</h3>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {swapRequests?.length || 0} found
            </span>
          </div>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No matches found for your search.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMatches.map((match, idx) => (
              <MatchCard key={idx} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}