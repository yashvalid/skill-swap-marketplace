import React, { useContext } from 'react';
import { MessageSquareIcon, UserPlusIcon, MessageSquareX } from 'lucide-react';
import { swapReqData } from '../context/SwapReqContext';
import axios from 'axios';

export function MatchCard({ match }) {
  
  const { setSwapRequests } = useContext(swapReqData);

  const handleReject = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/skillswap/reject-request-swap`,
        {
          params: { requestId: match._id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.status === 201) 
        setSwapRequests(prevReq => prevReq.filter(req => req._id !== match._id));
      
    } catch (err) {
      console.log("error ", err);
    }
  };

  const acceptRequest = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/skillswap/accept-request-swap`,
        {
          params: { requestId: match._id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if(response.status === 201)
        setSwapRequests(prevReq => prevReq.filter(req => req._id !== match._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <img
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                {match?.fromUser?.fullname?.firstname || 'Unknown User'}
              </h4>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleReject}
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <MessageSquareX className="h-4 w-4 mr-1" />
                Reject
              </button>
              <button
                onClick={acceptRequest}
                className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <UserPlusIcon className="h-4 w-4 mr-1" />
                Accept
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {match?.fromUser?.bio || 'No bio available.'}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">Can teach:</div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                  {match.offersSkill}
                </span>
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">Wants to learn:</div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                  {match.requestsSkill}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}