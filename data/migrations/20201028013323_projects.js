
exports.up = async function(knex) {
  await knex.schema.createTable("projects", (table)=>{
      table.increments("ID").unique()

      table
        .text('name')
        .notNull()
        .unique()
    
      table
        .text('description')
        
      table
        .boolean("isComplete")
        .notNull()
        .defaultTo(false)
  })
  await knex.schema.createTable("resources", (table)=>{
      table
        .increments('ID')
        .unique()
        .notNull()

      table
        .text('name')
        .unique()
        .notNull()

      table
        .text('description')
        
  })
  await knex.schema.createTable("tasks", (table)=>{
      table
        .increments("ID")
        .unique()
        .notNull()

      table
        .text('description')
        .notNull()
        
      table
        .text('notes')

      table
        .boolean('isCompleted')
        .notNull()
        .defaultTo(false)

      table
        .integer('projectID')
        .notNull()
        .references('ID')
        .inTable('projects')
  })
  await knex.schema.createTable("projectResources", (table)=>{
      table
        .integer('projectID')
        .references('ID')
        .inTable('projects')
        .notNull()

      table
        .integer('resourceID')
        .references('ID')
        .inTable('resources')
        .notNull()
  })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("projectResources")
    await knex.schema.dropTableIfExists("tasks")
    await knex.schema.dropTableIfExists("resources")
    await knex.schema.dropTableIfExists("projects")
};
