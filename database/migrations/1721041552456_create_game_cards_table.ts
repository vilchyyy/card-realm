import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'game_cards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('controller_id').references('id').inTable('game_players')
      table.integer('zone_id').references('id').inTable('zones')
      table.string('base_card_id').references('id').inTable('base_cards')
      table.integer('owner_id').references('id').inTable('users')
      table.boolean('is_faceup').defaultTo(true)
      table.boolean('is_token').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
