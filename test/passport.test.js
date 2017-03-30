/**
 * Created by jmichelin on 3/24/17.
 */
// tests setup
const request = require('supertest');
// app setup
const express = require('express');
const flash = require('connect-flash');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(flash());

// db setup
const mongoose = require('mongoose');
const configDB = require('../config/database.js');
mongoose.connect(configDB.url);

// passport setup
const passport = require('passport');
require('../config/passport')(passport);
app.use(session({secret: '$2a$04$vWlbtFNsbHBZIMsQMu6N/eyviK3AC40Ajp3dTeNw5NJpLmGYlYSMC'}));
app.use(passport.initialize());
app.use(passport.session());

// routes setup
require('../app/routes.js')(app, passport);

// tests
describe('GET /', function () {
  it('respond with html', function (done) {
    request(app)
      .get('/')
      .set('Accept', 'application/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('GET /login', function () {
  it('respond with html', function (done) {
    request(app)
      .get('/login')
      .set('Accept', 'application/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('POST /login', function () {
  it('flash fail message', function (done) {
    request(app)
      .post('/login')
      .type('form')
      .send({ email: 'test@test.com', password: 'test'})
      .expect(302)
      .end(function(err, res) {
        if (err) throw err;
        console.log(res.text);
        done();
      });
  });
});