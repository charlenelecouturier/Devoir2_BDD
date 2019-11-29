var request = require('request');
var cheerio = require('cheerio');


const fs = require('fs')

function EcrireJson(jsonObj) {

    let donnees = JSON.stringify(jsonObj)
    fs.writeFileSync('data.json', donnees)
}

function crawlLien(callback = null) {
    console.log('CRAWLING...');
    //url du site a scroller
    var url = "http://legacy.aonprd.com/indices/bestiary.html"


    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body); //on recupere le body de la page html


            var urlsMonsters = $('li', "#monster-index-wrapper").map(function (i, el) {
                // this === el
                return $(this).find('a').attr('href');
            }).get()
            
            if (callback != null) callback(removeDuplicates(urlsMonsters))

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
            url = urlCrawl + urlArray[i].match(/\/{1}.*html/g);
            // console.log(url)
            let name = urlArray[i].split("#")[1];

            // console.log(name);
            request(url, function (error, response, body) {
                if (!error) {
                    var $ = cheerio.load(body); //on recupere le body de la page html de chaque monstre

                    let bodypage = $("body").html()
                    var index1 = bodypage.indexOf(name);

                    //le nom du monstre est bien dans la page
                    if (index1 != -1) {

                        console.log(index1)
                        console.log(name)

                        //Il peut y avoir plusieurs monstres ar pages donc on decoupe la partie de la page qui nous intéresse

                        let spell = bodypage.toString().split(name)[1]
                        spell = spell.split('Statistics', 1)[0]
                        // console.log(spell)



                        var spellsArray = spell.match(/\/spells\/.*?<\/a>/g) //on récupère les sorts
                        if (spellsArray != null) {
                            spellsArray = removeDuplicates(spellsArray);
                            for (var i = 0; i < spellsArray.length; i++) {

                                //on decoupe la chaine de caratères pour n'avoir que le nom du spell
                                var debut = spellsArray[i].indexOf(">") + 1;
                                spellsArray[i] = spellsArray[i].slice(debut, -4);
                                //remplacement des &apos; par ' 
                                if (spellsArray[i].indexOf("&apos;") != -1) {
                                    spellsArray[i] = spellsArray[i].replace("&apos;", "'")
                                }
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
                        //console.log(JSONobj);
                        crawlResult.push(JSONobj);


                    }

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

