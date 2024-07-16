import GamesController from '#controllers/games_controller'
import Deck from '#models/deck'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import DecksView from '~/components/decks_view'
import { Button } from '~/lib/components/ui/button'
import { socket } from '~/socket'

export default function Game(props: InferPageProps<GamesController, 'show'>) {
  useEffect(() => {
    socket.timeout(1000).emit('join-game', {
      id: props.game?.id,
      user: props.user,
    })
  }, [])
  return (
    <>
      <Head title="Homepage" />
      <Button onClick={() => socket.emit('join-game', props.game?.id)}>Join Game</Button>
    </>
  )
}
