import GamesController from '#controllers/games_controller'
import Deck from '#models/deck'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import DecksView from '~/components/decks_view'
import { Button } from '~/lib/components/ui/button'
import { socket } from '~/socket'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Draggable } from '~/components/dnd/draggable'

export default function Game(props: InferPageProps<GamesController, 'show'>) {
  useEffect(() => {
    socket.timeout(1000).emit('join-game', {
      id: props.game?.id,
      user: props.user,
    })
  }, [])

  const [dragData, setDragData] = useState<any>({
    id: 1,
    transform: {
      x: 0,
      y: 0,
    },
  })

  const handleDragEnd = (event: DragEndEvent) => {
    setDragData((prevdragData: any) => ({
      ...prevdragData,
      transform: {
        x: event.delta.x,
        y: event.delta.y,
      },
    }))
  }

  return (
    <>
      <DndContext
        onDragEnd={(ev) => {
          console.log(ev)
          handleDragEnd(ev)
          console.log(dragData)
        }}
      >
        <Head title="Homepage" />
        <div className="w-full h-screen relative">
          <Draggable
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            Draggable
          </Draggable>
          <Button onClick={() => socket.emit('join-game', props.game?.id)}>Join Game</Button>
        </div>
      </DndContext>
    </>
  )
}
