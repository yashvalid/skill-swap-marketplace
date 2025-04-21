import React from 'react'
import {
    CodeIcon,
    MusicIcon,
    PaletteIcon,
    BookOpenIcon,
    CameraIcon,
    LanguagesIcon,
  } from 'lucide-react'

function SkillCategories() {

    const categories = [
        {
          name: 'Programming',
          icon: CodeIcon,
          bgColor: 'bg-blue-100',
          iconColor: 'text-blue-600',
          count: 342,
        },
        {
          name: 'Music',
          icon: MusicIcon,
          bgColor: 'bg-purple-100',
          iconColor: 'text-purple-600',
        },
        {
          name: 'Art & Design',
          icon: PaletteIcon,
          bgColor: 'bg-pink-100',
          iconColor: 'text-pink-600',
        },
        {
          name: 'Academic',
          icon: BookOpenIcon,
          bgColor: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
        },
        {
          name: 'Photography',
          icon: CameraIcon,
          bgColor: 'bg-green-100',
          iconColor: 'text-green-600',
        },
        {
          name: 'Languages',
          icon: LanguagesIcon,
          bgColor: 'bg-red-100',
          iconColor: 'text-red-600',
        },
      ]

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Browse Categories
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Discover skills to swap
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Browse our most popular categories or search for something specific
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <div key={category.name} className="col-span-1">
                <a href="#" className="block group">
                  <div
                    className={`rounded-lg ${category.bgColor} px-5 py-4 text-center`}
                  >
                    <category.icon
                      className={`h-10 w-10 mx-auto ${category.iconColor}`}
                    />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      {category.name}
                    </h3>
                    
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillCategories
