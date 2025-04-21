import React, { useState } from "react";
import { PencilIcon, TrashIcon, CheckIcon, XIcon } from "lucide-react";

export function SkillCard({skill, deleteSkill}) {
  

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                {skill.skillname || skill.skillToLearn}
              </h4>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={()=> deleteSkill(skill._id)}
                className="text-gray-400 hover:text-red-500"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">{skill.description}</p>
    </div>
  );
}
