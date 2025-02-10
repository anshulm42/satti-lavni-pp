import { useState } from "react"


const JoinRoom: React.FC = () => {
    const [roomCode, setRoomCode] = useState<string>("")

    const handleRoomCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomCode(event.target.value)
        console.log(roomCode)
    }
    return (
        <div className="flex flex-row items-center gap-2">
            <input
                id="roomCode"
                placeholder="Room code"
                onChange={handleRoomCodeChange}
                className={'border border-gray-300 p-2 text-lg rounded-md'}
            />
            <button className="w-auto">Join Room</button>
        </div>
    )
}

export default JoinRoom