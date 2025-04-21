import React, { useState } from "react";
import { PlusIcon, Trophy } from "lucide-react";
import axios from "axios";

export function SkillForm({getSkills}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/skill/add-skills`,
            {
                skill : name,
                des : description
            },
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(response.status === 201){
            console.log("skill added " , response.data.skills);
            getSkills();
        }
    } catch(err){
        console.log(err);
    }
    setName("");
    setDescription("");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add a New Skill</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="skill-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Skill Name
          </label>
          <input
            type="text"
            id="skill-name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Web Development"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Briefly describe your experience with this skill..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Skill
        </button>
      </form>
    </div>
  );
}
