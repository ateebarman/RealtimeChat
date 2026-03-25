
import { useNavigate, Link } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";

import {
  ChannelList,
  Chat,
} from "stream-chat-react";


import ChatLoader from "../components/ChatLoader";

const CustomChannelPreview = ({ channel, activeChannel, authUser }) => {
  const members = Object.values(channel.state.members || {});
  const otherUser = members.find((member) => member.user.id !== authUser?._id)?.user;
  const lastMessage = channel.state.messages[channel.state.messages.length - 1];
  const unread = channel.countUnread();

  const isActive = activeChannel?.id === channel.id;


  return (
    <Link
      to={`/chat/${otherUser?.id}`}
      className={`w-full text-left p-3 flex items-center gap-3 hover:bg-base-200/80 border-b border-base-300 transition block ${
        isActive ? "bg-primary/10" : "bg-transparent"
      }`}
    >
      <img
        src={otherUser?.image || "https://i.pravatar.cc/48"}
        alt={otherUser?.name || "Friend"}
        className="w-11 h-11 rounded-full flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold text-sm truncate">{otherUser?.name || "New Chat"}</span>
          {unread > 0 && (
            <span className="text-xs font-bold text-white bg-primary rounded-full px-2 py-0.5">{unread}</span>
          )}
        </div>
        <p className="text-xs text-base-content/80 truncate mt-1">{lastMessage?.text || "No messages yet"}</p>
      </div>
    </Link>
  );
};

const MessagesPage = () => {
  const { chatClient, isInitialized } = useChatStore();
  const { isDarkTheme } = useThemeStore();
  const { authUser } = useAuthUser();
  const navigate = useNavigate();

  const goToChatUser = (otherUserId) => {
    if (otherUserId) {
      navigate(`/chat/${otherUserId}`);
    }
  };

  const onChannelSelect = (channel) => {
    const members = Object.keys(channel.state.members || {});
    const otherUserId = members.find((id) => id !== authUser._id);
    if (otherUserId) goToChatUser(otherUserId);
  };

  if (!isInitialized || !chatClient) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient} theme={isDarkTheme ? "str-chat__theme-dark" : "str-chat__theme-light"}>
        <ChannelList
          filters={{ members: { $in: [authUser._id] } }}
          sort={{ last_message_at: -1 }}
          onSelect={onChannelSelect}
          Preview={(props) => (
            <CustomChannelPreview
              {...props}
              authUser={authUser}
            />
          )}
        />
      </Chat>
    </div>
  );
};

export default MessagesPage;