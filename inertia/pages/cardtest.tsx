import Deck from '#models/deck'
import { Head } from '@inertiajs/react'
import DecksView from '~/components/decks_view'
import DragDropContainer from '~/components/dnd/drag_drop_container'

export default function CardTest(props: { user: any; decks: Deck[] }) {
  return (
    <>
      <Head title="Homepage" />
      <div>
        <DragDropContainer />
      </div>
    </>
  )
}
