
import InputError from '@/components/input-error';
import { Card } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { SidebarInset, SidebarInsetContent } from '@/components/ui/sidebar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Loader2, Mail, MailOpen, Reply } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { TbSend2 } from 'react-icons/tb';

import { Check, X, RefreshCw, Clock, AlertCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Messages',
        href: '/messages',
    },
];

interface Reply {
    id?: number;
    reply_message: string;
    subject: string;
    created_at: string;
}

interface Contact {
    name: string;
    email: string;
    project: string;
    message: string;
    status: 'unread' | 'read' | 'replied';
    created_at: string;
    time_ago?: string;
    replies?: Reply[];
}

interface Props {
    messages?: Contact[];
    meta?: {
        total: number;
        unread_count: number;
    }
}

export default function Message({ messages, meta, updated_contact, reply_id, success, error }: Props) {
    const [search, setSearch] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);
    const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
    const [replyMessage, setReplyMessage] = useState('');

    const [replyStatuses, setReplyStatuses] = useState({})

    const { data, setData, post, processing, reset,  errors} = useForm({
        contact_id: null as number | null,
        to_email: '',
        subject: '',
        reply_message: '',

    });

    const filteredMessages = messages?.filter((user) => {
       const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.message.toLowerCase().includes(search.toLowerCase()) ||
            user.project.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

        return matchesSearch && matchesStatus;
    });
   
    const handleSelectMessage = (message: Contact) => {
        setSelectedMessage(message);

        setData({
            contact_id: message.id,
            to_email: message.email,
            subject: `Re: Message from ${message.name} about ${message.project}`,
            reply_message: '',
        });
        if (message.status === 'unread') {
            router.patch(`/messages/${message.id}/read`, {}, {
                preserveState: true,
                preserveScroll: true,
            });
            // Update local state
            message.status = 'read';
        }
    };

    useEffect(() => {
        if (updated_contact && selectedMessage?.id === updated_contact.id) {
            setSelectedMessage(updated_contact);
            
            // Set status to sent for the new reply
            if (reply_id) {
                setReplyStatuses(prev => ({
                    ...prev,
                    [reply_id]: 'sent'
                }));
            }
        }
    }, [updated_contact, reply_id]);

    const handleSendReply = (e) => {
        e.preventDefault();

        const tempReplyId = Date.now();
        
        // Set sending status immediately
        setReplyStatuses(prev => ({
            ...prev,
            [tempReplyId]: 'sending'
        }));

        // Create temporary reply object for immediate UI update
        const newReply = {
            id: tempReplyId,
            reply_message: data.reply_message,
            subject: data.subject,
            created_at: new Date().toLocaleDateString(),
            status: 'sending'
        };

        // Update UI immediately with sending status
        if (selectedMessage) {
            const updatedMessage = {
                ...selectedMessage,
                status: 'replied',
                replies: selectedMessage.replies ? 
                    [...selectedMessage.replies, newReply] : 
                    [newReply]
            };
            setSelectedMessage(updatedMessage);
        }

        post('/send-reply', {
            onSuccess: () => {
                // Backend will redirect back with updated data
                // The useEffect above will handle the update
                setData('reply_message', '');
                console.log('Reply sent successfully!');
            },
            onError: (errors) => {
                console.log('Failed to send reply:', errors);
                
                // Update status to failed
                setReplyStatuses(prev => ({
                    ...prev,
                    [tempReplyId]: 'failed'
                }));

                // Update the reply in selectedMessage
                if (selectedMessage) {
                    const updatedReplies = selectedMessage.replies?.map(reply => 
                        reply.id === tempReplyId 
                            ? { ...reply, status: 'failed' }
                            : reply
                    ) || [];

                    setSelectedMessage({
                        ...selectedMessage,
                        replies: updatedReplies
                    });
                }
            }
        });
    };

