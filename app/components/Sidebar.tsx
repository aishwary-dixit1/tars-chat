import { UserButton } from "@clerk/nextjs";

export default function Sidebar({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Chats</h2>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>

      {/* Search Bar Placeholder */}
      <div className="p-4">
        <input 
          type="text" 
          placeholder="Search users..." 
          className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Conversation List Placeholder */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-gray-500">
        <p className="text-sm">No conversations yet</p>
        <p className="text-xs mt-1">Search for a user to start chatting</p>
      </div>
    </div>
  );
}