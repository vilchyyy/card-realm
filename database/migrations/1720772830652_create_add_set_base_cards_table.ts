import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'base_cards'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('set').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
