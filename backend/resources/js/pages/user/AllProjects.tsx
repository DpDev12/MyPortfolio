import { SidebarInset, SidebarInsetContent, SidebarInsetHeader } from '@/components/ui/sidebar';
import { Link, router } from '@inertiajs/react';
import { Fallback } from '@radix-ui/react-avatar';
import React, { useEffect } from 'react';
import { FaBackward, FaXbox } from 'react-icons/fa';
import { FcOpenedFolder } from 'react-icons/fc';

// import { useProjectModal } from '@/hooks/useModal';
import { useProjectModal } from '@/hooks/useGenericModal';
import { ProjectModal } from '@/components/Modal/ProjectModal';


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

interface Props {
    allprojects?: {
        data: Project[];
    };
}

export default function AllProjects({ allprojects }: Props) {

  const projects = allprojects?.data || [];

  const { isOpen, project, openProjectModal, closeModal } = useProjectModal();

return (
  <SidebarInset>
    <SidebarInsetContent>
      <SidebarInsetHeader>
        <div className='flex justify-between items-center p-4 border-b rounded bg-white'>
          <h1 className="text-3xl font-bold text-gray-800">
            All Projects 
            <span className="text-lg font-normal text-gray-500 ml-2">({projects.length})</span>
          </h1>
          
          <button 
            onClick={() => router.visit('/#project')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </SidebarInsetHeader>
      
      <div className="flex-1 overflow-y-auto bg-white rounded">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <FcOpenedFolder className="text-8xl mb-6 opacity-60" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Projects Found</h2>
            <p className="text-gray-500 text-lg max-w-md">
              Start creating your first project to see it displayed here.
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  {/* Project Image */}
                  <div className="h-48 w-full overflow-hidden bg-gray-100">
                    {project.image ? (
                      <img
                        src={`/storage/${project.image}`}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                        <FcOpenedFolder className="text-6xl opacity-60" />
                      </div>
                    )}
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1" title={project.title}>
                        {project.title}
                      </h3>
                      <span className={`ml-2 px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                        project.status === '1'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {project.status === '1' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed" title={project.body}>
                      {project.body}
                    </p>
                    
                    {/* Project Dates */}
                    {(project.start_date || project.end_date) && (
                      <div className="text-xs text-gray-500 mb-4 space-y-1">
                        {project.start_date && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium">Start:</span>
                            <span>{new Date(project.start_date).toLocaleDateString()}</span>
                          </div>
                        )}
                        {project.end_date && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium">End:</span>
                            <span>{new Date(project.end_date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2 border-t">
                      <button 
                        onClick={() => openProjectModal(project)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200">
                        View Details
                      </button>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Projects Summary Footer */}
            <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Total Projects: <span className="font-semibold text-gray-900">{projects.length}</span></span>
                <span>
                  Active: <span className="font-semibold text-green-600">
                    {projects.filter(p => p.status === '1').length}
                  </span> | 
                  Inactive: <span className="font-semibold text-red-600 ml-1">
                    {projects.filter(p => p.status !== '1').length}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <ProjectModal 
          project={project} 
          isOpen={isOpen} 
          onClose={closeModal} 
        />
    </SidebarInsetContent>
  </SidebarInset>
);
}
