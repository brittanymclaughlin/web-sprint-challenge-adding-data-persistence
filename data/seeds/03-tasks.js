
exports.seed = async function(knex) {
  await knex("tasks").insert([
    {
      description: 'Create small project websites.',
      notes: '',
      isCompleted: false,
      projectID: '1'
    },
    {
      description: 'Pick a design that you are happy with for portfolio.',
      notes: '',
      isCompleted: false,
      projectID: '1'
    },
    {
      description: 'Talk to new people',
      notes: '',
      isCompleted: false,
      projectID: '2'
    },
    {
      description: 'Study new words that you do not know the meaning of.',
      notes:'',
      isCompleted: false,
      projectID: '3'
    }
  ])
};
