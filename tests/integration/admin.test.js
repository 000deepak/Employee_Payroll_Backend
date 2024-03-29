import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
const fs = require('fs');

import app from '../../src/index';

const rawdata = fs.readFileSync('tests/integration/admin.json');
const data = JSON.parse(rawdata);
let token;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      console.log('Connected To Database');
      /*  for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      } */
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE.TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }
    done();
  });

  describe('post /register', () => {
    //proper details
    it('given proper admin detail When added Should resister user with status code 201', (done) => {
      let input = data.adminData;
      request(app)
        .post('/api/v1/users/register-admin')
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          done();
        });
    });
    //empty details
    it('given proper admin detail When added Should resister user with status code 201', (done) => {
      let input = data.empty;
      request(app)
        .post('/api/v1/users/register-admin')
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(500);
          done();
        });
    });
    //incorrect firstname details
    it('given proper admin detail When added Should resister user with status code 201', (done) => {
      let input = data.incorrectFName;
      request(app)
        .post('/api/v1/users/register-admin')
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(500);
          done();
        });
    });
    //improper lastname
    it('given proper admin detail When added Should resister user with status code 201', (done) => {
      let input = data.incorrectLName;
      request(app)
        .post('/api/v1/users/register-admin')
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(500);
          done();
        });
    });
    //improper email
    it('given proper admin detail When added Should resister user with status code 201', (done) => {
      let input = data.incorrectEmailRegister;
      request(app)
        .post('/api/v1/users/register-admin')
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(500);
          done();
        });
    });
    //improper password
    it.only('given proper admin detail When added Should resister user with status code 201', (done) => {
      let input = data.incorrectPasswordRegister;
      request(app)
        .post('/api/v1/users/register-admin')
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(500);
          done();
        });
    });
  });

  /* login  */
  //correct details login
  describe('post /register', () => {
    it('given proper admin detail When added Should login user with status code 200', (done) => {
      let input = data.loginData;
      request(app)
        .post('/api/v1/users/login-admin')
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    //login with incorrect emial
    it('given incorrect email When added Should  respond with status code 404', (done) => {
      let input = data.incorrectEmail;
      request(app)
        .post('/api/v1/users/login-admin')
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
    //login with incorrect password
    it('given incorrect password When added Should  status code 401', (done) => {
      let input = data.incorrectPassword;
      request(app)
        .post('/api/v1/users/login-admin')
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          done();
        });
    });
    //login with empty details
    it('given empty details When added Should  status code 404', (done) => {
      let input = data.empty;
      request(app)
        .post('/api/v1/users/login-admin')
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });

  /* reset password */
  describe('post /forgot-password', () => {
    beforeEach((done) => {
      let input = data.loginData;
      request(app)
        .post('/api/v1/users/login-admin')
        .send(input)
        .end((err, res) => {
          token = res.body.data.token;
          console.log(token);
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    // reset password with correct details
    it('given proper email When added Should send link to email respond with status code 200', (done) => {
      let input = data.newPassword;
      request(app)
        .post('/api/v1/users/reset-password')
        .set({ token: token })
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    //reset password with incorrect token
    it('given incorrect email When added Should  respond with status code 404', (done) => {
      let input = data.unregisteredEmail;
      request(app)
        .post('/api/v1/users/forgot-password')
        .set({ token: 'ertgdf' })
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
    //reset password with improper password
    it('given proper password When added Should send link to email respond with status code 500', (done) => {
      let input = data.newImproperPassword;
      request(app)
        .post('/api/v1/users/forgot-password')
        .set({ token: token })
        .send(input)
        .end((err, res) => {
          expect(res.status).to.be.equal(500);
          done();
        });
    });
  });

  /* get admin*/
  describe('get /get all admin', () => {
    beforeEach((done) => {
      let input = data.loginData;
      request(app)
        .post('/api/v1/users/login-admin')
        .send(input)
        .end((err, res) => {
          token = res.body.data.token;
          console.log(token);
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    // get all admin with correct token
    it('given proper token When added Should respond with status code 200', (done) => {
      request(app)
        .get('/api/v1/users/get-all-admin')
        .set({ token: token })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    //get admin with incorrect token
    it('given incorrect email When added Should  respond with status code 404', (done) => {
      request(app)
        .get('/api/v1/users/get-all-admin')
        .set({ token: 'ertgdf' })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });
});
