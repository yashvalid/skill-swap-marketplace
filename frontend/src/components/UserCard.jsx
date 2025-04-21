import React, { useContext, useState } from 'react';
import { MapPinIcon, MessageSquareIcon, UserPlusIcon } from 'lucide-react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

export function UserCard({ user }) {
  const [showForm, setShowForm] = useState(false);
  const [offersSkill, setOffersSkill] = useState("");
  const [requestsSkill, setRequestsSkill] = useState("");
  const { userData } = useContext(UserDataContext)

  const handleRequestSwap = async (userId) => {
    const reqSwap = {
      fromUser: userData._id,
      toUser: userId,
      offersSkill,
      requestsSkill
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/skillswap/request-swap`,
        reqSwap, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Swap request sent:', response.data);
      setShowForm(false);
    } catch (error) {
      console.error('Error sending swap request:', error);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <img
          alt=""
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-medium text-gray-900 truncate">
                {user.fullname?.firstname || 'Unknown'} {user.fullname?.lastname || 'User'}
              </h4>
              <p className="text-sm text-gray-500">{user.role || 'No role specified'}</p>
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 mr-1" />
            {user.location || 'Location not specified'}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500 line-clamp-2">{user.bio || 'No bio available'}</p>
      <div className="mt-4">
        <h5 className="text-xs font-medium text-gray-500 mb-2">Skills:</h5>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(user.skillsOffered) && user.skillsOffered.length > 0 ? (
            user.skillsOffered.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
              >
                {skill.name || skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500">No skills offered</span>
          )}
        </div>
      </div>
      <div className="mt-3">
        <h5 className="text-xs font-medium text-gray-500 mb-2">Learning:</h5>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(user.skillsNeeded) && user.skillsNeeded.length > 0 ? (
            user.skillsNeeded.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-500">No skills needed</span>
          )}
        </div>
      </div>
      <div className="mt-4 flex space-x-3">
        <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <MessageSquareIcon className="h-4 w-4 mr-1" />
          Message
        </button>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <UserPlusIcon className="h-4 w-4 mr-1" />
          Request Swap
        </button>
      </div>
      {showForm && (
        <div className="mt-4 border-t pt-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Request Swap</h5>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Skill to Offer"
              value={offersSkill}
              onChange={(e) => setOffersSkill(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Skill to Request"
              value={requestsSkill}
              onChange={(e) => setRequestsSkill(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <button
              onClick={() => handleRequestSwap(user._id)}
              className="w-full px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}