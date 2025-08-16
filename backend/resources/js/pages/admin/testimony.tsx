// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
// import AppLayout from '@/layouts/app-layout';
// import { type BreadcrumbItem } from '@/types';
// import { Head } from '@inertiajs/react';
// import { FcOpenedFolder } from "react-icons/fc"
// import { RiDeleteBin5Line, RiEditLine } from 'react-icons/ri';



// import { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';

// interface Testimony {
//   name: string,
//   email: string,
//   title: string,
//   location: string,
//   testimonial: string,
//   image?: string,
// }

// interface Props {
//   testimony?: {
//     data : Testimony[];
//   }
// }

// export default function Testimony( { testimony }: Props) {

//     const breadcrumbs: BreadcrumbItem[] = [
//         {
//             title: 'Testimonials',
//             href: '/testimony',
//         },
//     ];

//   return (
//     <AppLayout breadcrumbs={breadcrumbs}>
//         <Head title="Testimonials"/>
//         <div className="p-4">
//           <div className="flex space-x-4">

//           <h2 className="text-xl font-bold text-white mb-4">
//             Testimonials ({testimony?.data?.length || 0})
//           </h2>
          
//           {testimony.length === 0 ? (
//               <p className="text-gray-500">No pending testimonials.</p>
//           ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {testimony.map(t => (
//                   <div key={t.id} className="bg-white p-6 shadow-md rounded-lg">
//                   <img src={t.image_url} alt="" className="h-40 w-full object-cover rounded-md mb-4" />
//                   <h2 className="text-xl font-semibold">{t.name}</h2>
//                   <p className="text-sm text-gray-500 mb-2">{t.email} • {t.companyname}</p>
//                   <p className="text-gray-700 mb-4">{t.testimonial}</p>

//                   <div className="flex gap-4">
//                       <button
//                       onClick={() => approveTestimonial(t.id)}
//                       className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//                       >
//                       Approve
//                       </button>
//                       <button
//                       onClick={() => deleteTestimonial(t.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//                       >
//                       Delete
//                       </button>
//                   </div>
//                   </div>
//               ))}
//               </div>
//           )}
//           </div>
//         </div>
//     </AppLayout>
//   );
// }



import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { FcOpenedFolder } from "react-icons/fc";
import { RiDeleteBin5Line, RiEditLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { Check, X, Eye, Clock } from 'lucide-react';

import { IoLocationSharp } from "react-icons/io5";
import { SidebarInset, SidebarInsetContent, SidebarInsetHeader } from '@/components/ui/sidebar';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Testimonials',
        href: '/testimony',
    },
];

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

interface Props {
    testimony?: Testimony[];
}

