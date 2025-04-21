import React, { useEffect, useState } from 'react'
import { SkillForm } from '../components/SkillForm'
import { SkillList } from '../components/SkillList'
import axios from 'axios'

const MySkills = () => {
  const [skills, setSkills ] = useState([{
    skillname : "",
    description : ""
  }])
  const getSkills = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/skill/get-skills`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSkills(response.data.skills); 
      console.log("response get skills" ,response.data.skills);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    getSkills();
  },[])
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">My Skills</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your skills and expertise. Add new skills or update existing
          ones.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <SkillForm
            getSkills={getSkills}
          />
        </div>
        <div className="lg:col-span-2">
          <SkillList
            skills={skills}
            setSkills={setSkills}
          />
        </div>
      </div>
    </div>
  )
}

export default MySkills
