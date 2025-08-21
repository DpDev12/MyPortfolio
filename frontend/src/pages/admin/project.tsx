

import InputError from '@/components/input-error';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { Loader2, X } from 'lucide-react';
import { FcOpenedFolder } from "react-icons/fc"
import { RiDeleteBin5Line, RiEditLine } from 'react-icons/ri';
import { useState } from 'react';
import { SidebarInset, SidebarInsetContent } from '@/components/ui/sidebar';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Project',
        href: '/projects',
    },
];

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
    projects?: {
        data: Project[];
    };
}

export default function Project({ projects }: Props) {
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, setData, post, put, errors, processing, reset, clearErrors } = useForm<{
        title: string,
        body: string,
        status: string,
        image: File | null,
        start_date: string | null,
        end_date: string | null,
    }>({
        title: '',
        body: '',
        status: '',
        image: null,
        start_date: null,
        end_date: null,
    });

    function handleProject(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        if (isEditMode && editingProject) {
            // Para sa edit, gamitin ang POST with _method spoofing
            post(`/projects/${editingProject.id}`, {
                forceFormData: true,
                data: {
                    ...data,
                    _method: 'PUT' // Method spoofing para sa file uploads
                },
                onSuccess: () => {
                    console.log('Project updated successfully!');
                    handleCancelEdit();
                },
                onError: (errors) => {
                    console.log('Update errors:', errors);
                    Object.keys(errors).forEach(key => {
                        console.log(`${key}:`, errors[key]);
                    });
                }
            });
        } else {
            // Create new project
            post('/add_projects', {
                forceFormData: true,
                onSuccess: () => {
                    console.log('Project created successfully!');
                    reset();
                },
                onError: (errors) => {
                    console.log('Creation errors:', errors);
                    Object.keys(errors).forEach(key => {
                        console.log(`${key}:`, errors[key]);
                    });
                }
            });
        }
    }

    function handleEdit(project: Project) {
        setEditingProject(project);
        setIsEditMode(true);
        setData({
            title: project.title,
            body: project.body,
            status: project.status,
            image: null, // Don't pre-fill file input
            start_date: project.start_date,
            end_date: project.end_date,
        });
        clearErrors();
    }

    function handleCancelEdit() {
        setEditingProject(null);
        setIsEditMode(false);
        reset();
        clearErrors();
    }

    function handleDelete(project: Project) {
        if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
            router.delete(`/projects/${project.id}`, {
                onSuccess: () => {
                    console.log('Project deleted successfully!');
                },
                onError: (errors) => {
                    console.log('Delete errors:', errors);
                }
            });
        }
    }

