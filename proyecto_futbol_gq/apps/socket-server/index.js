const { Server } = require('socket.io');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
require('dotenv').config();

const PORT = process.env.WS_PORT || 8001;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

class SocketServer {
  constructor() {
    this.io = null;
    this.pubClient = null;
    this.subClient = null;
    this.connectedClients = new Map();
  }

  async initialize() {
    try {
      // Create Redis clients
      this.pubClient = createClient({ url: REDIS_URL });
      this.subClient = this.pubClient.duplicate();

      await Promise.all([
        this.pubClient.connect(),
        this.subClient.connect()
      ]);

      console.log('✅ Redis connected successfully');

      // Create Socket.IO server
      this.io = new Server({
        cors: {
          origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
          credentials: true
        },
        adapter: createAdapter(this.pubClient, this.subClient)
      });

      this.setupEventHandlers();
      
      this.io.listen(PORT);
      console.log(`🚀 WebSocket server running on port ${PORT}`);

    } catch (error) {
      console.error('❌ Failed to initialize server:', error);
      process.exit(1);
    }
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`🔌 New client connected: ${socket.id}`);
      this.connectedClients.set(socket.id, {
        id: socket.id,
        connectedAt: new Date(),
        subscriptions: new Set()
      });

      // Subscribe to match events
      socket.on('subscribe_match', (matchId) => {
        const room = `match:${matchId}`;
        socket.join(room);
        
        const client = this.connectedClients.get(socket.id);
        if (client) {
          client.subscriptions.add(room);
        }
        
        console.log(`👥 Client ${socket.id} subscribed to match ${matchId}`);
        socket.emit('subscription_confirmed', { matchId, room });
      });

      // Unsubscribe from match
      socket.on('unsubscribe_match', (matchId) => {
        const room = `match:${matchId}`;
        socket.leave(room);
        
        const client = this.connectedClients.get(socket.id);
        if (client) {
          client.subscriptions.delete(room);
        }
        
        console.log(`🚫 Client ${socket.id} unsubscribed from match ${matchId}`);
      });

      // Live match update (from admin)
      socket.on('match_update', (data) => {
        const { matchId, event, ...updateData } = data;
        const room = `match:${matchId}`;
        
        // Broadcast to all subscribers
        this.io.to(room).emit('match_event', {
          ...updateData,
          event,
          timestamp: new Date().toISOString()
        });
        
        console.log(`📢 Broadcast update for match ${matchId}:`, event?.type || 'score update');
        
        // Store in Redis for persistence
        this.storeMatchUpdate(matchId, data);
      });

      // Live commentary
      socket.on('commentary', (data) => {
        const { matchId, text, commentator } = data;
        const room = `match:${matchId}:commentary`;
        
        const commentaryEvent = {
          text,
          commentator,
          timestamp: new Date().toISOString(),
          type: 'commentary'
        };
        
        this.io.to(room).emit('new_commentary', commentaryEvent);
      });

      // Get match state
      socket.on('get_match_state', async (matchId) => {
        try {
          const state = await this.getMatchState(matchId);
          socket.emit('match_state', state);
        } catch (error) {
          socket.emit('error', { message: 'Failed to get match state' });
        }
      });

      // Ping/pong for connection health
      socket.on('ping', () => {
        socket.emit('pong', { timestamp: new Date().toISOString() });
      });

      // Disconnection
      socket.on('disconnect', () => {
        console.log(`🔌 Client disconnected: ${socket.id}`);
        this.connectedClients.delete(socket.id);
      });
    });

    // Periodic broadcast of server stats
    setInterval(() => {
      const stats = {
        connectedClients: this.connectedClients.size,
        timestamp: new Date().toISOString()
      };
      
      this.io.emit('server_stats', stats);
    }, 30000); // Every 30 seconds
  }

  async storeMatchUpdate(matchId, data) {
    try {
      const key = `match:${matchId}:updates`;
      await this.pubClient.lPush(key, JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      }));
      
      // Keep only last 100 updates
      await this.pubClient.lTrim(key, 0, 99);
    } catch (error) {
      console.error('Error storing match update:', error);
    }
  }

  async getMatchState(matchId) {
    try {
      const key = `match:${matchId}:updates`;
      const updates = await this.pubClient.lRange(key, 0, -1);
      
      return {
        matchId,
        updates: updates.map(update => JSON.parse(update)),
        lastUpdated: updates.length > 0 ? JSON.parse(updates[0]).timestamp : null
      };
    } catch (error) {
      console.error('Error getting match state:', error);
      return { matchId, updates: [], lastUpdated: null };
    }
  }

  // Public method to broadcast updates
  broadcastMatchUpdate(matchId, data) {
    const room = `match:${matchId}`;
    this.io.to(room).emit('match_event', {
      ...data,
      timestamp: new Date().toISOString()
    });
  }
}

// Start server if running directly
if (require.main === module) {
  const server = new SocketServer();
  server.initialize().catch(console.error);
}

module.exports = SocketServer;