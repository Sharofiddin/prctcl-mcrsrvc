export function up(knex)
  {     return knex.schema.createTable('pages', table => {
    table.string('page_name').primary()
    table.jsonb('page_data').defaultsTo('{}')
  })}
  export function down(knex) {   return knex.schema.dropTable('pages')}