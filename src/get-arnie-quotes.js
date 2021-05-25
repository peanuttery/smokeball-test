const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  //validation of urls ignored as per tips
  return Promise.all(urls.map(url => getArnieQuote(url)));
};

const responseCodeToKeyLookup = {
  200: "Arnie Quote",
  500: "FAILURE"
}

const getArnieQuote = async (url) => {
  let response = await httpGet(url);
  let keyToUse = responseCodeToKeyLookup[response.status];
  if (!keyToUse) {
    throw Error(`Response status [${response.status}] is not supported`);
  }
  let responseBody = JSON.parse(response.body);
  return { [keyToUse]: responseBody.message };
}

module.exports = {
  getArnieQuotes,
};