// Resend function
const handleResendReply = (replyId) => {
    const replyToResend = selectedMessage?.replies?.find(r => r.id === replyId);
    if (!replyToResend) return;

    // Set sending status
    setReplyStatuses(prev => ({
        ...prev,
        [replyId]: 'sending'
    }));

    // Update UI
    if (selectedMessage) {
        const updatedReplies = selectedMessage.replies?.map(reply => 
            reply.id === replyId 
                ? { ...reply, status: 'sending' }
                : reply
        ) || [];

        setSelectedMessage({
            ...selectedMessage,
            replies: updatedReplies
        });
    }

    // Resend the reply
    setData({
        ...data,
        reply_message: replyToResend.reply_message,
        subject: replyToResend.subject
    });

    post('/send-reply', {
        onSuccess: (response) => {
            setReplyStatuses(prev => ({
                ...prev,
                [replyId]: 'sent'
            }));

            if (selectedMessage) {
                const updatedReplies = selectedMessage.replies?.map(reply => 
                    reply.id === replyId 
                        ? { ...reply, status: 'sent' }
                        : reply
                ) || [];

                setSelectedMessage({
                    ...selectedMessage,
                    replies: updatedReplies
                });
            }

            setData('reply_message', '');
            console.log('Reply resent successfully!');
        },
        onError: (errors) => {
            setReplyStatuses(prev => ({
                ...prev,
                [replyId]: 'failed'
            }));

            if (selectedMessage) {
                const updatedReplies = selectedMessage.replies?.map(reply => 
                    reply.id === replyId 
                        ? { ...reply, status: 'failed' }
                        : reply
                ) || [];

                setSelectedMessage({
                    ...selectedMessage,
                    replies: updatedReplies
                });
            }

            console.log('Failed to resend reply:', errors);
        }
    });
};

    const StatusBadge = ({ status }: { status: Contact['status'] }) => {
        const statusConfig = {
            unread: {
                icon: <Mail className="w-3 h-3" />,
                text: 'Unread',
                className: 'bg-blue-100 text-blue-800 border-blue-200'
            },
            read: {
                icon: <MailOpen className="w-3 h-3" />,
                text: 'Read',
                className: 'bg-gray-100 text-gray-800 border-gray-200'
            },
            replied: {
                icon: <Reply className="w-3 h-3" />,
                text: 'Replied',
                className: 'bg-green-100 text-green-800 border-green-200'
            }
        };

    const config = statusConfig[status];

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${config.className}`}>
                {config.icon}
                {config.text}
            </span>
        );
    };

    // Status count for filters
    const getStatusCount = (status: Contact['status']) => {
        return messages?.filter(msg => msg.status === status).length || 0;
    };


    const ReplyStatusBadge = ({ status, onResend, replyId }) => {
    const statusConfig = {
        sending: {
            icon: <Clock className="w-3 h-3 animate-pulse" />,
            text: 'Sending...',
            className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            showResend: false
        },
        sent: {
            icon: <Check className="w-3 h-3" />,
            text: 'Sent',
            className: 'bg-green-100 text-green-800 border-green-200',
            showResend: false
        },
        failed: {
            icon: <X className="w-3 h-3" />,
            text: 'Failed',
            className: 'bg-red-100 text-red-800 border-red-200',
            showResend: true
        },
        error: {
            icon: <AlertCircle className="w-3 h-3" />,
            text: 'Error',
            className: 'bg-red-100 text-red-800 border-red-200',
            showResend: true
        }
    };

    const config = statusConfig[status];
        if (!config) return null;

        return (
            <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${config.className}`}>
                    {config.icon}
                    {config.text}
                </span>
                {config.showResend && (
                    <button
                        onClick={() => onResend(replyId)}
                        className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        title="Resend"
                    >
                        <RefreshCw className="w-3 h-3" />
                        Resend
                    </button>
                )}
            </div>
        );
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />
                <SidebarInset>
                    <SidebarInsetContent>
                            <div className='flex space-x-4 h-[calc(100vh-120px)] mt-4'>
                                <div className="md:w-1/2 w-full p-4 bg-neutral-900 rounded-2xl flex flex-col">
                                    <div className="p-2">
                                        <div className="flex items-center justify-between mb-3">
                                            <h2 className="text-xl font-bold text-white">
                                                Messages ({messages?.length || 0})
                                            </h2>
                                            {meta?.unread_count > 0 && (
                                                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                                    {meta.unread_count} unread
                                                </span>
                                            )}
                                        </div>

                                        {/* Status Filter Tabs */}
                                        <div className="flex space-x-2 mb-3">
                                            <button
                                                onClick={() => setStatusFilter('all')}
                                                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                                                    statusFilter === 'all' 
                                                        ? 'bg-blue-600 text-white' 
                                                        : 'bg-neutral-700 text-gray-300 hover:bg-neutral-600'
                                                }`}
                                            >
                                                All ({messages?.length || 0})
                                            </button>
                                            <button
                                                onClick={() => setStatusFilter('unread')}
                                                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                                                    statusFilter === 'unread' 
                                                        ? 'bg-blue-600 text-white' 
                                                        : 'bg-neutral-700 text-gray-300 hover:bg-neutral-600'
                                                }`}
                                            >
                                                Unread ({getStatusCount('unread')})
                                            </button>
                                            <button
                                                onClick={() => setStatusFilter('replied')}
                                                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                                                    statusFilter === 'replied' 
                                                        ? 'bg-green-600 text-white' 
                                                        : 'bg-neutral-700 text-gray-300 hover:bg-neutral-600'
                                                }`}
                                            >
                                                Replied ({getStatusCount('replied')})
                                            </button>
                                        </div>

                                        <div className="relative mb-4 flex">
                                            <search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                                            <input type="text"
                                                placeholder='Search messages...'
                                                className='w-full pl-10 pr-4 py-2 rounded-2xl bg-neutral-700 border-gray-300 outline-blue-50 focus:outline-none focus:ring-none'
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                            <span className='absolute left-2 top-2 text-gray-400 text-2xl'><IoSearch/></span>
                                        </div>
                                    </div>

                                    
                                    <div className='flex-1 overflow-y-auto'>
                                        <ul className="space-y-4">
                                            {filteredMessages?.length > 0 ? (
                                                filteredMessages?.map((user, index) => (
                                                    <li 
                                                        key={user.id}
                                                        // className='flex items-center space-x-3 p-2 shadow rounded-lg'
                                                        className={`flex items-center space-x-3 p-3 shadow rounded-lg cursor-pointer transition-colors hover:bg-neutral-800 ${
                                                        selectedMessage?.id === user.id ? 'bg-blue-900/30' : 'bg-neutral-0'
                                                        } ${user.status === 'unread' ? 'body-l-4 border-blue-500' : ''}`}
                                                        onClick={() => handleSelectMessage(user)}
                                                        >
                                                        <div className='relative'>
                                                            <img 
                                                                src='user avatar' 
                                                                alt={user.name} 
                                                                className='border border-white rounded-full object-cover w-12 h-12 truncate'
                                                            />
                                                            {user.status === 'unread' && (
                                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-neutral-900"></div>
                                                            )}
                                                        </div>
                                                        <div className='flex-1 min-w-0'>
                                                            <div className='flex items-center justify-between mb-1'>
                                                                <h4 className={`font-semibold truncate ${user.status === 'unread' ? 'text-white font-extrabold' : 'text-gray-400'}`}>
                                                                    {user.name}
                                                                </h4>
                                                                <StatusBadge status={user.status} />
                                                            </div>
                                                            <p className={`text-slate-300 text-sm truncate mb-1 ${user.status === 'unread' ? 'text-white font-extrabold' : 'text-gray-500'}`}>
                                                                {user.message}
                                                            </p>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-slate-400 text-xs mt-1">
                                                                    Project: {user.project}
                                                                </p>
                                                                <p className="text-slate-400 text-xs">
                                                                {user.time_ago || user.created_at}
                                                            </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className='text-center text-gray-500 py-7'>
                                                    {search || statusFilter !== 'all' 
                                                    ? 'No messages match your filters.'
                                                    : 'No messages found.'}
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div className="md:w-1/2 w-full p-4 bg-neutral-900 rounded-2xl flex flex-col">
                                    {/* <div className="p-4">
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-white text-3xl font-bold pb-5 text-center">Contact Me</h1>
                                        </div>
                                    </div> */}
                                    {selectedMessage ? (
                                    <>
                                        <div className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <img 
                                                        src='user avatar' 
                                                        alt={selectedMessage.name} 
                                                        className='border border-white rounded-full object-cover w-12 h-12 truncate'
                                                    />
                                                    <div>
                                                        <h2 className="text-white text-lg font-bold">{selectedMessage.name}</h2>
                                                        <p className="text-gray-400 text-sm">{selectedMessage.email}</p>
                                                    </div>
                                                </div>
                                                <StatusBadge status={selectedMessage.status} />
                                            </div>
                                        </div>

                                        <div className="flex-1 overflow-y-auto p-4">
                                            <div className="bg-neutral-800 p-4 rounded-4xl border-l-4 border-neutral-500 mb-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-sm text-gray-400">Message:</span>
                                                    <div className="text-right">
                                                        <span className="text-sm text-gray-400 block">Project: {selectedMessage.project}</span>
                                                        <span className="text-xs text-gray-500">{selectedMessage.created_at}</span>
                                                    </div>
                                                </div>
                                                <p className="text-white leading-relaxed">{selectedMessage.message}</p>
                                            </div>

                                            {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                                                <div className="space-y-3 mb-4 my-5">
                                                    {(() => {
                                                        const latestReply = selectedMessage.replies.reduce((latest, current) => {
                                                            return new Date(current.created_at) > new Date(latest.created_at) ? current : latest;
                                                        });

                                                        return selectedMessage.replies.map((reply, index) => {
                                                            const isLatestReply = reply.id === latestReply.id;
                                                            
                                                            return (
                                                                <div key={reply.id}>
                                                                    <div className="bg-blue-900/30 p-4 rounded-4xl border-r-4 border-blue-500">
                                                                        <div className="flex justify-between items-start">
                                                                            <span className="text-xs text-blue-400 font-medium">You replied:</span>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="text-xs text-gray-500">
                                                                                    {new Date(reply.created_at).toLocaleDateString()}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-2">
                                                                            <span className="text-xs text-gray-400">Subject: </span>
                                                                            <span className="text-sm text-white">{reply.subject}</span>
                                                                        </div>
                                                                        <p className="text-white text-sm leading-relaxed">
                                                                            {reply.reply_message}
                                                                        </p>
                                                                    </div>
                                                                    
                                                                    {/* Show badge only on the latest reply by date */}
                                                                    {isLatestReply && (
                                                                        <div className='flex mt-1 justify-end'>
                                                                            <ReplyStatusBadge
                                                                                status={replyStatuses[reply.id] || reply.status || 'sent'}
                                                                                onResend={handleResendReply}
                                                                                replyId={reply.id}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        });
                                                    })()}
                                                </div>
                                            )}
                                        </div>

                                        <div className='p-4'>
                                            <form onSubmit={handleSendReply} className="space-y-3">
                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-2">
                                                        <label className="text-white text-sm font-medium w-16">To:</label>
                                                        <input
                                                            type="email"
                                                            value={data.to_email}
                                                            readOnly
                                                            className="flex-1 bg-neutral-700 text-white px-3 py-2 rounded-lg text-sm"
                                                        />
                                                    </div>
                                                    
                                                    <div className="flex items-center space-x-2">
                                                        <label className="text-white text-sm font-medium w-16">Subject:</label>
                                                        <input
                                                            type="text"
                                                            value={data.subject}
                                                            onChange={(e) => setData('subject', e.target.value)}
                                                            className="flex-1 bg-neutral-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                        />
                                                    </div>
                                                </div>
                                            
                                                <div className='flex items-end space-x-2'>
                                                    <div className="flex-1">
                                                        <textarea
                                                            rows={1}
                                                            placeholder="Type your reply..."
                                                            className="w-full bg-neutral-700 text-white rounded-4xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                                                            value={data.reply_message}
                                                            onChange={(e) => setData('reply_message', e.target.value)}
                                                        />
                                                        <InputError message={errors.reply_message}/>
                                                    </div>
                                                    
                                                    <button
                                                        type="submit"
                                                        disabled={processing || !data.reply_message.trim()}
                                                        className={`flex items-center justify-center p-3 text-2xl transition ${
                                                            processing || !data.reply_message.trim() 
                                                                ? 'text-gray-400 cursor-not-allowed' 
                                                                : 'text-blue-600 hover:bg-blue-700 cursor-pointer'
                                                        }`}
                                                    >
                                                        {processing ? (
                                                            <Loader2 className="animate-spin w-6 h-6" />
                                                        ) : (
                                                            <TbSend2 className="w-6 h-6" />
                                                        )}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="text-center text-gray-500">
                                            <div className="mb-4">
                                                <TbSend2 className='w-16 h-16 mx-auto text-gray-600' />
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2">Select a Message</h3>
                                            <p>Click on a message from the list to reply</p>
                                            {meta?.unread_count > 0 && (
                                                <p className="mt-2 text-blue-400">
                                                    {meta.unread_count} unread message{meta.unread_count !== 1 ? 's' : ''} waiting
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>
                    </SidebarInsetContent>
                </SidebarInset>
        </AppLayout>
    );
}
