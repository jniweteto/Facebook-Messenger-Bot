const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const JokeModel = require('../../../models/JokeModel');

chai.use(chaiAsPromised)

const {expect} = chai;

// describe('JokeModel Test Suite ==> id, message', function(){
//     it('Should not save without message', function(done) {
//         const joke  = new JokeModel()
//         expect(joke.save()).to.eventually.be.rejectedWith(Error);
//         done()
//     })
//     // it('Should save if message is provided', function(done) {
//     //     const joke = new JokeModel({jokeMessage: 'Hello'})
//     //     expect( joke.save()).to.eventually.be.fulfilled;
//     //     done()
//     // })
// })