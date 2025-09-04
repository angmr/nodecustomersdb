const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);

const should = chai.should();

const testCustomer = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'johnd@mail.com',
  phone: '1234567890'
}

describe('/POST customers', () => {
  it('Add new customer', (done) => {
    chai.request(app)
     .post('/api/customers')
     .set('Content-Type', 'application/json')
     .send(JSON.stringify(testCustomer))
     .end((err, res) => {
        res.should.have.status(200); 
        res.body.should.be.a('object');
        res.body.should.have.property('firstname');
        done();
      });
  });
});

describe('/GET customers', () => {
  it('Fetch all customers', (done) => {
    chai.request(app)
      .get('/api/customers') 
      .end((err, res) => {
         res.should.have.status(200);
         res.body.should.be.a('array');
         res.body.length.should.be.eql(10);
         done();
      });
  });
});