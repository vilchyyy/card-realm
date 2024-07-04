import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'deck_cards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('base_card_id').unsigned().references('id').inTable('base_cards')
      table.integer('deck_id').unsigned().references('id').inTable('decks')
      table.unique(['deck_id', 'base_card_id'])
      table.integer('quantity').defaultTo(1)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
