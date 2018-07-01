const faker = require('faker');
const sentencer = require('sentencer');

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}



function generateRandomProductData(userContext, events, done) {
  let wordCount = faker.random.number({min: 1, max: 5}), count = 0, words = [];
  while(count <= wordCount) {
    if (faker.random.number({min: 0, max: 1}) === 1) {
      words.push(sentencer.make("{{ adjective }}"));
      count++;
    } else {
      words.push(sentencer.make("{{ noun }}"));
      count++;
    }
  }
  const id = faker.random.number({min: 0, max: 10000000});
  const name = toTitleCase(words.join(' '));
  userContext.vars.name = name;
  userContext.vars.id = id;
  return done();
}

module.exports = {
  generateRandomProductData
}
