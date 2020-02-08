const projectDetailScraper = require("../scrapers/projectDetailScraper");
const fs = require("fs");

const html = fs.readFileSync("./projectDetails.html");
const duplis = fs.readFileSync("./projectDetails-dupli.html");

describe("projectDetailScraper", () => {
  test("gets all relevant roles and emails", () => {
    expect(projectDetailScraper.scrapeContacts(html)).toEqual([
      {
        email: "rnel@danicapension.dk",
        name: "Robert Nellemann",
        role: "Bygherre",
        company: "Danica Ejendomsselskab ApS",
        projectName: "Postbyen - 2. etape"
      },
      {
        name: "Jesper Henkel",
        email: "jhe@kpc.dk",
        company: "KPC København A/S",
        projectName: "Postbyen - 2. etape"
      },
      {
        name: "Jan Dickow Danielsen",
        company: "Arkitema A/S",
        email: "jdd@arkitema.dk",
        projectName: "Postbyen - 2. etape"
      }
    ]);
  });
  test("doesnt get duplicates", () => {
    expect(projectDetailScraper.scrapeContacts(duplis).length).toBe(6);
  });
});
