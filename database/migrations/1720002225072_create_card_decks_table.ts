import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'card_decks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('card_id').unsigned().references('id').inTable('base_cards')
      table.integer('deck_id').unsigned().references('id').inTable('decks')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
