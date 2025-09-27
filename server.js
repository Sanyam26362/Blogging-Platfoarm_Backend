require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const postsRouter = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler')
const app = express();
if(process.env.NODE_ENV==='devlopment') {
    app.use(morgan('dev'));

}
app.use(cors());
app.use(express.json());
const MONGODB_URI = process.env.MONGODB_URI;
connectDB(MONGODB_URI);
app.use('/api/posts',postsRouter);
app.use((req,res) =>{
    res.status(404).json({message:'Endpoint not found'});

});
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log('Server running on port $(PORT)');
    
});