const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;


chai.use(chaiHttp);
const url = 'http://localhost:3000';


describe('get all elements: ', () =>{
	it('should get all alements', (done) =>{
		chai.request(url)
			.get('/items')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.have.lengthOf.above(1);
				done();
			})
	})
});

describe('get one pokemon: ', () => {
	it('should get one pokemon with id 10', (done) => {
		chai.request(url)
			.get('/items/10')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.id).to.be.equal(10);
				done();
			})
	})
});

describe('get one Clash: ', () => {
	it("should get one Clash with id 5b099537ab411c001423ec80", (done) =>{
		chai.request(url)
			.get('/items/5b099537ab411c001423ec80')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.id).to.be.equal('5b099537ab411c001423ec80');
				done();
			})
	})
})

describe('get one Driver: ', () => {
	it('Should get the most important pilot in history with id michael_schumacher', (done) =>{
		chai.request(url)
			.get('/items/michael_schumacher')
			.end((err, res)=>{
				expect(res).to.have.status(200)
				expect(res.body.id).to.be.equal('michael_schumacher')
				done();
			})
	})
});

describe("get a 404: ", () => {
	it('Should get a 404 for pokemon with  id 456678', (done) =>{
		chai.request(url)
			.get('/items/456678')
			.end((err, res) =>{
				expect(res).to.have.status(404)
				done();
			})
	})

	it('Should get a 404 for Clash with id 5b099537ab411c001423ec80invent', (done) =>{
		chai.request(url)
			.get('/items/5b099537ab411c001423ec80invent')
			.end((err, res) =>{
				expect(res).to.have.status(404)
				done();
			})
	})

	it('Should get a 404 for Driver with id roberto', (done) =>{
		chai.request(url)
			.get('/items/roberto')
			.end((err, res) =>{
				expect(res).to.have.status(404)
				done();
			})
	})


})