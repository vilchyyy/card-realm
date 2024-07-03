import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'base_cards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().unique()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('name')
      table.string('description', 10000)
      table.integer('power').nullable()
      table.integer('toughness').nullable()
      table.string('image')
      table.string('type')
      table.string('mana_cost')
      table.string('artist')
      table.string('flavor_text', 10000)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
