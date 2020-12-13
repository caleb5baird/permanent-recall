
var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Passage = require('../modules/passage.js');


router.get('/', (req, res, next) => {
  console.log('Getting Passages From Database');
  Passage.find()
    .then(passages => {
      res.status(200)
        .json({
          message: 'passages fetched successfully!',
          passages: passages
        });
    })
    .catch(error => {
      res.status(500)
        .json({
          message: 'An error occurred',
          error: error
        });
    });
});

router.get('/:id', (req, res, next) => {
  Passage.findOne({
    "id": req.params.id
  })
    .then(passage => {
      res.status(200)
        .json({
          message: 'Passage fetched successfully!',
          passage: passage
        });
    })
    .catch(error => {
      res.status(500)
        .json({
          message: 'An error occurred',
          error: error
        });
    });
});

router.post('/', (req, res, next) => {
  const maxPassageId = sequenceGenerator.nextId("passages");

  const passage = new Passage({
    id: maxPassageId,
    prompt: req.body.prompt,
    reference: req.body.reference,
    text: req.body.text,
    reviews: req.body.reviews
  });

  passage.save()
    .then(createdPassage => {
      res.status(201).json({
        message: 'Passage added successfully',
        passage: createdPassage
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

router.put('/:id', (req, res, next) => {
  Passage.findOne({ id: req.params.id })
    .then(passage => {
      passage.prompt = req.body.prompt;
      passage.reference = req.body.reference;
      passage.text = req.body.text;
      passage.reviews = req.body.reviews;

      Passage.updateOne({ id: req.params.id }, passage)
        .then(result => {
          res.status(204).json({
            message: 'Passage updated successfully'
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Passage not found.',
        error: { passage: 'Passage not found'}
      });
    });
});


router.delete("/:id", (req, res, next) => {
  Passage.findOne({ id: req.params.id })
    .then(passage => {
      Passage.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Passage deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Passage not found.',
        error: { passage: 'Passage not found'}
      });
    });
});

module.exports = router;
