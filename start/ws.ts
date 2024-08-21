import Deck from '#models/deck'
import DeckCard from '#models/deck_card'
import Game from '#models/game'
import GameCard from '#models/game_card'
import GamePlayer from '#models/game_player'
import Zone from '#models/zone'
import Ws from '#services/ws'
import app from '@adonisjs/core/services/app'
app.ready(() => {
  Ws.boot()
  const io = Ws.io
  io?.on('connection', (socket) => {
    socket.on('join-game', async ({ gameId, deckId, playerId }) => {
      const huj = await Zone.query()
        .select('*')
        .where('game_player_id', playerId)
        .where('name', 'deck')
        .first()

      const deck = await DeckCard.query().where('deck_id', deckId).preload('deck')
      if (!deck) return
      for (const card of deck) {
        for (let i = 0; i < card.quantity; i++) {
          GameCard.create({
            zoneId: huj?.id,
            baseCardId: card.baseCardId,
            ownerId: card.deck.userId,
          })
        }
      }
      console.log(huj)
      const game = await Game.query()
        .preload('players', (playersQuery) => {
          playersQuery.preload('zones', (zonesQuery) => {
            zonesQuery.preload('cards', (cardsQuery) => {
              cardsQuery.preload('baseCard')
            })
          })
        })
        .where('games.id', gameId)
        .first()
      io.emit(`game-${gameId}`, game)
    })
  })
})
