'use strict';

const mongoose = require('mongoose');
const userId = new mongoose.Types.ObjectId();
const tags = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId()
];
const expectedQuestions = [
  {
    rating: 0,
    author: new mongoose.Types.ObjectId(),
    title: 'What is love 1',
    description: 'Babe don\'t hurt me',
    tags,
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
    tags: [tags[0]],
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
const questionId = new mongoose.Types.ObjectId();
const expectedQuestion = {
  _id: questionId,
  rating: 0,
  author: userId,
  title: 'What is love 1',
  description: 'Babe don\'t hurt me',
  tags,
  attachments: [
    '/uploads/32342.jpg'
  ],
  answers: []
};
const expectedQuestionsByTags = [
  {
    rating: 0,
    author: new mongoose.Types.ObjectId(),
    title: 'What is love 1',
    description: 'Babe don\'t hurt me',
    tags,
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
    tags: [tags[0]],
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
  }
];
const user = {
  email: 'user@yandex.ru',
  password: '$2a$10$8.q7PunuWlE4.sPeWXXahu7INUQipmMyf1F1JS6e/inggqy.zoitO',
  role: 'user',
  _id: userId
};

const stranger = {
  email: 'stranger@yandex.ru',
  password: '$2a$10$8.q7PunuWlE4.sPeWXXahu7INUQipmMyf1F1JS6e/inggqy.zoitO',
  role: 'user',
  _id: new mongoose.Types.ObjectId()
};

const attachments = [
  {
    destination: 'uploads',
    encoding: '7bit',
    fieldname: 'attachments',
    filename: '1499110675757.jpeg',
    mimetype: 'image/jpeg',
    originalname: 'icon.jpeg',
    path: 'uploads/1499110675757.jpeg',
    size: 5156
  },
  {
    destination: 'uploads',
    encoding: '7bit',
    fieldname: 'attachments',
    filename: '1499110675758.jpeg',
    mimetype: 'image/jpeg',
    originalname: 'icon.jpg',
    path: 'uploads/1499110675758.jpeg',
    size: 4779485
  }
];


const answer = {
  rating: 0,
  author: userId,
  text: 'To be or not to be'
};

module.exports = {
  expectedQuestions,
  expectedQuestion,
  questionId,
  tags,
  tag: tags[0],
  expectedQuestionsByTags,
  user,
  attachments,
  stranger,
  answer
};