const cheerio = require("cheerio");

function scrapeContacts(html) {
  const $ = cheerio.load(html);
  //Kontakt == $(".petrolText.underlinetext.font9.bold").parent().next().first().text()
  //Selskab $(".petrolText.underlinetext.font9.bold").first().text()
  //Navn $(".petrolText.underlinetext.font9.bold").parent().next().next().first().text()
  //Role $(".petrolText.underlinetext.font9.bold").first().parent().prev().prev().prev().prev().prev().text()
  //Role $(".petrolText.underlinetext.font9.bold").first().parent().siblings("span.font9.object-card-label").first().text()

  let company = "";
  $(".petrolText.underlinetext.font9.bold")
    .parent()
    .next()
    .each((index, element) => {
      const kontaktOrProjectLead = $(element).text();
      if (kontaktOrProjectLead === "Kontakt:") {
        company = $(".petrolText.underlinetext.font9.bold")
          .first()
          .text()
          .trim();
      }
    });

  const rawEmails = $("a.petrolText.font8")
    .map((index, element) => $(element).text())
    .get();
  const projectName = $(
    "#project_content1 > div > div:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(2) > td.normal"
  )
    .text()
    .trim();
  const uniqueEmails = [...new Set(rawEmails)];
  const contacts = uniqueEmails.map(email => ({ email, projectName, company }));
  return contacts;
}

module.exports = { scrapeContacts };
