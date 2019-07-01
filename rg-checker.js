const fetch = require('node-fetch');
const beep = require('beepbeep');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function check(court) {
  fetch("https://tickets.rolandgarros.com/api/tunnel/products/day/20190530/court/"+court+"?_=1559211297974", 
    { "credentials": "include", 
      "headers": { "accept": "application/json, text/javascript", 
                  "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7", 
                  "x-requested-with": "XMLHttpRequest",
                  "Referer": "https://tickets.rolandgarros.com/billets",
                "Cookie": "TCPID=119511142504877528975; atuserid=%7B%22name%22%3A%22atuserid%22%2C%22val%22%3A%22eda4cab2-f73e-4c04-95a7-db794538329d%22%2C%22options%22%3A%7B%22end%22%3A%222020-06-20T09%3A42%3A51.862Z%22%2C%22path%22%3A%22%2F%22%7D%7D; _gcl_au=1.1.718039757.1558345372; TC_OPTOUT=0@@@@@@ALL; PLAY_SESSION=5dd6ca2a437d98c4b0ddc6597a01c88bb401ff9c-SESSION_ID=db732c7d-0f61-4ffd-a8e5-585ca72e0ccb&LANG_CODE=fr&POPULATION_ID=1&LOGIN=mathieubourgeois&USER_FIRST_NAME=mathieu&ID_CRM=5232632223&QUOTA_ID=139; atidvisitor=%7B%22name%22%3A%22atidvisitor%22%2C%22val%22%3A%7B%22vrn%22%3A%22-554543-%22%2C%22at%22%3A%225232632223%22%2C%22ac%22%3A%222%22%7D%2C%22options%22%3A%7B%22path%22%3A%22%2F%22%2C%22session%22%3A15724800%2C%22end%22%3A15724800%7D%7D; tc_cj_v2=m_iZZZ%22**%22%27%20ZZZKOORMNOMQJKPJZZZ%5D777%5Ecl_%5Dny%5B%5D%5D_mmZZZZZZKOOSKPOONNOLLZZZ%5D777_rn_lh%5BfyfcheZZZ%7DH%7E%7B/%7B%7E*H%28%20ZZZKOOSLKKNQKNNOZZZ%5D; ABTasty=uid%3D19052011425196512%26fst%3D1558345371995%26pst%3D1559170296565%26cst%3D1559211240037%26ns%3D10%26pvt%3D77%26pvis%3D11%26th%3D428774.546454.4.0.9.0.1558956309757.1559136647259.1_435650.554260.22.0.9.0.1558958946294.1559128908956.1; ABTastySession=sen%3D32__referrer%3Dhttps%3A//tickets.rolandgarros.com/accueil__landingPage%3Dhttps%3A//tickets.rolandgarros.com/billets%23sessions__referrerSent%3Dtrue; datadome=25XjTv5nRoRpJBG1I6oT7GEjj9wR9eL2gRDXWs55RE" }, 
      "body": null, 
      "method": "GET", 
      "mode": "cors" })
    .then(res => res.json())
    .then(json => {
      
      if (!Array.isArray(json)) {
        console.error(json);
      } else {
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
      }

    });
}

async function main() {
  while (true) {
    console.log("wait...");
    await sleep(5000);
    console.log((new Date()) + " check");
    check("PC");
    check("SL");
    check("SM");
    check("ANN");
  }
}

main();