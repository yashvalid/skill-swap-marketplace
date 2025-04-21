import React from 'react'
import {
  ClipboardListIcon,
  UsersIcon,
  MessageSquareIcon,
  AwardIcon,
} from 'lucide-react'
const steps = [
  {
    name: 'List your skills',
    description:
      'Add skills you can teach others to your profile. Be specific about your experience level and teaching style.',
    icon: ClipboardListIcon,
  },
  {
    name: 'Find matches',
    description:
      'Browse or search for skills you want to learn. Our algorithm will suggest potential matches based on mutual interests.',
    icon: UsersIcon,
  },
  {
    name: 'Connect & arrange',
    description:
      'Message your matches to discuss details and schedule your skill swap sessions. Agree on format, duration, and goals.',
    icon: MessageSquareIcon,
  },
  {
    name: 'Swap & rate',
    description:
      'Share your knowledge and learn something new! After your session, leave feedback to build your reputation.',
    icon: AwardIcon,
  },
]
export default function HowItWorks() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            How it works
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple steps to start swapping
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform makes it easy to exchange skills with others in your
            community
          </p>
        </div>
        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {steps.map((step, stepIdx) => (
              <div key={step.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </div>
  )
}
