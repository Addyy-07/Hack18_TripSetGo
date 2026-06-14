// src/hooks/useTripCollaboration.js
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '@/features/auth/authSlice'
import { useSocket } from './useSocket'

export function useTripCollaboration(tripId, onItineraryUpdated) {
  const user = useSelector(selectUser)
  const socket = useSocket()
  const [presence, setPresence] = useState([])

  useEffect(() => {
    if (!socket || !tripId || !user?._id) return

    // Emit join_trip to enter the room
    socket.emit('join_trip', {
      tripId,
      userId: user._id,
      name: user.name,
      avatar: user.avatar,
    })

    // Listen for presence changes from other collaborators
    socket.on('presence_change', ({ users }) => {
      setPresence(users)
    })

    // Listen for real-time itinerary updates
    socket.on('itinerary_updated', ({ tripId: updatedTripId }) => {
      if (updatedTripId === tripId && onItineraryUpdated) {
        onItineraryUpdated()
      }
    })

    return () => {
      socket.emit('leave_trip', { tripId })
      socket.off('presence_change')
      socket.off('itinerary_updated')
    }
  }, [socket, tripId, user?._id, user?.name, user?.avatar, onItineraryUpdated])

  return { presence }
}
