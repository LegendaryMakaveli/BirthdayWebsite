// Simple Guestbook API - stores messages in memory (resets on redeploy)
// For persistent storage, connect to Vercel KV, Supabase, or any database

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // GET - Retrieve all messages
        if (req.method === 'GET') {
            const messages = await kv.lrange<GuestMessage>('guestbook_messages', 0, -1);
            return res.status(200).json({ messages: messages || [], count: messages?.length || 0 });
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

            // Add to beginning of list (left push)
            await kv.lpush('guestbook_messages', newMessage);

            // Keep only last 100 messages to prevent infinite growth
            await kv.ltrim('guestbook_messages', 0, 99);

            console.log(`New message from ${newMessage.name}: ${newMessage.message.substring(0, 50)}...`);

            return res.status(201).json({
                success: true,
                message: newMessage
            });
        }

        // DELETE - Remove a message
        if (req.method === 'DELETE') {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ error: 'Message ID is required' });
            }

            // KV doesn't support deleting a specific item from a list easily by ID if it's a JSON object.
            // We have to read, filter, and rewrite. This is not atomic but sufficient for this scale.
            const messages = await kv.lrange<GuestMessage>('guestbook_messages', 0, -1);
            const initialLength = messages.length;
            const newMessages = messages.filter((msg: GuestMessage) => msg.id !== id);

            if (newMessages.length === initialLength) {
                return res.status(404).json({ error: 'Message not found' });
            }

            await kv.del('guestbook_messages');

            if (newMessages.length > 0) {
                // Since lpush puts at head, if we iterate newMessages (which is ordered newest first),
                // pushing them one by one via rpush will keep them in order [newest, ..., oldest]
                await kv.rpush('guestbook_messages', ...newMessages);
            }

            return res.status(200).json({ success: true, count: newMessages.length });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Redis Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
