
import React from 'react';
import { BsEmojiGrin } from 'react-icons/bs';

interface ViewProjectModalProps<T = any> {
  item: T | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewProjectModal = <T,>({ 
  item, 
  isOpen, 
  onClose 
}: ViewProjectModalProps<T>) => {
  if (!isOpen || !item) return null;

return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
       
      {/* <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"> */}
      <div className="bg-white flex flex-col h-full max-h-[90vh] rounded-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-indigo-50 to-blue-50 flex-shrink-0 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900 pr-8">Oops! Sorry <BsEmojiGrin/></h2>
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-neutral-900 text-base md:text-lg text-justify mb-6">
            Specializing in modern web development with proficiency in 
            React, Laravel, JavaScript, and responsive design. 
            I combine technical expertise with creative problem-solving to 
            build applications that are both functional and visually appealing.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            type="button"
            className="cursor-pointer px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Close
          </button>
          {/* <button 
            type="button"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Edit Project
          </button> */}
          <button 
            type="button"
            className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Visit Site
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};