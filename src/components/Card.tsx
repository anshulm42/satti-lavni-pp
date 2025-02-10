// src/components/Card.tsx
import { Card } from 'card-games-typescript'

interface CardProps {
  rank: string
  suit: string
}

const Card: React.FC<CardProps> = ({ rank, suit }) => {
  // Create an instance of ExtendedCard
  const card: Card = new Card(rank, suit)

  return (
    <div className="card-container">
      <img className="card" src={card.image} alt={`${rank} of ${suit}`} />
    </div>
  )
}

export default Card
