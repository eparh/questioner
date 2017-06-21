'use strict';

const mongoose = require('mongoose');

const questionsToCreate = [
  {
    rating: 0,
    author: new mongoose.Types.ObjectId(),
    title: 'What is love',
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
    title: 'What is love',
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
    answers: [
      {
        rating: 0,
        author: new mongoose.Types.ObjectId(),
        text: 'Yeah',
        dateOfCreation: new Date(),
        dateOfUpdate: new Date()
      }
    ]
  }
];
const questionToCreate = questionsToCreate[0];
const questionToUpdate = {
  title: 'Is it true?',
  description: 'It is true'
};

module.exports = {
  questionsToCreate,
  questionToCreate,
  questionToUpdate
};