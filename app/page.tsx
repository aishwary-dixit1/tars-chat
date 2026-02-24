"use client";

import { useState } from "react";
import SyncUser from "./components/SyncUser";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

export default function Home() {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

  return (
    <main className="flex h-screen w-full bg-gray-100 overflow-hidden">
      <SyncUser />

      {/* Sidebar Container: Hidden on mobile if a chat is active */}
      <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 transition-all ${activeConversation ? 'hidden md:block' : 'block'}`}>
        <Sidebar onSelect={(id) => setActiveConversation(id)} />
      </div>

      {/* Chat Area Container: Hidden on mobile if NO chat is active */}
      <div className={`flex-1 transition-all ${!activeConversation ? 'hidden md:flex' : 'flex'}`}>
        <ChatArea 
          conversationId={activeConversation} 
          onBack={() => setActiveConversation(null)} 
        />
      </div>
    </main>
  );
}