export default function Testimony({ testimony = [] }: Props) {
    const [loading, setLoading] = useState<{ [key: number]: string }>({});

    // Change testimonial status
    const changeStatus = async (id: number, newStatus: 'pending' | 'approved' | 'rejected') => {
        setLoading(prev => ({ ...prev, [id]: newStatus }));
        
        router.patch(`/admin/testimonials/${id}/status`, 
            { status: newStatus }, 
            {
                onSuccess: () => {
                    console.log(`Testimonial ${newStatus} successfully!`);
                    setLoading(prev => {
                        const newLoading = { ...prev };
                        delete newLoading[id];
                        return newLoading;
                    });
                },
                onError: (errors) => {
                    console.error('Status change errors:', errors);
                    setLoading(prev => {
                        const newLoading = { ...prev };
                        delete newLoading[id];
                        return newLoading;
                    });
                }
            }
        );
    };

    const deleteTestimonial = async (id: number, name: string) => {
        if (window.confirm(`Are you sure you want to delete testimonial from "${name}"?`)) {
            setLoading(prev => ({ ...prev, [id]: 'deleting' }));
            
            router.delete(`/admin/testimonials/${id}`, {
                onSuccess: () => {
                    console.log('Testimonial deleted successfully!');
                },
                onError: (errors) => {
                    console.error('Delete errors:', errors);
                    setLoading(prev => {
                        const newLoading = { ...prev };
                        delete newLoading[id];
                        return newLoading;
                    });
                }
            });
        }
    };

    // Get counts for each status
    const statusCounts = {
        total: testimony.length,
        pending: testimony.filter(t => t.status === 'pending').length,
        approved: testimony.filter(t => t.status === 'approved').length,
        rejected: testimony.filter(t => t.status === 'rejected').length,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Testimonials" />
                <SidebarInset>
                    <SidebarInsetContent>
                        <SidebarInsetHeader>
                            <div className="flex items-center justify-between px-4">
                                <div className="flex items-center space-x-4">
                                    <FcOpenedFolder className="text-2xl" />
                                    <h2 className="text-xl font-bold text-white">
                                    Testimonials ({statusCounts.total})
                                    </h2>
                                </div>
                                {/* Status Summary */}
                                <div className="space-x-4 text-sm grid grid-cols-1 sm:grid-cols-3">
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                    Pending: {statusCounts.pending}
                                    </span>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                    Approved: {statusCounts.approved}
                                    </span>
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                                    Rejected: {statusCounts.rejected}
                                    </span>
                                </div>
                            </div>
                        </SidebarInsetHeader>
                            {/* <div className="space-y-4"> */}
                            <div className="space-y-4 p-4 h-[calc(100vh-120px)]">
                                    {testimony.length === 0 ? (
                                        <div className="text-center py-12">
                                            <FcOpenedFolder className="text-6xl mx-auto mb-4 opacity-50" />
                                            <p className="text-gray-500 text-lg">No testimonials found.</p>
                                        </div>
                                    ) : (
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                                            {testimony.map((testimonials) => (
                                                <div 
                                                    key={testimonials.id} 
                                                    className={`bg-white p-3 shadow-md rounded-lg transition-all duration-300 ${
                                                        loading[testimonials.id] ? 'opacity-50 pointer-events-none' : ''
                                                    } ${
                                                        testimonials.status === 'approved' 
                                                            ? 'border-l-4 border-green-400' 
                                                            : testimonials.status === 'rejected'
                                                                ? 'border-l-4 border-red-400'
                                                                : 'border-l-4 border-yellow-400'
                                                    }`}
                                                >
                                                    {testimonials.image && (
                                                        <img 
                                                            src={`/storage/${testimonials.image}`} 
                                                            alt={testimonials.name}
                                                            className="h-32 w-full object-fit rounded-md mb-2" 
                                                        />
                                                    )}
                                                    
                                                    <h2 className="text-lg font-semibold text-gray-900 truncate" title={testimonials.name}>
                                                        {testimonials.name}
                                                    </h2>
                                                    
                                                    <p className="text-sm text-gray-600 mb-1 truncate" title={testimonials.email}>
                                                        {testimonials.email}
                                                    </p>
                                                    
                                                    <p className="text-sm text-gray-500 mb-2 truncate" title={testimonials.title}>
                                                        {testimonials.title || testimonials.companyname}
                                                    </p>
                                                    
                                                    <p className="text-sm text-blue-600 mb-2 flex items-center truncate" title={testimonials.location}>
                                                        <IoLocationSharp className='mr-1 text-slate-700 flex-shrink-0'/> 
                                                        {testimonials.location}
                                                    </p>
                                                    
                                                    <p className="text-gray-700 mb-3 text-sm line-clamp-2" title={testimonials.testimonial}>
                                                        "{testimonials.testimonial}"
                                                    </p>
                                                    
                                                    {/* Status Badge */}
                                                    <div className="mb-3">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                            testimonials.status === 'approved' 
                                                                ? 'bg-green-100 text-green-800'
                                                                : testimonials.status === 'pending' 
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {testimonials.status === 'approved' && <Check className="w-3 h-3 mr-1" />}
                                                            {testimonials.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                                                            {testimonials.status === 'rejected' && <X className="w-3 h-3 mr-1" />}
                                                            {testimonials.status.toUpperCase()}
                                                        </span>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex gap-1 flex-wrap">
                                                        {/* Approve Button */}
                                                        <button
                                                            onClick={() => changeStatus(testimonials.id, 'approved')}
                                                            disabled={testimonials.status === 'approved' || loading[testimonials.id]}
                                                            className={`flex items-center justify-center px-2 py-1 rounded text-xs font-medium transition-colors ${
                                                                testimonials.status === 'approved' 
                                                                    ? 'bg-green-500 text-white cursor-not-allowed' 
                                                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                            }`}
                                                            title="Approve"
                                                        >
                                                            <Check className="w-3 h-3" />
                                                        </button>

                                                        {/* Reject Button */}
                                                        <button
                                                            onClick={() => changeStatus(testimonials.id, 'rejected')}
                                                            disabled={testimonials.status === 'rejected' || loading[testimonials.id]}
                                                            className={`flex items-center justify-center px-2 py-1 rounded text-xs font-medium transition-colors ${
                                                                testimonials.status === 'rejected' 
                                                                    ? 'bg-red-500 text-white cursor-not-allowed' 
                                                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                            }`}
                                                            title="Reject"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>

                                                        {/* Set to Pending Button */}
                                                        <button
                                                            onClick={() => changeStatus(testimonials.id, 'pending')}
                                                            disabled={testimonials.status === 'pending' || loading[testimonials.id]}
                                                            className={`flex items-center justify-center px-2 py-1 rounded text-xs font-medium transition-colors ${
                                                                testimonials.status === 'pending' 
                                                                    ? 'bg-yellow-500 text-white cursor-not-allowed' 
                                                                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                            }`}
                                                            title="Set to Pending"
                                                        >
                                                            <Clock className="w-3 h-3" />
                                                        </button>

                                                        {/* Delete Button */}
                                                        <button
                                                            onClick={() => deleteTestimonial(testimonials.id, testimonials.name)}
                                                            disabled={loading[testimonials.id]}
                                                            className="flex items-center justify-center px-2 py-1 rounded text-xs font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
                                                            title="Delete"
                                                        >
                                                            <RiDeleteBin5Line className="w-3 h-3" />
                                                        </button>
                                                    </div>

                                                    {/* Loading Indicator */}
                                                    {loading[testimonials.id] && (
                                                        <div className="mt-2 text-xs text-gray-500 flex items-center">
                                                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-500 mr-1"></div>
                                                            {loading[testimonials.id] === 'deleting' ? 'Deleting...' : `Changing to ${loading[testimonials.id]}...`}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    
                                    )}
                            </div>
                    </SidebarInsetContent>
                </SidebarInset>
        </AppLayout>
    );
}
