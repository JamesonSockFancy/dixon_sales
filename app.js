const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');


const errorController = require('./controllers/error');

const MONGODB_URI =
  'mongodb+srv://dbUser:Tanner59!@cluster0-kosy2.mongodb.net/test?retryWrites=true';

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'csv');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));
app.use(
  multer({ storage: fileStorage }).single('csv')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/csv', express.static(path.join(__dirname, 'csv')));


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(process.env.PORT || 4000, function(){
      console.log('Your node js server is running');
    });
  })


