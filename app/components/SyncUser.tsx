"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";

export default function SyncUser() {
  const { isSignedIn, user } = useUser();
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    // Only attempt to sync if the user is fully signed in and loaded
    if (isSignedIn && user) {
      storeUser().catch(console.error);
    }
  }, [isSignedIn, user, storeUser]);

  return null; // This component renders nothing to the UI
}