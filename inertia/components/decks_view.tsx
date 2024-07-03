import { Button } from '~/lib/components/ui/button'
import DeckTile from './deck_tile'
import { Input } from '~/lib/components/ui/input'

export default function DecksView() {
  return (
    <>
      <h1 className="text-white text-3xl font-bold">Decks</h1>
      <Input />
      <Button>Import Deck</Button>
      <Button
        onClick={async () => {
          const cards = await fetch('/base_cards')
          console.log(cards)
        }}
      >
        Update Database
      </Button>
      <div className="flex max-w-3xl flex-wrap justify-center gap-x-4 gap-y-8">
        <DeckTile />
        <DeckTile />
        <DeckTile />
        <DeckTile />
        <DeckTile />
        <DeckTile />
      </div>
    </>
  )
}
