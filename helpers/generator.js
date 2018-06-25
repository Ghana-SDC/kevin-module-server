const faker = require('faker');
const { posNouns, negNouns, posAdj, negAdj } = require('./generateLexicon.js');
const fs = require('fs');

const generatePosReivews = (noun1, adj1, noun2, adj2) => {
  return [
    `I and my kids absolutely love this ${noun1}! Its a ${adj1} ${noun2} - worth the price!`,
    `This ${noun1} is exactly what I needed in my life - would recommend`,
    `I love my ${adj1} ${noun1} and you will too`,
    `I read the reviews that said this was ${adj2} but I completely disagree - it's ${adj1}! 13/10 would purchase again.`,
    `I never knew I need this ${noun1} until I bought it and now I dont know how I lived without it`
  ][faker.random.number({min: 0, max: 4})]
};

const generateNegReivews = (noun1, adj1, noun2, adj2) => {
  return [
    `This ${noun1} is terrible! It makes me ${adj1} - stay away!`,
    `"OMG ${noun1} is pure ${adj1} ${noun2}, save your money"`,
    `I bought ${noun1} despite the ${adj1} reviews and was still ${adj2}`,
    `I read how ${noun1} was ${adj2} and I completely agree - it's ${noun2}!`,
    `"My ${noun1} broke within days of use, waiting for my refund"`
  ][faker.random.number({min: 0, max: 4})]
};

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// const stream = fs.createWriteStream('../reviews.csv');

const writeToFile = (writer) => {
  let i = 1000000;
  const write = () => {
    let ok = true;
    do {
      i--;
      let customer_name = faker.name.findName();
      let rating = faker.random.number( { min: 1, max: 5 } );
      let title = (rating >= 4) ? toTitleCase(posAdj[faker.random.number({min: 0, max: 5000})] + ' ' + posNouns[faker.random.number({min: 0, max: 5000})]) : toTitleCase(negAdj[faker.random.number({min: 0, max: 5000})] + ' ' + negNouns[faker.random.number({min: 0, max: 5000})]);
      let date= `"${faker.date.month()} ${faker.random.number( { min: 1, max: 31 } )}, ${faker.random.number( { min: 2008, max: 2018 } )}"`;
      let review =  (rating >= 4) ? generatePosReivews(posNouns[faker.random.number({min: 0, max: 5000})], posAdj[faker.random.number({min: 0, max: 5000})], posNouns[faker.random.number({min: 0, max: 5000})], negAdj[faker.random.number({min: 0, max: 5000})]) : generateNegReivews(negNouns[faker.random.number({min: 0, max: 5000})], negAdj[faker.random.number({min: 0, max: 5000})], negNouns[faker.random.number({min: 0, max: 5000})], negAdj[faker.random.number({min: 0, max: 5000})]);
      let helpful_count = faker.random.number( { min: 1, max: 1000 } );
      let verified = faker.random.boolean();
      let productId = faker.random.number( { min: 1, max: 10000000 } );
      let data = [customer_name, rating, title, date, review, helpful_count, verified, productId];
      if (i === 0) {
        writer.write(data.join(','));
      } else {
        ok = writer.write(data.join(',') + '\n');
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

for (let i = 1; i <= 10; i++) {
  let stream = fs.createWriteStream(`../reviews${i}.csv`);
  writeToFile(stream);
}


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
//COPY products(name)  FROM '/Users/Kevin/Documents/Capstone/SDC/review-rating-component/products.csv' with (FORMAT csv);