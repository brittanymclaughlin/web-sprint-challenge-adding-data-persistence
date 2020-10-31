const express = require('express');

const Projects = require('./projects-model.js');

const router = express.Router();

// GET all projects from the project database
router.get('/', (req, res) => {
  Projects.getProject()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get the projects!' });
  });
});

//GET all resources for a certain project
router.get('/:id/resources', async (req, res, next) => {
    const { id } = req.params
    try{
       
        Projects.getResources(id)
            .then(rss => {
                res.json(rss);
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to get the resources!' });
            });
    } catch(error){
        next(error);
    }

  });

//GET all tasks for a certain ID
router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;

  Projects.getTasks(id)
  .then(tasks => {
    if (tasks.length) {
      res.json(tasks);
    } else {
      res.status(404).json({ message: 'Could not find tasks for given project.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks.' });
  });
});

//POST a new project to the database
router.post('/', async (req, res, next) => {
  const projectData = {
      name : req.body.name,
      description : req.body.description,
      completed : req.body.completed
  };
  console.log(projectData)
  if (!projectData.name){
      return res.status(404).json({message: 'Need information!'})
  }
    try{
        Projects.addProject(projectData)
            .then(project => {
                Projects.getProjectById(project)
                    .then(results=>{
                            let [flatten] = results;
                            res.status(201).json(flatten);
                            })
   
                    })
            .catch (err => {
                res.status(500).json({ message: 'Failed to create new project.' });
                 });

    }catch(error){
        next(error)
    }
});

router.post('/resources', async (req, res, next) => {
    try {
        const resourceData = req.body
        Projects.addResources(resourceData)
          .then(resource => {
            res.status(201).json(resource)
          })
      } catch(err) {
        next(err)
      }
    });


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.findById(id)
  .then(project => {
    if (project) {
      Projects.update(changes, id)
      .then(updatedProject => {
        Projects.findById(id)
        .then(results=>{
          const [flat] = results;
          res.json(flat);
        })
        
      });
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update project.' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({message: 'Your project has been deleted.'});
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete project.' });
  });
});

module.exports = router;