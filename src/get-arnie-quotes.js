const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  //validation of urls ignored as per tips
  return Promise.all(urls.map(url => getArnieQuote(url)));
};

const getArnieQuote = async (url) => {
  const response = await httpGet(url);
  let keyToUse;

  if (response.status === 200) {
    keyToUse = "Arnie Quote";
  } else {
    keyToUse = "FAILURE";
  }

  const responseBody = JSON.parse(response.body);
  return { [keyToUse]: responseBody.message };
}

module.exports = {
  getArnieQuotes,
};
