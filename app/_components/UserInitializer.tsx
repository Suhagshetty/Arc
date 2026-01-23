"use client";

import { useUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/FireBaseConfig";
import { useEffect, useState } from "react";

const UserInitializer = () => {
  const { user, isLoaded } = useUser();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run if Clerk is loaded, user exists, and hasn't been initialized yet
    if (isLoaded && user && !isInitialized) {
      CreateNewUser();
    }
  }, [user, isLoaded, isInitialized]);

  const CreateNewUser = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const userRef = doc(db, "users", user.primaryEmailAddress.emailAddress);
      
      // Add a small delay to ensure Firebase is ready
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        console.log("existing user");
      } else {
        const userData = {
          name: user?.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress,
          createdAt: new Date(),
          remainingMsg: 5,
          plan: "Free",
          credits: 1000,
        };
        await setDoc(userRef, userData);
        console.log("new user data saved");
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error("Error creating user:", error);
      // Retry after a delay if offline
      if (error instanceof Error && error.message.includes("offline")) {
        console.log("Retrying in 2 seconds...");
        setTimeout(() => {
          setIsInitialized(false);
        }, 2000);
      }
    }
  };

  return null;
};

export default UserInitializer;