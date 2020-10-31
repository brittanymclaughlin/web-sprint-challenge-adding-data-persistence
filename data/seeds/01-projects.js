
exports.seed = async function(knex) {
    await knex("projects").insert([
      {
        name: 'Create portfolio', 
        description: 'Create a portfolio to display your work',
        isComplete: false
      },
      {
        name: 'Make new friends',
        description: 'Make new friends to hang out with.',
        isComplete: false
      },
      {
        name: 'Expand vocabulary',
        description: 'Expand your vocabulary to sound more intelligent.',
        isComplete: false
      }
    ])
};
