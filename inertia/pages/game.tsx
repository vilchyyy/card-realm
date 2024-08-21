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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/lib/components/ui/dialog'

export default function Game(props: InferPageProps<GamesController, 'show'>) {
  const [dragData, setDragData] = useState<any>([])

  const [zones, setZones] = useState<any>([])
  const [game, setGame] = useState<any>(null)

  useEffect(() => {
    socket.on(`game-${props.game?.id}`, (data) => {
      console.log(data)
      setGame(data)
    })
  }, [])

  const handleDragEnd = (event: DragEndEvent) => {
    setDragData((prevdragData: any) => ({
      ...prevdragData,
      [event.active.id]: {
        transform: {
          x: event.delta.x + (prevdragData?.[event.active.id]?.transform?.x ?? 0),
          y: event.delta.y + (prevdragData?.[event.active.id]?.transform?.y ?? 0),
        },
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
          <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle onClick={() => console.log(game)}>
                  Choose a deck to start with
                </DialogTitle>

                {props.decks.map((deck: Deck) => (
                  <Button
                    key={deck.id}
                    onClick={() => {
                      socket.emit('join-game', {
                        gameId: props.game?.id,
                        deckId: deck.id,
                        playerId: props.player.id,
                      })
                    }}
                  >
                    {deck.name}
                  </Button>
                ))}
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <div>
            <Button
              onClick={() => {
                const playerIndex = game.players.findIndex(
                  (player: any) => player.id === props.player.id
                )

                if (playerIndex === -1) {
                  return
                }

                const deckZoneIndex = game.players[playerIndex].zones.findIndex(
                  (zone: any) => zone.name === 'deck'
                )

                const handZoneIndex = game.players[playerIndex].zones.findIndex(
                  (zone: any) => zone.name === 'hand'
                )
                const card = game.players[playerIndex].zones[deckZoneIndex].cards[0]
                setGame((prevGame: any) => ({
                  ...prevGame,
                  players: game.players.map((player: any) => {
                    if (player.id === props.player.id) {
                      return {
                        ...player,
                        zones: player.zones.map((zone: any) => {
                          if (zone.name === 'hand') {
                            return {
                              ...zone,
                              cards: [...zone.cards, card],
                            }
                          } else if (zone.name === 'deck') {
                            return {
                              ...zone,
                              cards: [...zone.cards.slice(1)],
                            }
                          }

                          return zone
                        }),
                      }
                    }
                    return player
                  }),
                }))
                console.log(game)
              }}
            >
              Draw Card
            </Button>

            <div className="flex flex-wrap">
              {game &&
                game.players
                  .find((player: any) => player.id === props.player.id)
                  .zones.find((zone: any) => zone.name === 'hand')
                  .cards.map((card: any) => (
                    <Draggable
                      key={card.id}
                      id={card.id}
                      style={{
                        position: 'absolute',
                        top: dragData[card.id]?.transform.y ?? 0,
                        left: dragData[card.id]?.transform.x ?? 0,
                      }}
                    >
                      <div key={card.baseCard.id}>
                        <img width={200} src={card.baseCard.image} />
                      </div>
                    </Draggable>
                  ))}
            </div>
          </div>
        </div>
      </DndContext>
    </>
  )
}
