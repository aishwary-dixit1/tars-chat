import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Search } from "lucide-react";

export default function Sidebar({ onSelect }: { onSelect: (id: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Real-time query to fetch users
  const users = useQuery(api.users.getUsers, { searchTerm });
  const startConversation = useMutation(api.conversations.getOrCreateConversation);

  const handleUserClick = async (userId: Id<"users">) => {
    try {
      const conversationId = await startConversation({ otherUserId: userId });
      onSelect(conversationId);
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
        <h2 className="text-xl font-bold text-gray-800">Chats</h2>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* User List / Empty State */}
      <div className="flex-1 overflow-y-auto">
        {users === undefined ? (
          <div className="p-4 text-center text-gray-500 text-sm">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm flex flex-col items-center mt-10">
            <p>No users found</p>
            {searchTerm && <p className="text-xs mt-1">Try a different name</p>}
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {users.map((user) => (
              <div 
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{user.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}