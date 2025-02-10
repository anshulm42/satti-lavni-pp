import { getDatabase, ref, set, get } from "firebase/database";
import { Player } from "../types/types";

// Function to generate a unique user ID
const generateUserId = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let userId = "";
  for (let i = 0; i < 8; i++) {
    userId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return userId;
};

// Function to create a new user
export const createUser = async (username: string): Promise<void> => {
  const userId = generateUserId();
  const db = getDatabase();
  const usersRef = ref(db, `users/${userId}`);

  const userData = {
    userId,
    username,
    createdAt: Date.now(), // Store when the user was created
  };

  try {
    // Check if the username is already taken
    const usernameRef = ref(db, `users`);
    const snapshot = await get(usernameRef);
    const users = snapshot.val();
    if (Object.values(users).some((user: Player) => user.username === username)) {
      throw new Error("Username is already taken");
    }

    // If username is unique, add the user to the database
    await set(usersRef, userData);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Propagate error for further handling
  }
};
