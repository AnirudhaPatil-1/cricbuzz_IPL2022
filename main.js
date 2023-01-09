require("chromedriver");
const fs = require("fs");

const { jar } = require("request");
let wd = require("selenium-webdriver");
let browser = new wd.Builder().forBrowser('chrome').build();

let teams = [];

async function matchPage(url){
    // let browser =  new wd.Builder().forBrowser('chrome').build();
    await browser.get(url);
    // await browser.wait(wd.until.elementsLocated(wd.By.css("a.cb-nav-tab")));
    //team name
    // browser.wait(wd.until.elementsLocated(wd.By.css(".cb-nav-hdr.cb-font-18.line-ht24")))
    // let heading = await browser.findElement(wd.By.css(".cb-nav-hdr.cb-font-18.line-ht24"));
    // let headingContent = await heading.getAttribute("innerText");
    // // console.log(headingContent);
    // headingContent = headingContent.split(",");
    // let TwoTeamNames = headingContent[0].split("vs");
    // console.log(TwoTeamNames);
    //scorecard page

    await browser.wait(wd.until.elementsLocated(wd.By.css(".cb-nav-tab")));
    let navLinks = await browser.findElements(wd.By.css("a.cb-nav-tab "));
    let scoreCardUrl = await navLinks[1].getAttribute("href");
    // await browser.get(scoreCardUrl);
    await browser.get(scoreCardUrl);
    //batting table of both teams table
    await browser.wait(wd.until.elementsLocated(wd.By.css(".cb-col.cb-col-100.cb-ltst-wgt-hdr")));
    let inningsArr = await browser.findElements(wd.By.css(".cb-col.cb-col-100.cb-ltst-wgt-hdr"));
    for(let k in inningsArr){
        if(k == 0 || k == 3){
            let teamNameBlock = await inningsArr[k].findElements(wd.By.css(".cb-col.cb-col-100.cb-scrd-hdr-rw>span"));
            // console.log(teamNameBlock);
            teamNameBlock = await teamNameBlock[0].getAttribute("innerText");
            // console.log(teamNameBlock);
            // for(let l in teams){
            //     if(teams[l].teamName != teamNameBlock){
            //         teams.push({"teamName" : teamNameBlock});
            //     }
            // } 
            teams.push({"teamName" : teamNameBlock});
        }
    }
    // console.log(teams);


}

async function main(){
    await browser.get("https://www.cricbuzz.com/cricket-series/4061/indian-premier-league-2022/matches");
    browser.wait(wd.until.elementsLocated(wd.By.css(".cb-col-60.cb-col.cb-srs-mtchs-tm>a.text-hvr-underline")));
    let matchBoxes = await browser.findElements(wd.By.css(".cb-col-60.cb-col.cb-srs-mtchs-tm>a.text-hvr-underline"));
    let matchesUrl = [];
    for(let i in matchBoxes){
        let url = await matchBoxes[i].getAttribute("href");
        await matchesUrl.push(url);
        // await matchDetails(url);
    }
    for(let i in matchesUrl){
        // await browser.get(matchesUrl[i]);
        await matchPage(matchesUrl[i]);
    }
    

    browser.close();
    fs.writeFileSync("output.json", JSON.stringify(teams));

}

main();