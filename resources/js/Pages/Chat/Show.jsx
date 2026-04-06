import { Head, useForm, usePage, router } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { Send, ArrowLeft, User } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

export default function Show({ chatRoom, messages, otherUser }) {
    const { auth } = usePage().props;
    const messagesEndRef = useRef(null);
    const refreshInterval = useRef(null);

    const { data, setData, post, processing, reset } = useForm({
        body: '',
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Poll for new messages every 5 seconds
    useEffect(() => {
        refreshInterval.current = setInterval(() => {
            router.reload({ only: ['messages'], preserveScroll: true });
        }, 5000);

        return () => clearInterval(refreshInterval.current);
    }, []);

    const handleSend = (e) => {
        e.preventDefault();
        if (!data.body.trim()) return;

        post(`/chat/${chatRoom.id}/message`, {
            preserveScroll: true,
            onSuccess: () => {
                reset('body');
                scrollToBottom();
            },
        });
    };

    return (
        <Layout>
            <Head title={`চ্যাট - ${otherUser.name}`} />

            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="glass-card p-4 mb-4 flex items-center space-x-4">
                    <Link href="/chat" className="text-slate-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    {otherUser.profile_photo ? (
                        <img src={otherUser.profile_photo} alt="" className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary-500/30" />
                    ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                    )}
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-dark-100">{otherUser.name}</h2>
                        <p className="text-slate-400 dark:text-dark-500 text-xs">প্রাইভেট চ্যাট</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="glass-card p-6 min-h-[400px] max-h-[600px] overflow-y-auto mb-4">
                    {messages.length > 0 ? (
                        <div className="space-y-4">
                            {messages.map((message) => {
                                const isMe = message.sender_id === auth.user.id;
                                return (
                                    <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] p-4 rounded-2xl ${isMe
                                                ? 'bg-gradient-to-br from-primary-500/10 to-primary-600/10 border border-primary-500/20 dark:from-primary-500/20 dark:to-primary-600/20 dark:border-primary-500/30 rounded-br-md text-slate-700 dark:text-dark-100'
                                                : 'bg-slate-100 border border-slate-200 dark:bg-dark-800/50 dark:border-dark-700/30 rounded-bl-md text-slate-700 dark:text-dark-100'
                                            }`}>
                                            {!isMe && (
                                                <p className="text-primary-600 dark:text-primary-400 text-xs font-medium mb-1">{message.sender?.name}</p>
                                            )}
                                            <p className="text-slate-700 dark:text-dark-200 text-sm leading-relaxed">{message.body}</p>
                                            <p className={`text-xs mt-2 ${isMe ? 'text-primary-500/60 dark:text-primary-400/60' : 'text-slate-400 dark:text-dark-600'}`}>
                                                {new Date(message.created_at).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-400 dark:text-dark-500">
                            <p>কথোপকথন শুরু করুন!</p>
                        </div>
                    )}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSend} className="glass-card p-4 flex items-center space-x-3">
                    <input
                        type="text"
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        placeholder="মেসেজ লিখুন..."
                        className="flex-1 bg-transparent border-none text-slate-700 dark:text-dark-200 placeholder-slate-400 dark:placeholder-dark-500 focus:ring-0 focus:outline-none"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend(e);
                            }
                        }}
                    />
                    <button
                        type="submit"
                        disabled={processing || !data.body.trim()}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </Layout>
    );
}
