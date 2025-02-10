import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import { Player } from "../types/types";

const WaitingPage: React.FC = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const [players, setPlayers] = useState<{ [key: string]: Player }>({});
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null); // Store current player's ID or username

  useEffect(() => {
    if (roomCode?.length === 5) {
      const db = getDatabase();
      const roomRef = ref(db, `rooms/${roomCode}/players`);
      const fetchPlayers = async () => {
        const snapshot = await get(roomRef);
        if (snapshot.exists()) {
          const playersData = snapshot.val();
          setPlayers(playersData);

          // Optionally, get the current player's ID if it's stored elsewhere (e.g., from local storage)
          const currentPlayer = playersData?.username; // Adjust depending on how current player is tracked
          if (currentPlayer) {
            setCurrentPlayerId(currentPlayerId); // Set current player ID if needed
          }
        }
      };
      fetchPlayers();
    }
  }, [roomCode, currentPlayerId]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Waiting for players to join...</h2>
      <h3>Players in the room:</h3>
      {Object.keys(players).length > 0 ? (
        <ul>
          {Object.keys(players).map((playerId) => {
            const isCurrentPlayer = playerId === currentPlayerId;
            return (
              <li
                key={playerId}
                style={{
                  color: isCurrentPlayer ? "blue" : "white", // Highlight current player in blue
                }}
              >
                {players[playerId].username}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No players yet.</p>
      )}
    </div>
  );
};

export default WaitingPage;
