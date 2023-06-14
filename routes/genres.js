const express = require('express');
//app = express() is not valid when the routes have been separated from the index file
//create a router object instead, and export at the end
const router = express.Router();

const genres = [
  { id: 1, name: 'Comedy' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Action' },
  { id: 4, name: 'Family' },
  { id: 5, name: 'Romance' },
];

//GET
router.get('/', (req, res) => {
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send('The genre with the given ID is not found.');
    return;
  }
  res.send(genre);
});

//POST
router.post('/api/genres/', (req, res) => {
  //Validate message in body of req
  const { error } = validateGenre(req.body);
  if (error) {
    //400 Bad Request
    res.status(400).send(error.details[0].message);
    return;
  }

  //incremement and append new genre entry into genres array
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

//PUT
router.put('/:id', (req, res) => {
  //Look up genre. If not existing, return 404
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send('The genre with the given ID is not found.');
    return;
  }

  //Validate body. If invalid, return 400 - Bad Request
  const { error } = validateGenre(req.body);
  if (error) {
    //400 Bad Request
    res.status(400).send(error.details[0].message);
    return;
  }

  //Update genre and return the updated genre
  genre.name = req.body.name;
  res.send(genre);
});
//DELETE
router.delete('/:id', (req, res) => {
  //Look up course, if not existing return 404
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send('The genre with the given ID is not found.');
    return;
  }

  //Delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  //Return the same genre
  res.send(genre);
});

//MISC FUNCTIONS
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });
  return schema.validate(genre);
}

// Exporting router to be used in index
module.exports = router;
