import { useState } from "react"
import CreateRoom from "./CreateRoom"
import JoinRoom from "./JoinRoom"


const Home: React.FC = () => {
    const [username, setUsername] = useState<string>("")

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-between gap-6">
            <h1 className="text-3xl font-bold mb-4">Satti Lavni</h1>
            <input
                id="userName"
                placeholder="Enter Username..."
                onChange={handleUsernameChange}
                value={username}
                className="border border-gray-300 p-3 text-lg rounded-md mb-6"
            />
            <div className="flex flex-col w-full items-center justify-around">
                <h2 className="text-2xl font-semibold mb-2">Create or Join a Room</h2>
                <div id="actionGroup" className="flex w-full items-center justify-around">
                    <CreateRoom />
                    <JoinRoom />
                </div>
            </div>
        </div>
    )
}

export default Home