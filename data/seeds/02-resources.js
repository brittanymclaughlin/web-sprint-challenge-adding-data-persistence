
exports.seed = async function(knex) {
  await knex("resources").insert([
    {
      name: 'Computer', 
      description: 'Decent computer to create the work.'
    },
    {
      name: 'Keyboard',
      description: 'Corded or wireless keyboard to work the computer.'
    },
    {
      name: 'Dictionary',
      description: 'Standard english dictionary'
    },
    {
      name: 'Mouth',
      description: 'Mouth to speak to the new potential friends'
    }
  ])
};
