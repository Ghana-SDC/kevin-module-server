// const { Review, db } = require("../../db/models");

// const ReviewModel = {
//   get: (params, callback) => {
//     db.query(`
//       SELECT * 
//       FROM reviews
//       WHERE "productId" = ${params.productId}
//       ORDER BY helpful_count DESC;
//     `)
//     .then(data => {
//       console.log('query successful');
//       callback(null, data[0])
//     })
//     .catch(err => {
//       console.log('error with query,', err);
//       callback(err, null)
//     });
//   },


//   post: (body, callback) => {
//     db.query(`
//       INSERT INTO	reviews 
//       (id, customer_name, rating, title, date, review, helpful_count, "productId", verified, "createdAt", "updatedAt") 
//       VALUES 
//       (DEFAULT, '${body.customer_name}', ${body.rating}, '${body.title}', trim(regexp_replace(to_char(NOW(), 'Month'), '\\s+', ' ', 'g')) || ' ' || to_char(NOW(), 'DD') || ', ' || to_char(NOW(), 'YYYY'), '${body.review}', '${body.helpful_count}', '${body.productId}', '${body.verified}', NOW(), NOW());
//     `)
//     .spread((data) => {
//       console.log('insert review successful');
//       callback(null, data[1]);
//     })
//     .catch(err => {
//       console.log('error with inserting review,', err);
//       callback(err, null);
//     });
//   },

//   put: (body, callback) => {
//     console.log(body);
//     db.query(`
//       UPDATE reviews SET customer_name = '${body.customer_name}', "updatedAt"=NOW() WHERE id = ${body.id} and customer_name <> '${body.customer_name}' and '${body.customer_name}' <> 'undefined';
//       UPDATE reviews SET rating = ${body.rating}, "updatedAt"=NOW() WHERE id = ${body.id} and rating <> ${body.rating} and ${body.rating}<> -1;
//       UPDATE reviews SET title = '${body.title}', "updatedAt"=NOW() WHERE id = ${body.id} and title <> '${body.title}' and '${body.title}' <> 'undefined';
//       UPDATE reviews SET date = '${body.date}', "updatedAt"=NOW() WHERE id = ${body.id} and date <> '${body.date}' and '${body.date}' <> 'undefined';
//       UPDATE reviews SET review = '${body.review}', "updatedAt"=NOW() WHERE id = ${body.id} and review <> '${body.review}' and '${body.review}' <> 'undefined';
//       UPDATE reviews SET helpful_count = ${body.helpful_count}, "updatedAt"=NOW() WHERE id = ${body.id} and helpful_count <> ${body.helpful_count} and ${body.helpful_count} <> -1;
//       UPDATE reviews SET "productId" = ${body.productId}, "updatedAt"=NOW() WHERE id = ${body.id} and "productId" <> ${body.productId} and ${body.productId} <> -1;
//     `)
//     .spread(() => {
//       console.log('update reviews successful');
//       if (body.verified) {
//         db.query(`
//           UPDATE reviews SET verified = ${body.verified}, "updatedAt"=NOW() WHERE id = ${body.id} and verified <> ${body.verified};
//         `)
//         .spread(() => {
//           console.log('update reviews successful');
//           callback(null, 'update with verified successful');
//         })
//         .catch(err => {
//           console.log('error with updating verified,', err);
//           callback(err, null);
//         });
//       } else {
//         callback(null, 'update successful');
//       }
//     })
//     .catch(err => {
//       console.log('error with updating review,', err);
//       callback(err, null);
//     });
//   },

//   delete: (id, callback) => {
//     db.query(`
//       DELETE FROM reviews WHERE id=${id}
//     `)
//     .spread((data) => {
//       console.log('delete review successful');
//       callback(null, data[1]);
//     })
//     .catch(err => {
//       console.log('error with deleting review,', err);
//       callback(err, null);
//     });
//   }

  
// }

// module.exports = {
//   ReviewModel: ReviewModel
// }