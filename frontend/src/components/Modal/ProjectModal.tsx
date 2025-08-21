// components/Modal/ProjectModal.tsx
import React, { useEffect } from 'react';
import { FcOpenedFolder } from 'react-icons/fc';

interface Project {
  id: number;
  title: string;
  body: string;
  status: string;
  image?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  isOpen, 
  onClose 
}) => {
  // Handle escape key and click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('modal-backdrop')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
       
      {/* <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"> */}
      <div className="bg-white flex flex-col h-full max-h-[90vh] rounded-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-indigo-50 to-blue-50 flex-shrink-0 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900 pr-8">{project.title}</h2>
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
          {/* Project Image */}
          <div className="mb-6">
            {project.image ? (
              <img
                src={`/storage/${project.image}`}
                alt={project.title}
                className="w-full h-64 object-fit rounded-lg shadow-md"
              />
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center">
                <FcOpenedFolder className="text-8xl opacity-60" />
              </div>
            )}
          </div>

          {/* Project Status */}
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              project.status === '1'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {project.status === '1' ? '✅ Active' : '⏸️ Inactive'}
            </span>
            {/* <span className="text-sm text-gray-500">ID: #{project.id}</span> */}
          </div>

          {/* Project Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {project.body}
            </p>
          </div>

          {/* Project Dates */}
          {(project.start_date || project.end_date) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.start_date && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">Start Date</div>
                    <div className="text-lg font-semibold text-blue-900">
                      {formatDate(project.start_date)}
                    </div>
                  </div>
                )}
                {project.end_date && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">End Date</div>
                    <div className="text-lg font-semibold text-green-900">
                      {formatDate(project.end_date)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Project Metadata */}
          <div className="px-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className='bg-green-50 p-4 rounded-lg'>
                <span className="text-gray-500">Created:</span>
                <span className="ml-2 text-gray-900">
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className='bg-green-50 p-4 rounded-lg'>
                <span className="text-gray-500">Last Updated:</span>
                <span className="ml-2 text-gray-900">
                  {new Date(project.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
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