export type Card = {
  _id: string
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
  face: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K'
  suit: 's' | 'd' | 'h' | 'c'
  turned: boolean
};


export type Player = {
  _id: string
  username: string
  created_at: string
  status: "waiting" | "ready" | "playing" | "finished" | "disconnected"
  score: number
  isTurn: boolean
  lastAction: string | null
  hand: Card[] | null
}

export type Room = {
  _id: string
  maxPlayers: number
  turnOrder: string[]
  currentTurn: string
  winner: string | null
  code: string
  status: "waiting" | "active" | "finished"
  created_at: string
  deck: Card[]
  players: Record<string, Player>
  actions: Record<string, Action>
}

export type Action = {
  playerId: string
  actionType: "playCard" | "pass" | "quit"
  cardPlayed: Card | null
  timestamp: string
}
