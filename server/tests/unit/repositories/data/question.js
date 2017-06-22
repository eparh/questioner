'use strict';

const mongoose = require('mongoose');

const questionsToCreate = [
  {
    rating: 0,
    author: new mongoose.Types.ObjectId(),
    title: 'What is love 1',
    description: 'Babe don\'t hurt me',
    tags: ['song', 'joy'],
    dateOfCreation: new Date(),
    dateOfUpdate: new Date(),
    attachments: [
      {
        path: '/uploads/32342.jpg',
        originalName: 'singer.jpg'
      }
    ],
    answers: []
  },
  {
    rating: 0,
    author: new mongoose.Types.ObjectId(),
    title: 'What is love 2',
    description: 'No more',
    tags: ['song', 'joy'],
    dateOfCreation: new Date(),
    dateOfUpdate: new Date(),
    attachments: [
      {
        path: '/uploads/32342.jpg',
        originalName: 'singer.jpg'
      }
    ],
    answers: [
      {
        rating: 0,
        author: new mongoose.Types.ObjectId(),
        text: 'Yeah',
        dateOfCreation: new Date(),
        dateOfUpdate: new Date()
      }
    ]
  },
  {
    rating: 0,
    author: new mongoose.Types.ObjectId(),
    title: 'What is love 3',
    description: 'No more',
    tags: ['song', 'joy'],
    dateOfCreation: new Date(),
    dateOfUpdate: new Date(),
    attachments: [
      {
        path: '/uploads/32342.jpg',
        originalName: 'singer.jpg'
      }
    ]
  }
];
const questionToCreate = {
  rating: 0,
  author: new mongoose.Types.ObjectId(),
  title: 'What is love',
  description: 'No more',
  tags: ['song', 'joy'],
  dateOfCreation: new Date(),
  dateOfUpdate: new Date(),
  attachments: [
    {
      path: '/uploads/32342.jpg',
      originalName: 'singer.jpg'
    }
  ],
  answers: [
    {
      rating: 0,
      author: new mongoose.Types.ObjectId(),
      text: 'Yeah',
      dateOfCreation: new Date(),
      dateOfUpdate: new Date()
    }
  ]
};
const questionToUpdate = {
  title: 'Is it true?',
  description: 'It is true'
};


const answer = {
  rating: 0,
  author: new mongoose.Types.ObjectId(),
  text: 'To be or not to be',
  dateOfCreation: new Date(),
  dateOfUpdate: new Date()
};
const expectedAnswerText = 'To be or not to be';

module.exports = {
  questionsToCreate,
  questionToCreate,
  questionToUpdate,
  answer,
  expectedAnswerText
};