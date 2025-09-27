// seed.js
require('dotenv').config();
const connectDB = require('./config/db');
const Post = require('./models/Post');

const samplePosts = [
  { title: 'Hello World', body: 'This is my first blog post', author: 'Sanyam', tags: ['intro'] },
  { title: 'Node & Mongo', body: 'How to use Node.js with MongoDB', author: 'Sanyam', tags: ['node', 'mongodb'] }
];

const run = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await Post.deleteMany({});
    await Post.insertMany(samplePosts);
    console.log('Seeded sample posts');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
