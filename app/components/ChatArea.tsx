import { MessageSquareOff } from "lucide-react";

export default function ChatArea({ 
  conversationId, 
  onBack 
}: { 
  conversationId: string | null; 
  onBack: () => void;
}) {
  // Empty State (No conversation selected)
  if (!conversationId) {
    return (
      <div className="hidden md:flex flex-col flex-1 items-center justify-center bg-gray-50">
        <MessageSquareOff className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-700">No chat selected</h3>
        <p className="text-gray-500 text-sm mt-2">Choose a conversation from the sidebar</p>
      </div>
    );
  }

  // Active Chat State (Placeholder for now)
  return (
    <div className="flex flex-col h-full bg-white flex-1">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 flex items-center shadow-sm">
        <button onClick={onBack} className="md:hidden mr-4 text-blue-500 font-medium">
          Back
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Chat Name</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
          No messages in this conversation
        </div>
      </div>

      {/* Message Input Placeholder */}
      <div className="p-4 bg-white border-t border-gray-200">
        <input 
          type="text" 
          placeholder="Type a message..." 
          className="w-full bg-gray-100 rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}