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
  let i = 10000000;
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
      let data = toTitleCase(words.join(' '));
      if (i === 0) {
        writer.write(data);
      } else {
        ok = writer.write(data + '\n');
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeToFile(stream);

// const today = new Date();
// const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// const dateTime = date+' '+time;

// console.log(dateTime);
// console.log(new Date());
// console.log(faker.name.findName(), faker.random.number( { min: 1, max: 5 } ), faker.random.word(), faker.commerce.product());
// console.log(faker.date.month(), faker.random.number( { min: 1, max: 31 } ),', ', faker.random.number( { min: 2008, max: 2018 } ));


// let rating = faker.random.number( { min: 1, max: 5 } );
// // let review = (rating >= 4 ? : )

// console.log()


// let record = {
//   customer_name: faker.name.findName(),
//   rating: rating,
//   title: faker.commerce.product(),
//   date: `${faker.date.month()} ${faker.random.number( { min: 1, max: 31 } )}, ${faker.random.number( { min: 2008, max: 2018 } )}`,
//   review:  '',
//   helpful_count: faker.random.number( { min: 1, max: 1000 } ),
//   verified: faker.random.boolean(),
//   productId: faker.random.number( { min: 1, max: 10000000 } )
// }

// console.log(record);

//COPY reviews(customer_name, rating, title, date, review, helpful_count, verified, "productId")  FROM '/Users/Kevin/Documents/Capstone/SDC/review-rating-component/reviews.csv' with (FORMAT csv);