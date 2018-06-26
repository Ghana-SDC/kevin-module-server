const fs = require('fs')
const es = require('event-stream');

var i = 0;
const productObj = {}
var s = fs.createReadStream('mongo_products.csv')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){

        // pause the readstream
        s.pause();

        i += 1;

        // process line here and call s.resume() when rdy
        // function below was for logging memory usage
        productObj[i] = line.split(',')[0];

        // resume the readstream, possibly from a callback
        s.resume();
    })
    .on('error', function(err){
        console.log('Error while reading file.', err);
    })
    .on('end', function(){
        console.log('Read entire file.')
    })
);

module.exports = {
  productObj
}