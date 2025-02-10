// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
    databaseURL: import.meta.env.VITE_REACT_APP_FIREBASE_DATABASE_URL,
};

// Initialize Firebase app and database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to generate a 5-character alphanumeric room code
const generateRoomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
};

// Function to create a room
export const createRoom = async () => {
    const roomCode = generateRoomCode();
    const roomRef = ref(db, `rooms/${roomCode}`);

    // Initial room data
    const roomData = {
        roomCode,
        createdAt: Date.now(),
        players: {},
        status: "waiting", // "waiting" until players join
    };

    // Save room data to the database
    await set(roomRef, roomData);
    return roomCode;
};
// Function to generate a random player ID
export const generatePlayerId = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let playerId = "";
    for (let i = 0; i < 8; i++) {
        playerId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return playerId;
};

// Function to add a player to the room
export const joinRoom = async (roomCode: string, username: string): Promise<void> => {
    const playerId = generatePlayerId(); // Create a unique player ID
    const db = getDatabase();
    const roomRef = ref(db, `rooms/${roomCode}/players/${playerId}`);

    const playerData = {
        playerId, // Unique player ID
        username, // Username of the player
        status: "waiting", // Initial status can be "waiting"
    };

    try {
        await set(roomRef, playerData); // Add player to the database under the room code
    } catch (error) {
        console.error("Error adding player to room:", error);
    }
};