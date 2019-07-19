exports.up = function(knex) {
    return knex.schema
      .createTable('projects', tbl => {
        tbl.increments();
        tbl.text('project_name', 128)
            .unique()
            .notNullable();
        tbl.text('description')
            .notNullable();
        tbl.boolean('is_complete').defaultTo(0)
      })
      .createTable('actions', tbl => {
        tbl.increments();
        tbl.text('description')
            .notNullable();
        tbl.text('notes');
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.boolean('is_complete').defaultTo(0);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('actions')
      .dropTableIfExists('projects');
  };