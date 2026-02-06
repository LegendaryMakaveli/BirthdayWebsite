import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Heart, Send, MessageCircle, Sparkles, User, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

// Fix for framer-motion type issues
const motion = m as any;

interface GuestMessage {
    id: string;
    name: string;
    message: string;
    timestamp: number;
}

const STORAGE_KEY = 'birthday-guestbook-messages';

const Guestbook: React.FC = () => {
    const [messages, setMessages] = useState<GuestMessage[]>([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Check if running on localhost (only show messages list locally)
    const [isLocalhost, setIsLocalhost] = useState(false);
    useEffect(() => {
        setIsLocalhost(
            window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1'
        );
    }, []);

    // Load messages from API (only on localhost)
    useEffect(() => {
        let isMounted = true;

        const loadMessages = async () => {
            if (!isLocalhost) return;

            try {
                // Try to fetch from API first (for deployed site messages)
                const response = await fetch('/api/messages');
                if (!isMounted) return;

                if (response.ok) {
                    const data = await response.json();
                    if (data.messages) {
                        // Only update if we have messages or if it's different to avoid re-renders?
                        // React state updates bail out if value is same reference, but here it's new array.
                        // However, for this scale, it's fine.
                        setMessages(data.messages);
                        return;
                    }
                }
            } catch (error) {
                console.log('API not available, using localStorage');
            }

            // Fallback to localStorage if API fails (and we haven't returned yet)
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    setMessages(JSON.parse(stored));
                }
            } catch (error) {
                console.error('Error loading messages:', error);
            }
        };

        // Initial load
        loadMessages();

        // Poll every 2 seconds for real-time updates
        const intervalId = setInterval(loadMessages, 2000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [isLocalhost]);

    // Save messages to localStorage whenever they change (backup)
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        }
    }, [messages]);

    const triggerCelebration = () => {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FF69B4', '#FFFFFF', '#FFC0CB']
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        // Optimistically remove from local state immediately
        setMessages(prev => prev.filter(msg => msg.id !== id));

        try {
            const response = await fetch(`/api/messages?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok && isLocalhost) {
                console.log('API delete failed (expected on localhost without serverless functions)');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            // No need to restore, as we want to allow local deletion even if API fails
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !message.trim()) return;

        setIsSubmitting(true);

        const newMessage: GuestMessage = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: name.trim(),
            message: message.trim(),
            timestamp: Date.now()
        };

        // Save to API (for production storage)
        try {
            await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newMessage.name, message: newMessage.message })
            });
        } catch (error) {
            console.log('API save skipped:', error);
        }

        // Add message to local state (for localhost display)
        setMessages(prev => [newMessage, ...prev]);

        // Trigger celebration
        triggerCelebration();

        // Reset form
        setName('');
        setMessage('');
        setShowSuccess(true);
        setIsSubmitting(false);

        setTimeout(() => setShowSuccess(false), 3000);
    };

    const formatDate = (timestamp: number): string => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <section className="py-32 px-6 bg-gradient-to-b from-white via-pink-50/30 to-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-20 left-10 w-64 h-64 bg-yellow-100/50 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute bottom-20 right-10 w-80 h-80 bg-pink-100/50 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="inline-block mb-6"
                    >
                        <MessageCircle className="w-16 h-16 text-pink-400" />
                    </motion.div>
                    <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">
                        Leave Your Love
                    </h2>
                    <p className="text-gray-400 uppercase tracking-[0.3em] text-sm">
                        Share your birthday wishes with the twins
                    </p>
                </motion.div>

                {/* Message Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="glass p-8 md:p-12 rounded-[3rem] border border-white/60 shadow-xl mb-16"
                >
                    <div className="space-y-6">
                        {/* Name Input */}
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={50}
                                className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all text-gray-700 placeholder-gray-300 font-light"
                            />
                        </div>

                        {/* Message Textarea */}
                        <div className="relative">
                            <textarea
                                placeholder="Write your heartfelt message for Georgina & Josephine..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                maxLength={500}
                                rows={4}
                                className="w-full px-6 py-4 bg-white/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all text-gray-700 placeholder-gray-300 font-light resize-none"
                            />
                            <span className="absolute bottom-3 right-4 text-xs text-gray-300">
                                {message.length}/500
                            </span>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting || !name.trim() || !message.trim()}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-rose-400 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Birthday Love
                                </>
                            )}
                        </motion.button>
                    </div>

                    {/* Success Message */}
                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-6 text-center text-pink-500 font-medium flex items-center justify-center gap-2"
                            >
                                <Heart className="w-5 h-5 fill-pink-500" />
                                Thank you for your beautiful message!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.form>

                {/* Messages Display - Only visible on localhost */}
                {isLocalhost && messages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <h3 className="font-serif text-2xl text-gray-700 text-center mb-8">
                            Messages of Love ({messages.length})
                        </h3>

                        <div className="grid gap-6 md:grid-cols-2">
                            <AnimatePresence>
                                {messages.map((msg, index) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass p-6 rounded-2xl border border-white/50 hover:shadow-lg transition-shadow group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-200 to-pink-200 flex items-center justify-center flex-shrink-0">
                                                <span className="text-pink-600 font-medium text-sm">
                                                    {msg.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                    <h4 className="font-medium text-gray-800 truncate">
                                                        {msg.name}
                                                    </h4>
                                                    <span className="text-xs text-gray-400 flex-shrink-0">
                                                        {formatDate(msg.timestamp)}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 font-light text-sm leading-relaxed">
                                                    {msg.message}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(msg.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                                title="Delete message"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Guestbook;
