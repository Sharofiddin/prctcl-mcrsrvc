export function up(knex)  {   return knex.schema.createTable("videos", (table) => {
    table.increments();
    table.string("owner_id");
    table.string("name");
    table.string("description");
    table.string("transcoding_status");
    table.integer("view_count").defaultsTo(0);
  });   }
export function down(knex) { return knex.schema.dropTable("videos"); }
