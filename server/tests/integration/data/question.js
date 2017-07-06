'use strict';

const mongoose = require('mongoose');

const questionsToCreate = [
  {
    rating: 0,
    author: new mongoose.Types.ObjectId(),
    title: 'What is love 1',
    description: 'Babe don\'t hurt me',
    tags: [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId()
    ],
    attachments: [
      '/uploads/32342.jpg'
    ],
    answers: []
  },
  {
    rating: 0,
    author: new mongoose.Types.ObjectId(),
    title: 'What is love 2',
    description: 'No more',
    tags: [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId()
    ],
    attachments: [
      '/uploads/32342.jpg'
    ],
    answers: [
      {
        rating: 0,
        author: new mongoose.Types.ObjectId(),
        text: 'Yeah',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  },
  {
    rating: 0,
    author: new mongoose.Types.ObjectId(),
    title: 'What is love 3',
    description: 'No more',
    tags: [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId()
    ],
    attachments: [
      '/uploads/32342.jpg'
    ]
  }
];

const questionToCreate = {
  rating: 0,
  title: 'What is love 4',
  author: new mongoose.Types.ObjectId(),
  description: 'No more',
  tags: [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId()
  ]
};

const questionToUpdate = {
  rating: 0,
  title: 'Ring-ring',
  author: new mongoose.Types.ObjectId(),
  description: 'No more',
  tags: [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId()
  ]
};

const pathToAttaches = './server/tests/integration/data/attachments/';

module.exports = {
  questionsToCreate,
  questionToCreate,
  pathToAttaches,
  questionToUpdate
};