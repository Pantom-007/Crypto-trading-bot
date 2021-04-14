var fs = require('fs');

// Reading api-key from key.txt
var key =  fs.readFileSync('key.txt', 'utf8');

// Without this api keys don't match on Linux
if (process.platform == 'linux') {
  key = key.replace('\n', '');
}

var endpoint = process.argv[2];
var website = "binance";
var currency = process.argv[3];
var interval = process.argv[4];

let ts = Date.now();

let date_ob = new Date(ts);
let seconds = date_ob.getSeconds();
let minutes = date_ob.getMinutes();
let hours = date_ob.getHours();
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

// Require taapi (using the NPM client: npm i taapi --save)
const taapi = require("taapi");

// Setup client with authentication
const client = taapi.client(key);

// Get technical indicator value for desired trading pair on desired time frame
client.getIndicator(endpoint, website, currency , interval).then(function(result) {
    console.log("Result: ", result);

    let data = {
      date: year + "/" + month + "/" + date +'/' + hours+'/'+ minutes+ '/'+seconds,
      endpoint: endpoint ,
      currency: currency,
      interval: interval,
      result: result
    };

    data = JSON.stringify(data);
    fs.appendFileSync('results.json',data);

    console.log('Uspješno zapisano u datoteku.');
});