return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="My Project"/>
            <SidebarInset>
                <SidebarInsetContent>
                    {/* Main container with fixed height */}
                    
                    <div className="flex space-x-4 h-[calc(100vh-120px)] mt-4">
                        {/* Projects List - with independent scroll */}
                        <div className="md:w-1/2 w-full bg-neutral-900 rounded-2xl flex flex-col">
                            <div className="p-4 border-b border-gray-700">
                                <h2 className="text-xl font-bold text-white">
                                    Projects ({projects?.data?.length || 0})
                                </h2>
                            </div>
                            
                            {/* Scrollable content area */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {projects?.data?.map((project) => (
                                        <div key={project.id} className="bg-white p-3 rounded shadow hover:scale-105 transition">
                                            {project.image && (
                                                <img 
                                                    src={`/storage/${project.image}`} 
                                                    alt={project.title}
                                                    className="w-full h-20 object-fit rounded mb-2"
                                                />
                                            )}
                                            {!project.image && <FcOpenedFolder className='w-full text-3xl mb-2'/>}
                                            
                                            <h3 className="text-sm font-semibold text-gray-900 truncate" title={project.title}>
                                                {project.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 truncate" title={project.body}>
                                                {project.body}
                                            </p>
                                            <span className={`inline-block px-2 py-1 text-xs rounded mt-1 ${
                                                project.status === '1' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {project.status === '1' ? 'Active' : 'Inactive'}
                                            </span>

                                            <div className="flex space-x-2 mt-2">
                                                <button 
                                                    onClick={() => handleEdit(project)}
                                                    className="text-blue-500 hover:text-blue-700 transition"
                                                    title="Edit project"
                                                >
                                                    <RiEditLine />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(project)}
                                                    className="text-red-500 hover:text-red-700 transition"
                                                    title="Delete project"
                                                >
                                                    <RiDeleteBin5Line />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {(!projects?.data || projects.data.length === 0) && (
                                        <div className="col-span-full text-center text-gray-400 py-8">
                                            No projects found. Create your first project!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Form - with independent scroll */}
                        <div className='bg-neutral-900 md:w-1/2 w-full rounded-2xl flex flex-col'>
                            <div className="p-4 border-b border-gray-700">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-white">
                                        {isEditMode ? 'Edit Project' : 'Create Project'}
                                    </h2>
                                    {isEditMode && (
                                        <button
                                            onClick={handleCancelEdit}
                                            className="text-gray-400 hover:text-white transition"
                                            title="Cancel editing"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Scrollable form area */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <form onSubmit={handleProject} encType="multipart/form-data">
                                    <div className='space-y-3'>
                                        <div className='w-full'>
                                            <label htmlFor="title" className='block text-left font-medium text-gray-50 mb-1'>
                                                Project Title
                                            </label>
                                            <input 
                                                type="text" 
                                                className='w-full border border-gray-700 rounded-sm p-2 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                id='title'
                                                value={data.title} 
                                                onChange={e => setData('title', e.target.value)}
                                                placeholder="Enter project title"
                                            />
                                            <InputError message={errors.title}/>
                                        </div>
                                        
                                        <div className='w-full'>
                                            <label htmlFor="body" className='block text-left font-medium text-gray-50 mb-1'>
                                                Description
                                            </label>
                                            <textarea 
                                                className='w-full border border-gray-700 rounded-sm p-2 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                id='body'
                                                rows={3}
                                                value={data.body} 
                                                onChange={e => setData('body', e.target.value)}
                                                placeholder="Enter project description"
                                            />
                                            <InputError message={errors.body} />
                                        </div>
                                        
                                        <div className='w-full'>
                                            <label htmlFor="status" className='block text-left font-medium text-gray-50 mb-1'>
                                                Status
                                            </label>
                                            <select 
                                                className='w-full border border-gray-700 rounded-sm p-2 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                id='status'
                                                value={data.status} 
                                                onChange={e => setData('status', e.target.value)}
                                            >
                                                <option value="" className='bg-gray-700'>Select Status</option>
                                                <option value="1" className='bg-gray-700'>Active</option>
                                                <option value="0" className='bg-gray-700'>Inactive</option>
                                            </select>
                                            <InputError message={errors.status} />
                                        </div>
                                        
                                        <div className='w-full'>
                                            <label htmlFor="image" className='block text-left font-medium text-gray-50 mb-1'>
                                                Image {isEditMode && '(leave empty to keep current image)'}
                                            </label>
                                            {isEditMode && editingProject?.image && (
                                                <div className="mb-2">
                                                    <img 
                                                        src={`/storage/${editingProject.image}`} 
                                                        alt="Current image"
                                                        className="w-20 h-20 object-cover rounded border"
                                                    />
                                                    <p className="text-xs text-gray-400 mt-1">Current image</p>
                                                </div>
                                            )}
                                            <input 
                                                type="file" 
                                                className='w-full border border-gray-700 rounded-sm p-2 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700'
                                                id='image'
                                                accept="image/jpeg,image/png,image/jpg,image/gif"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] ?? null;
                                                    console.log('Selected file:', file);
                                                    setData("image", file);
                                                }}
                                            />
                                            <InputError message={errors.image} />
                                            {data.image && (
                                                <p className="text-sm text-gray-400 mt-1">
                                                    Selected: {data.image.name} ({(data.image.size / 1024 / 1024).toFixed(2)} MB)
                                                </p>
                                            )}
                                        </div>
                                        
                                        <div className='w-full'>
                                            <label htmlFor="start_date" className='block text-left font-medium text-gray-50 mb-1'>
                                                Start Date
                                            </label>
                                            <input 
                                                type="date" 
                                                className='w-full border border-gray-700 rounded-sm p-2 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                id='start_date'
                                                value={data.start_date ?? ''} 
                                                onChange={e => setData('start_date', e.target.value)}
                                            />
                                            <InputError message={errors.start_date} />
                                        </div>
                                        
                                        <div className='w-full'>
                                            <label htmlFor="end_date" className='block text-left font-medium text-gray-50 mb-1'>
                                                End Date
                                            </label>
                                            <input 
                                                type="date" 
                                                className='w-full border border-gray-700 rounded-sm p-2 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                id='end_date'
                                                value={data.end_date ?? ''} 
                                                onChange={e => setData('end_date', e.target.value)}
                                            />
                                            <InputError message={errors.end_date} />
                                        </div>
                                        
                                        <div className='w-full'>
                                            <button
                                                type='submit'
                                                className='w-full bg-blue-700 text-gray-50 font-semibold py-2 rounded-sm hover:bg-blue-500 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                                                disabled={processing}
                                            >
                                                {processing && <Loader2 className='animate-spin w-5 h-5' />}
                                                <span>
                                                    {processing 
                                                        ? (isEditMode ? 'Updating...' : 'Creating...') 
                                                        : (isEditMode ? 'Update Project' : 'Create Project')
                                                    }
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </SidebarInsetContent>
            </SidebarInset>
    </AppLayout>
);

}