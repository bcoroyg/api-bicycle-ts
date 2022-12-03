import mongoose from 'mongoose';
import request from 'request';
import models from '../../src/database/models';
const base_url = 'http://localhost:4000/api/v1/bicycles';
import '../../src';

describe('Bicicleta API', () => {
  beforeAll((done) => {
    const mongoDB = 'mongodb://localhost/testdb';
    mongoose.connect(mongoDB);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('We are connected to test database!');
      done();
    });
  });

  afterAll((done) => {
    models.Bicycle.deleteMany({})
      .exec()
      .then(() => done())
      .catch((err) => mongoose.disconnect(err));
  });

  describe('POST BICICLETAS /create', () => {
    it('STATUS 201', (done) => {
      const headers = { 'content-type': 'application/json' };
      const aBici = {
        color: 'Rojo',
        model: 'Urbana',
      };

      request.post(
        {
          headers: headers,
          url: base_url,
          body: JSON.stringify(aBici),
        },
        (error, response, body) => {
          expect(response.statusCode).toBe(201);
          const bici = JSON.parse(body).data;
          expect(bici.color).toBe('Rojo');
          done();
        }
      );
    });
  });

  let id: string = '';

  describe('GET BICICLETAS /', () => {
    it('Status 200', (done) => {
      request.get(base_url, (error, response, body) => {
        const result = JSON.parse(body);
        expect(response.statusCode).toBe(200);
        expect(result.data.length).toBe(1);
        id = result.data[0]._id;
        done();
      });
    });
  });

  describe('GET ONE BICYCLE /', () => {
    it('STATUS 200', (done) => {
      request.get(`${base_url}/${id}`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('PUT BICYCLE /', () => {
    it('STATUS 200', (done) => {
      const headers = { 'content-type': 'application/json' };
      const data = {
        color: 'Azul',
        model: 'X1',
      };
      request.put(
        {
          headers: headers,
          url: `${base_url}/${id}`,
          body: JSON.stringify(data),
        },
        (error, response, body) => {
          expect(response.statusCode).toBe(200);
          const bici = JSON.parse(body).data;
          expect(bici.color).toBe('Azul');
          expect(bici.model).toBe('X1');
          done();
        }
      );
    });
  });

  describe('DELETE BICYCLE /', () => {
    it('STATUS 200', (done) => {
      request.delete(`${base_url}/${id}`, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
