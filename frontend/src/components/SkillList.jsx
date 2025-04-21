import React, { useState } from "react";
import { SkillCard } from "./SkillCard";
import { SearchIcon } from "lucide-react";
import axios from "axios";

export function SkillList({ skills = [], setSkills }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = skills.filter(
    (skill) =>
      skill.skillname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.skillToLearn?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      skill.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteSkill = async (skillId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/skill/delete-skill`,
        {
          skillId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        setSkills((prevSkills) => prevSkills.filter((skill) => skill._id !== skillId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900"> Skills : </h3>
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {filteredSkills.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {skills.length === 0
              ? "You haven't added any skills yet. Use the form to add your first skill."
              : "No skills match your search."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSkills.map((skill, idx) => (
            <SkillCard
              key={idx}
              skill={skill}
              deleteSkill={deleteSkill}
            />
          ))}
        </div>
      )}
    </div>
  );
}
