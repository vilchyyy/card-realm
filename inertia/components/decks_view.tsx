import { Card, CardDescription } from '~/lib/components/ui/card'
import DeckTile from './deck_tile'
import { useState } from 'react'
import { Input } from '~/lib/components/ui/input'

export default function DecksView() {
  return (
    <>
      <h1 className="text-white text-3xl font-bold">Decks</h1>
      <Input />
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
