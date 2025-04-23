import React, { useContext, useState, useEffect } from 'react';
import { CameraIcon, PencilIcon, PlusIcon, XIcon } from 'lucide-react';
import { UserDataContext } from '../context/UserContext';
import { SkillList } from '../components/SkillList';
import axios from 'axios';

export function UserProfilePage() {
  const { userData } = useContext(UserDataContext);
  const [skills, setSkills] = useState([{
    skillname: "",
    description: ""
  }])

  const [skillsToLearn, setSkillToLearn] = useState([{
    skillname: "",
    description: ""
  }])

  const [profile, setProfile] = useState({
    name: '',
    role: '',
    location: '',
    bio: '',
    skillsToOffer: [],
    skillsToLearn: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newSkillToOffer, setNewSkillToOffer] = useState({ name: '', description: '' });
  const [newSkillToLearn, setNewSkillToLearn] = useState({ name: '', description: '' });
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [showLearnForm, setShowLearnForm] = useState(false);

  
  useEffect(() => {
    if (userData) {
      setProfile({
        name: `${userData.fullname.firstname} ${userData.fullname.lastname}`,
        role: userData.role,
        location: userData.location,
        bio: userData.bio,
        skillsToOffer: userData.skillsOffered || [],
        skillsToLearn: userData.skillsNeeded || [],
      });
    }
  }, [userData]);

  const getSkills = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/skill/get-skills`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSkills(response.data.skills);
    } catch (err) {
      console.log(err);
    }
  };

  const getSkillsToLearn = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/skill/get-skillsToLearn`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSkillToLearn(response.data.skills);
      console.log("response get skills", response.data.skills);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSkills();
    getSkillsToLearn();
  }, [])

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleAddSkillToOffer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/skill/add-skills`,
        {
          skill: newSkillToOffer.name,
          des: newSkillToOffer.description
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      if (response.status === 201)
        getSkills()
    } catch (err) {
      console.log(err);
    }
    setNewSkillToOffer({ name: '', description: '' });
    setShowOfferForm(false);
  };

  const handleAddSkillToLearn = async (e) => {
    e.preventDefault();
    try {
      if (!newSkillToLearn.name) return;
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/skill/skills-to-learn`,
        {
          skill: newSkillToLearn.name,
          des: newSkillToLearn.description
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        getSkillsToLearn();
    } catch (err) {
      console.log(err);
    }
    setNewSkillToLearn({ name: '', description: '' });
    setShowLearnForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your profile information and skills</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="pt-16 pb-8 px-8">
          {isEditing ? (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={profile.name}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  defaultValue={profile.role}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  defaultValue={profile.location}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  rows={4}
                  defaultValue={profile.bio}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>
                  <p className="text-gray-600">{profile.role}</p>
                  <p className="text-gray-500 text-sm mt-1">{profile.location}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit Profile
                </button>
              </div>
              <p className="mt-4 text-gray-600">{profile.bio}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Skills I Can Teach</h3>

          <button
            onClick={() => setShowOfferForm(true)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Skill
          </button>
        </div>
        {showOfferForm && (
          <form onSubmit={handleAddSkillToOffer} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skill Name</label>
              <input
                type="text"
                value={newSkillToOffer.name}
                onChange={(e) => setNewSkillToOffer({ ...newSkillToOffer, name: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., JavaScript"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newSkillToOffer.description}
                onChange={(e) => setNewSkillToOffer({ ...newSkillToOffer, description: e.target.value })}
                rows={2}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Briefly describe your experience with this skill"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowOfferForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add Skill
              </button>
            </div>
          </form>
        )}
        <div className="space-y-4">
          <SkillList
            skills={skills}
            setSkills={setSkills}
          />
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Skills I Want to Learn</h3>
          <button
            onClick={() => setShowLearnForm(true)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Skill
          </button>
        </div>
        {showLearnForm && (
          <form onSubmit={handleAddSkillToLearn} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skill Name</label>
              <input
                type="text"
                value={newSkillToLearn.name}
                onChange={(e) => setNewSkillToLearn({ ...newSkillToLearn, name: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., UI/UX Design"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Why do you want to learn this?</label>
              <textarea
                value={newSkillToLearn.description}
                onChange={(e) => setNewSkillToLearn({ ...newSkillToLearn, description: e.target.value })}
                rows={2}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Explain why you're interested in learning this skill"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowLearnForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add Skill
              </button>
            </div>
          </form>
        )}
        <div className="space-y-4">
          <SkillList
            skills={skillsToLearn}
            setSkills={setSkillToLearn}
          />
        </div>
      </div>
    </div>
  );
}