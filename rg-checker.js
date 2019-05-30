const fetch = require('node-fetch');
const beep = require('beepbeep');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function check(court) {
  fetch("https://tickets.rolandgarros.com/api/tunnel/products/day/20190530/court/"+court+"?_=1559165926325", 
    { "credentials": "include", 
      "headers": { "accept": "application/json, text/javascript", "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7", "x-requested-with": "XMLHttpRequest" }, 
      "body": null, 
      "method": "GET", 
      "mode": "cors" })
    .then(res => res.json())
    .then(json => {
      
      json.forEach(function(o) {
        const price = o.priceAmount;
        const seats = o.seats;
        
        if (seats > 0 && price < 90) {
          console.log(seats + " PLACES SUR "+court+" A "+price+"€ !");
          beep();
        } else if (seats > 0) {
          console.log(seats + " places sur "+court+" à "+price+"€");
        }
      });
    });
}

async function main() {
  while (true) {
    console.log("wait...");
    await sleep(5000);
    console.log((new Date()) + " check");
    check("PC");
    check("SL");

  }
}

main();