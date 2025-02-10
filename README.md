## Database structure:
```
  card:
      _id
      value
      suit

  player:
      _id
      username
      created_at
      status
      score
      isTurn
      lastAction
      hand: card[]

  room:
      _id
      maxPlayers
      turnOrder
      currentTurn
      winner
      code
      status
      created_at
      deck: card[]
      players: player[]

  actions:
      playerId: string
      actionType: "draw" | "playCard" | "pass" | "quit"
      cardPlayed: card | null
      timestamp: timestamp
```

## Entity Hirerachy
```
  rooms
    {room_id}
      maxPlayers: integer
      turnOrder: string[] (player_id array)
      currentTurn: string (player_id)
      winner: string | null (player_id)
      code: string
      status: "waiting" | "active" | "finished"
      created_at: timestamp
      cardPlayed:
        {card_id}
          value: string
          suit: string
      deck:
        {card_id}
          value: string
          suit: string
      players:
        {player_id}
          username: string
          created_at: timestamp
          status: "waiting" | "ready" | "playing" | "finished" | "disconnected"
          score: integer
          isTurn: boolean
          lastAction: timestamp
          hand:
            {card_id}
              value: string
              suit: string
      actions:
        {action_id}
          playerId: string
          actionType: "playCard" | "pass" | "quit"
          cardPlayed: (optional)
            {card_id}
              value: string
              suit: string
          timestamp: timestamp
```

## UI
Player Name
[]


Create room -> Waiting for players to join

[room code]
Join room