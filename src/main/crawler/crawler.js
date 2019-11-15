var request = require('request');
var cheerio = require('cheerio');

//scrolling de toutes les pages de sort
function crawl() {
    console.log('CRAWLING...');
    //url du site a scroller
    var url = "http://legacy.aonprd.com/indices/bestiary.html";
    var crawlResult = new Array();
var urlArray=new Array();

        request(url, function (error, response, body) {
            if (!error) {
                var $ = cheerio.load(body); //on recupere le body de la page html


                var urlsMonsters = $('div.index li').map(function (i, el) {
                    // this === el
                    return $(this).html();
                }).get().join('\n');

console.log(urlsMonsters);

                    var JSONobj = {

                    };
                    console.log(JSONobj);
                    crawlResult.push(JSONobj);


                }




            else {
                console.log("We’ve encountered an error: " + error);
            }
        });



    return crawlResult; //on retourne le tableau

}

crawl();



