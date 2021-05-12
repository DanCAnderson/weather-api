const app = require('../app');
const request = require('supertest');
const assert = require('assert');
const { WEATHER_KEY } = require('../key');

describe('Location queries', () => {
    it('By city', (done) => {
        return request(app)
        .get('/api?q=current&city=minneapolis&appid=' + WEATHER_KEY)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
            if (!res.body.current) throw new Error('No body in the response');
            else done();
        })
        .catch(err => done(err));
    });
    it('By Zipcode', (done) => {
        return request(app)
        .get('/api?q=current&zip=55401&appid=' + WEATHER_KEY)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
            if (!res.body.current) throw new Error('No body in the response');
            else done();
        })
        .catch(err => done(err));
    });
    it('By Int\'l Zipcode', (done) => {
        return request(app)
        .get('/api?q=current&zip=e14,GB&appid=' + WEATHER_KEY)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
            if (!res.body.current) throw new Error('No body in the response');
            else done();
        })
        .catch(err => done(err));
    });
    it('By Lat and Lon', (done) => {
        return request(app)
        .get('/api?q=current&lat=44.97&lon=-93.26&appid=' + WEATHER_KEY)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
            if (!res.body.current) throw new Error('No body in the response');
            else done();
        })
        .catch(err => done(err));
    })
})

describe('Time queries', () => {
    it('Current weather', (done) => {
        return request(app)
        .get('/api?q=current&zip=55401&appid=' + WEATHER_KEY)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
            if (!res.body.current) throw new Error('No body in the response');
            else done();
        })
        .catch(err => done(err));
    })
    it('Hourly weather', (done) => {
        return request(app)
        .get('/api?q=hourly&zip=55401&appid=' + WEATHER_KEY)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
            if (!res.body.hourly) throw new Error('No body in the response');
            else done();
        })
        .catch(err => done(err));
    });
    it('Daily weather', (done) => {
        return request(app)
        .get('/api?q=daily&zip=55401&appid=' + WEATHER_KEY)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
            if (!res.body.daily) throw new Error('No body in the response');
            else done();
        })
        .catch(err => done(err));
    })
})