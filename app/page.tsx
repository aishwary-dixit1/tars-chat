import { UserButton } from "@clerk/nextjs";
import SyncUser from "./components/SyncUser";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      {/* This handles the database sync silently in the background 
        when the user hits the page. 
      */}
      <SyncUser />

      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Tars Chat</h1>
        <p className="text-gray-500 mb-4">You are successfully authenticated.</p>
        
        {/* Clerk's pre-built avatar and account management button */}
        <div className="border border-gray-200 p-2 rounded-full">
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </main>
  );
}