import { Button } from '~/lib/components/ui/button'
import DeckTile from './deck_tile'
import { Textarea } from '~/lib/components/ui/textarea'
import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Input } from '~/lib/components/ui/input'

export default function DecksView() {
  const [formData, setFormData] = useState({ name: '', deck: '' })
  return (
    <>
      <h1 className="text-white text-3xl font-bold">Decks</h1>
      <form className="flex flex-col gap-y-4 w-1/3 m-4 mx-auto">
        <Input
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Deck Name"
        />
        <Textarea
          className="h-[300px]"
          value={formData.deck}
          onChange={(e) => setFormData({ ...formData, deck: e.target.value })}
        />
        <Button
          onClick={(e) => {
            e.preventDefault()
            router.post('/decks', { ...formData })
          }}
        >
          Import Deck
        </Button>
      </form>

      <Button
        onClick={async () => {
          await fetch('/base_cards')
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
