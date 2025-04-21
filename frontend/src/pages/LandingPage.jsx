import React, { useEffect } from 'react'
import { SearchIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { SocketDataContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'

const LandingPage = () => {
  const { socket } = useContext(SocketDataContext);
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    if(socket && userData)
    socket.emit('join', { userId: userData._id });
  },[])
  
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 px-4 sm:px-6 lg:px-8">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Share your skills,</span>{' '}
                <span className="block text-indigo-600 xl:inline">
                  learn something new
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Join our community of skill-swappers. Teach what you know, learn
                what you don't. No money required - just exchange your
                knowledge.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/how-it-works"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    How it works
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 py-5">
            <div className="max-w-md mx-auto lg:mx-0">
              <div className="relative mt-1 flex items-center">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="What do you want to learn?"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <button className="inline-flex items-center border border-transparent rounded-md px-2 text-indigo-600 focus:outline-none">
                    <SearchIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
          alt="People collaborating"
        />
      </div>
    </div>
  )
}

export default LandingPage
