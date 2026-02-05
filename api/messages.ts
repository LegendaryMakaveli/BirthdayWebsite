// Simple Guestbook API - stores messages in memory (resets on redeploy)
// For persistent storage, connect to Vercel KV, Supabase, or any database

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface GuestMessage {
    id: string;
    name: string;
    message: string;
    timestamp: number;
}

// In-memory storage (persists between requests but resets on redeploy)
// For production, replace with a database connection
let messages: GuestMessage[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS for local development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // GET - Retrieve all messages (for localhost viewing)
    if (req.method === 'GET') {
        return res.status(200).json({ messages, count: messages.length });
    }

    // POST - Add a new message
    if (req.method === 'POST') {
        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ error: 'Name and message are required' });
        }

        const newMessage: GuestMessage = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: name.trim(),
            message: message.trim(),
            timestamp: Date.now()
        };

        // Add to beginning of array
        messages.unshift(newMessage);

        // Keep only last 100 messages to prevent memory issues
        if (messages.length > 100) {
            messages = messages.slice(0, 100);
        }

        console.log(`New message from ${newMessage.name}: ${newMessage.message.substring(0, 50)}...`);

        return res.status(201).json({
            success: true,
            message: newMessage,
            totalMessages: messages.length
        });
    }

    // DELETE - Remove a message (for localhost management)
    if (req.method === 'DELETE') {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: 'Message ID is required' });
        }

        const initialLength = messages.length;
        messages = messages.filter(msg => msg.id !== id);

        if (messages.length === initialLength) {
            return res.status(404).json({ error: 'Message not found' });
        }

        return res.status(200).json({ success: true, count: messages.length });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
