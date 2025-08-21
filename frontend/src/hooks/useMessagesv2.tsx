import { useState, useMemo, useEffect, useCallback } from 'react';
import { router, useForm } from '@inertiajs/react';

interface Reply {
    id?: number;
    reply_message: string;
    subject: string;
    created_at: string;
    status?: string;
}

interface Contact {
    id: number;
    name: string;
    email: string;
    project: string;
    message: string;
    status: 'unread' | 'read' | 'replied';
    created_at: string;
    time_ago?: string;
    replies?: Reply[];
}

interface UseMessagesProps {
    messages?: Contact[];
    updated_contact?: Contact | null;
    reply_id?: number | null;
}

export const useMessages = (messages: Contact[] = [], updated_contact: Contact | null = null, reply_id: number | null = null) => {
    // STATE MANAGEMENT
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
    const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);
    const [replyStatuses, setReplyStatuses] = useState<Record<string | number, string>>({});

    // FORM HANDLING
    const { data: formData, setData: setFormData, post, processing, errors } = useForm({
        contact_id: null as number | null,
        to_email: '',
        subject: '',
        reply_message: '',
    });

    // FILTERED MESSAGES
    const filteredMessages = useMemo(() => {
        return messages.filter((user) => {
            const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.message.toLowerCase().includes(search.toLowerCase()) ||
                user.project.toLowerCase().includes(search.toLowerCase());

            const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [messages, search, statusFilter]);

    // UTILITY FUNCTIONS
    const getStatusCount = useCallback((status: Contact['status']) => {
        return messages.filter(msg => msg.status === status).length;
    }, [messages]);

    const updateReplyStatus = useCallback((replyId: string | number, status: string) => {
        setReplyStatuses(prev => ({
            ...prev,
            [replyId]: status
        }));
    }, []);

    // HANDLE MESSAGE SELECTION
    const handleSelectMessage = useCallback((message: Contact) => {
        setSelectedMessage(message);

        setFormData({
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
    }, [setFormData]);

    // HANDLE SEND REPLY
    const handleSendReply = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        const tempReplyId = Date.now();
        
        // Set sending status immediately
        updateReplyStatus(tempReplyId, 'sending');

        // Create temporary reply object for immediate UI update
        const newReply = {
            id: tempReplyId,
            reply_message: formData.reply_message,
            subject: formData.subject,
            created_at: new Date().toLocaleDateString(),
            status: 'sending'
        };

        // Update UI immediately with sending status
        if (selectedMessage) {
            const updatedMessage = {
                ...selectedMessage,
                status: 'replied' as const,
                replies: selectedMessage.replies ? 
                    [...selectedMessage.replies, newReply] : 
                    [newReply]
            };
            setSelectedMessage(updatedMessage);
        }

        post('/send-reply', {
            onSuccess: () => {
                setFormData('reply_message', '');
                console.log('Reply sent successfully!');
            },
            onError: (errors: any) => {
                console.log('Failed to send reply:', errors);
                
                updateReplyStatus(tempReplyId, 'failed');

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
    }, [selectedMessage, updateReplyStatus, formData, setFormData, post]);

    // HANDLE RESEND REPLY
    const handleResendReply = useCallback((replyId: string | number) => {
        const replyToResend = selectedMessage?.replies?.find(r => r.id === replyId);
        if (!replyToResend) return;

        // Set sending status
        updateReplyStatus(replyId, 'sending');

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
        setFormData({
            ...formData,
            reply_message: replyToResend.reply_message,
            subject: replyToResend.subject
        });

        post('/send-reply', {
            onSuccess: () => {
                updateReplyStatus(replyId, 'sent');

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

                setFormData('reply_message', '');
                console.log('Reply resent successfully!');
            },
            onError: (errors: any) => {
                updateReplyStatus(replyId, 'failed');

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
    }, [selectedMessage, updateReplyStatus, formData, setFormData, post]);

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
    }, [updated_contact, reply_id, selectedMessage?.id]);

    return {
        // State
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        selectedMessage,
        setSelectedMessage,
        
        // Computed
        filteredMessages,
        getStatusCount,
        
        // Form
        formData,
        setFormData,
        processing,
        errors,
        
        // Reply status
        replyStatuses,
        updateReplyStatus,
        
        // Actions
        handleSelectMessage,
        handleSendReply,
        handleResendReply
    };
};