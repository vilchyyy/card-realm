import GamesController from '#controllers/games_controller'
import Deck from '#models/deck'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DecksView from '~/components/decks_view'

export default function Game(props: InferPageProps<GamesController, 'show'>) {
  return (
    <>
      <Head title="Homepage" />
    </>
  )
}
