import React, { useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

// Helper function to generate random IDs
function randomID(len = 5) {
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP'
    let result = ''
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

const Room = () => {
    const { roomId } = useParams()
    const location = useLocation()
    const callType = new URLSearchParams(location.search).get('type')
    const containerRef = useRef(null)

    useEffect(() => {
        const appId = Number(import.meta.env.VITE_APP_ID)
        const serverSecret = import.meta.env.VITE_SERVER_SECRET

        if (!appId || !serverSecret) {
            console.error('❌ Missing App ID or Server Secret in environment variables')
            return
        }

        // ✅ Generate token
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret,
            roomId,
            Date.now().toString(),
            `${roomId}` 
        )

        // ✅ Create instance and join the room
        const zp = ZegoUIKitPrebuilt.create(kitToken)
        zp.joinRoom({
            container: containerRef.current,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url: `${window.location.origin}/room/${roomId}`,
                },
            ],
            scenario: {
                mode:
                    callType === 'group-call'
                        ? ZegoUIKitPrebuilt.GroupCall
                        : ZegoUIKitPrebuilt.OneONoneCall,
            },
            showPreJoinView: true,

            mirrorLocalVideo:false,
        })

        // Cleanup on unmount
        return () => {
            if (zp && typeof zp.destroy === 'function') zp.destroy()
        }
    }, [roomId, callType])

    const navigate = useNavigate()

    return (
        <div className="w-screen h-screen bg-gradient-to-r from-neutral-400 via-neutral-700 to-neutral-950">
            <div className="absolute top-4 left-4 text-gray-200 z-20">
                <div className="text-3xl text-gradient-to-b from-gray-200 via-gray-400 to-gray-600 drop-shadow-md font-bold select-none " onClick={()=>navigate("/")}>
                    NamasteCam
                </div>
            </div>

            {/* Video Call Container */}
            <div ref={containerRef} className="w-full h-full" 
            />
        </div>
    )
}

export default Room
