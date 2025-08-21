
// components/Modal/TestimonyModal.jsx
import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';

interface Testimony {
  id: number;
  name: string;
  email: string;
  title: string;
  location: string;
  testimonial: string;
  image?: string;
  image_url?: string;
  companyname?: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface TestimonyModalProps {
  testimony: Testimony | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TestimonyModal: React.FC<TestimonyModalProps> = ({ 
  testimony, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen || !testimony) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Backdrop */}
    <div 
      className="fixed inset-0 bg-black bg-opacity-50" 
      onClick={onClose}
    />
    
    {/* Modal Content - Changed structure for better scrolling */}
    <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
      {/* Fixed Header */}
      <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-indigo-50 to-blue-50 flex-shrink-0 rounded-t-4xl">
        <h2 className="text-2xl font-bold text-gray-900 pr-8">
          Testimonial Details
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
          type="button"
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable Content - Added min-height to ensure content overflows */}
      <div className="flex-1 overflow-y-auto p-6" style={{ minHeight: '400px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Image */}
          <div className="space-y-4">
            {testimony.image && (
              <div className="w-full h-64 rounded-xl overflow-hidden">
                <img
                  src={`/storage/${testimony.image}`}
                  alt={testimony.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Status Badge */}
            <div className="flex justify-center">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                testimony.status === 'approved' ? 'bg-green-100 text-green-800' :
                testimony.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {testimony.status.charAt(0).toUpperCase() + testimony.status.slice(1)}
              </span>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-2">Additional Notes</h4>
                <p className="text-sm text-gray-600">
                  This client was extremely satisfied with the work delivered. 
                  The project was completed on time and within budget. 
                  Communication was excellent throughout the entire process.
                </p>
              </div>

          </div>

          {/* Right Column - Details */}
          <div className="space-y-4">
            {/* Personal Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {testimony.name}
              </h3>
              <p className="text-lg text-gray-600 mb-1">{testimony.title}</p>
              {testimony.companyname && (
                <p className="text-md text-gray-500 mb-1">@ {testimony.companyname}</p>
              )}
              {/* <p className="text-md text-gray-500 mb-4">📍 {testimony.location}</p> */}
              <p className="flex items-center text-md text-gray-500 mb-4">
                <IoLocationSharp className='mr-1 text-slate-700 flex-shrink-0'/>
                {testimony.location}
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 mb-2">Contact Information</h4>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {testimony.email}
              </p>
            </div>

            {/* Testimonial */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Testimonial</h4>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimony.testimonial}"
                </p>
              </div>
            </div>

            {/* Add more content to test scrolling */}
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-2">Project Details</h4>
                <p className="text-sm text-gray-600 mb-2">Duration: 3 months</p>
                <p className="text-sm text-gray-600 mb-2">Technologies: React, Laravel, MySQL</p>
                <p className="text-sm text-gray-600">Budget: $5,000</p>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 flex-shrink-0 rounded-b-3xl">
        <button
          onClick={onClose}
          className="cursor-pointer px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          Close
        </button>
        
        {/* Additional actions if needed */}
        <button className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200">
          Contact Client
        </button>
      </div>
    </div>
  </div>
);
};