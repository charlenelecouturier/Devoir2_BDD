var request = require('request');
var cheerio = require('cheerio');

//scrolling de toutes les pages de sort
function crawlLien(callback = null) {
    console.log('CRAWLING...');
    //url du site a scroller
    var url = "http://legacy.aonprd.com/indices/bestiary.html"

    var urlArray = new Array();

    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body); //on recupere le body de la page html


            var urlsMonsters = $('div.index li').map(function (i, el) {
                // this === el
                return $(this).html();
            }).get().join('\n');
            urlArray = urlsMonsters.match(/\/{1}.*html/g);
            console.log(urlsMonsters);
            console.log(urlArray);

            /*   var JSONobj = {
  
              };
              console.log(JSONobj);
              crawlResult.push(JSONobj); */
            if (callback != null) callback(urlArray)

        } else {
            console.log("We’ve encountered an error: " + error);
        }
    });
}

function crawl() {
    var urlCrawl = "http://legacy.aonprd.com/indices";
    var crawlResult = new Array();
    crawlLien((urlArray) => {
        for (var i = 0; i < urlArray.length; i++) {
            url= urlCrawl+urlArray[i];
            console.log(url)
            request(url, function (error, response, body) {
                if (!error) {
                    var $ = cheerio.load(body); //on recupere le body de la page html de chaque monstre
                    
                }
            });
        }
    });
}


crawl()