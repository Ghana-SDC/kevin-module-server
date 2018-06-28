const faker = require('faker');
const sentencer = require('sentencer');
const fs = require('fs');

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const stream = fs.createWriteStream('../products.csv');

const writeToFile = (writer) => {
  var start = new Date().getTime();
  let i = 10000000;
  let id = 1;
  const write = () => {
    let ok = true;
    do {
      i--;
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
      let data = [id, toTitleCase(words.join(' '))].join(',');
      if (i === 0) {
        writer.write(data);
        var end = new Date().getTime();
        console.log((end - start)/1000);
      } else {
        ok = writer.write(data + '\n');
      }
      id++;
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeToFile(stream);

//COPY reviews(customer_name, rating, title, date, review, helpful_count, verified, "productId")  FROM '/Users/Kevin/Documents/Capstone/SDC/reviews.csv' with (FORMAT csv);