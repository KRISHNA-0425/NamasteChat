import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const [roomId, setRoomId] = useState('')
    const navigate = useNavigate()

    const generateRoomId = () => {
        const id = Math.random().toString(36).substring(2, 10).toUpperCase()
        setRoomId(id)
        toast.success('Room ID generated!')
    }

    const copyRoomId = () => {
        if (!roomId) {
            toast.error('No Room ID to copy!')
            return
        }
        navigator.clipboard.writeText(roomId)
        toast.success('Room ID copied to clipboard!')
    }

    const handleOneOnOne = () => {
        if (!roomId) {
            toast.error('Generate the Room ID first!')
            return
        }
        navigate(`/room/${roomId}?type=one-on-one`)
    }

    const handleGroupCall = () => {
        if (!roomId) {
            toast.error('Generate the Room ID first!')
            return
        }
        navigate(`/room/${roomId}?type=group-call`)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-neutral-400 via-neutral-700 to-neutral-950 text-center px-6">

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600 drop-shadow-md select-none tracking-tight">
                Welcome to NamasteCam
            </h1>

            {/* Subtitle */}
            <h3 className="text-slate-300 text-lg md:text-xl mt-4">
                Connect Face-to-Face. Anytime. Anywhere.
            </h3>

            {/* Paragraph */}
            <p className="tracking-tight text-slate-400 max-w-2xl mt-6 leading-relaxed">
                Stay close to your people with crystal-clear video, smooth audio, and instant connections — all in one beautiful, secure app made in India 🇮🇳.
            </p>

            {/* Room ID Input */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
                <input
                    type="text"
                    placeholder="Generated Room ID"
                    readOnly
                    value={roomId}
                    className="px-4 py-2 text-center rounded-lg bg-zinc-800 text-slate-200 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all w-64"
                />

                <button
                    onClick={generateRoomId}
                    className="px-8 py-3 rounded-2xl text-white font-semibold bg-gradient-to-bl from-gray-400 via-gray-600 to-gray-800 shadow-md hover:brightness-110 hover:shadow-lg active:brightness-95 transition-all duration-300"
                >
                    Generate Room ID
                </button>

                {roomId && (
                    <button
                        onClick={copyRoomId}
                        className="px-4 py-2 rounded-xl text-sm font-semibold bg-zinc-700 text-gray-300 hover:bg-zinc-600 active:brightness-90 transition-all"
                    >
                        Copy
                    </button>
                )}
            </div>

            {/* Call Type Buttons */}
            <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
                <button
                    disabled={!roomId}
                    onClick={handleOneOnOne}
                    className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${roomId
                            ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 text-gray-100 shadow-md hover:brightness-110 hover:shadow-lg active:brightness-95'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-60'
                        }`}
                >
                    One-To-One
                </button>

                <button
                    disabled={!roomId}
                    onClick={handleGroupCall}
                    className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${roomId
                            ? 'bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 text-gray-100 shadow-md hover:brightness-110 hover:shadow-lg active:brightness-95'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-60'
                        }`}
                >
                    Group Call
                </button>
            </div>
        </div>
    )
}

export default HomePage
