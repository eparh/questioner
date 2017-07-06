'use strict';

const mongoose = require('mongoose');

const questionsToCreate = [
  {
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
        author: new mongoose.Types.ObjectId(),
        text: 'Yeah'
      }
    ]
  },
  {
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
  author: new mongoose.Types.ObjectId(),
  title: 'What is love',
  description: 'No more',
  voters: {},
  tags: [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId()
  ],
  attachments: [
    '/uploads/32342.jpg'
  ],
  answers: [
    {
      author: new mongoose.Types.ObjectId(),
      text: 'Yeah',
      voters: {}
    }
  ]
};
const questionToUpdate = {
  title: 'Is it true?',
  description: 'It is true'
};


const answer = {
  rating: 0,
  text: 'To be or not to be'
};
const expectedAnswerText = 'To be or not to be';

const authorId = new mongoose.Types.ObjectId();

module.exports = {
  questionsToCreate,
  questionToCreate,
  questionToUpdate,
  answer,
  expectedAnswerText,
  authorId
};