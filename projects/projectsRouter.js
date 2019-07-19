const express = require('express');
const router = express.Router();
const projects = require('./projectsDb');

router.use(express.json());


router.get('/', async (req, res) => {
    projects.find()
        .then( projects => {
            res.status(200).json(projects);
        })
        .catch( err => {
            res.status(500).json(err);
            console.log(err);
        })
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await projects.findById(id);

    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get project' });
    console.log(err)
  }
});

router.get('/:id/actions', async (req, res) => {
  const { id } = req.params;

  try {
    const actions = await projects.findActions(id);

    if (actions.length) {
      res.json(actions);
    } else {
      res.status(404).json({ message: 'Could not find actions for given project' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get actions' });
  }
});

router.post('/', async (req, res) => {
  const projectData = req.body;

  try {
    const project = await projects.add(projectData);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new project' });
    console.log(err)
  }
});

router.post('/:id/actions', async (req, res) => {
  const actionData = req.body;
  const { id } = req.params; 

  try {
    const project = await projects.findById(id);

    if (project) {
      const action = await projects.addAction({project_id:id, ...actionData}, id);
      res.status(201).json(action);
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new action' });
    console.log(err)
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const project = await projects.findById(id);

    if (project) {
      const updatedproject = await projects.update(changes, id);
      res.json(updatedproject);
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update project' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await projects.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project' });
  }
});

module.exports = router;