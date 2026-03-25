import { create } from "zustand";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY || "stream-api-key";

export const useChatStore = create((set, get) => ({
  chatClient: null,
  unreadCount: 0,
  isInitialized: false,

  initStream: async (authUser, token) => {
    if (!authUser || !token) return;
    if (get().isInitialized) return; // Prevent multiple initializations

    try {
      if (!STREAM_API_KEY || STREAM_API_KEY === "stream-api-key") {
        console.warn("Stream API Key is missing or invalid");
      }
      const client = StreamChat.getInstance(STREAM_API_KEY);
      
      // If client is already connected to another user, we reconnect
      if (client.userID && client.userID !== authUser._id) {
        await client.disconnectUser();
      }

      await client.connectUser(
        {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        },
        token
      );

      set({ chatClient: client, isInitialized: true, unreadCount: client.user.total_unread_count || 0 });

      // Listen for events globally
      client.on((event) => {
        if (event.total_unread_count !== undefined) {
          set({ unreadCount: event.total_unread_count });
        }
        
        if (event.type === 'message.new' && event.message.user.id !== authUser._id) {
          toast(`New message from ${event.message.user.name}`, {
            icon: '💬',
            duration: 4000
          });
        }
      });
    } catch (error) {
      console.error("Stream init error:", error);
    }
  },

  disconnectStream: async () => {
    const client = get().chatClient;
    if (client) {
      await client.disconnectUser();
      set({ chatClient: null, isInitialized: false, unreadCount: 0 });
    }
  }
}));
