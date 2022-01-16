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
  })
});
