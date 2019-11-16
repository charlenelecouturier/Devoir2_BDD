var request = require('request');
var cheerio = require('cheerio');


const fs = require('fs')

function EcrireJson(jsonObj) {



    let donnees = JSON.stringify(jsonObj)
    fs.writeFileSync('dataset.json', donnees)
}

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
            //  console.log(urlsMonsters);
            //  console.log(urlArray);


            if (callback != null) callback(urlArray)

        } else {
            console.log("We’ve encountered an error: " + error);
        }
    });
}

function crawl() {
    var urlCrawl = "http://legacy.aonprd.com";
    var crawlResult = new Array();
    crawlLien((urlArray) => {

        //on crawl toutes les urls des monstres pour avoir leurs sorts
        for (var i = 0; i < urlArray.length; i++) {
            url = urlCrawl + urlArray[i];
            console.log(url)
            request(url, function (error, response, body) {
                if (!error) {
                    var $ = cheerio.load(body); //on recupere le body de la page html de chaque monstre

                    var name = $("title").text();

                    //   console.log(name);
                    var spells = $('body p').map(function (i, el) {
                        // this === el
                        return $(this).html();
                    }).get().join('\n');
                    //console.log(spells)

                    var spellsArray = spells.match(/\/spells\/.*?<\/a>/g) //on récupère les sorts
                    if (spellsArray != null) {
                        spellsArray = removeDuplicates(spellsArray);
                        for (var i = 0; i < spellsArray.length; i++) {

                            //on decoupe la chaine de caratères pour n'avoir que le nom du spell
                            var debut = spellsArray[i].indexOf(">") + 1;
                            spellsArray[i] = spellsArray[i].slice(debut, -4);
                            if (spellsArray[i].indexOf("<em>") != -1) {
                                spellsArray[i] = spellsArray[i].slice(4, -5);

                            }

                            if (spellsArray[i].indexOf("<i>") != -1) {
                                spellsArray[i] = spellsArray[i].slice(3, -4);
                            }

                        }
                        //  console.log(spellsArray);
                    } var JSONobj = {
                        name: name,
                        spells: spellsArray
                    };
                    // console.log(JSONobj);
                    crawlResult.push(JSONobj);
                } else {

                    console.log("We’ve encountered an error: " + error);
                }
            });
        }
    });

    return crawlResult;
}



var result = crawl();

setTimeout(function () {
    EcrireJson(result);

}, 300000); //on laisse un delai de avant d'ecrire dans un fichier json pour que le crawler ait fini son execution


function removeDuplicates(tab) {
    let unique = {};
    tab.forEach(function (i) {
        if (!unique[i]) {
            unique[i] = true;
        }
    });
    return Object.keys(unique);
}

