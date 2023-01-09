require("chromedriver");

const { jar } = require("request");
let wd = require("selenium-webdriver");
let browser = new wd.Builder().forBrowser('chrome').build();

let teams = [];

async function matchPage(url){
    // let browser =  new wd.Builder().forBrowser('chrome').build();
    await browser.get(url);
    await browser.wait(wd.until.elementsLocated(wd.By.css("a.cb-nav-tab ")));
    //team name
    let heading = await browser.findElements(wd.By.css(".cb-nav-hdr.cb-font-18.line-ht24>"));
    let headingContent = await heading.getAttribute("innerText");
    headingContent = headingContent.split(",");
    let TwoTeamNames = headingContent.split("vs").trim();
    console.log(TwoTeamNames);
    //scorecard page

    
    let navLinks = await browser.findElements(wd.By.css("a.cb-nav-tab "));
    let scoreCardUrl = await navLinks[1].getAttribute("href");
    // await browser.get(scoreCardUrl);

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
}

main();