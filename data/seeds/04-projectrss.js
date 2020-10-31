
exports.seed = async function(knex) {
  await knex("projectResources").insert([
    {
      projectID: 1, 
      resourceID: 1
    },
    {
      projectID: 1,
      resourceID: 2
    },
    {
      projectID: 2,
      resourceID: 4
    },
    {
      projectID: 3,
      resourceID: 3
    }
  ])
};
