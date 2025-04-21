import React, { useContext, useEffect } from 'react'
import Header from '../components/Header';
import LandingPage from '../pages/LandingPage'
import SkillCategories from '../pages/SkillCategories'
import HowItWorks from './HowItWorks';


const Home = () => {

    return (

        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1">
                <LandingPage />
                <SkillCategories />
                <HowItWorks />
            </main>
        </div>

    )
}

export default Home

