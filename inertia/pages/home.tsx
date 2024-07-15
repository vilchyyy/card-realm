import Deck from '#models/deck'
import { Head } from '@inertiajs/react'
import DecksView from '~/components/decks_view'

export default function Home(props: { user: any; decks: Deck[] }) {
  return (
    <>
      <Head title="Homepage" />

      <div>{props.user.email}</div>
      <div>
        <DecksView decks={props.decks} />
      </div>
    </>
  )
}
