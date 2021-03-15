const axios = require("axios");

async function copy() {
  try {
    const response = await axios.request({
      method: "GET",
      url:
        "https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi",
      params: { country: "ALL", keyword: "", genre: "ALL" },
      headers: {
        "x-rapidapi-key": "68a1df0dfbmsh46737b2f148d4c0p1f27b5jsn171513e51771",
        "x-rapidapi-host":
          "30-000-radio-stations-and-music-charts.p.rapidapi.com",
      },
    });
    console.log("response.data.results.length", response.data.results.length);

    let dictionary = [];
    let numTests = 10000;
    for (let i = 0; i < numTests; i++) {
      let url = response.data.results[i].u;
      let cb = (statusCode) => {
        dictionary.push({
          url: url,
          statusCode: statusCode,
          name: response.data.results[i].n,
          genre: response.data.results[i].g,
        });
        //console.log("dictionary", dictionary);
        if (dictionary.length === numTests) {
          console.log("I'm done!");
        }
      };
      testUrl(url, cb);
    }
    //console.log("dictionary", dictionary);
    //shove dictionary into the database
  } catch (error) {
    console.log(error);
  }
}

function testUrl(url, cb) {
  axios
    .request({
      method: "GET",
      url: url,
    })
    .then((response) => {
      if (response.status) {
        cb(response.status);
      } else {
        cb(0);
      }
    })
    .catch(() => cb(0));
}

copy();

//define dictionary outside of the function
//export dictionary to a seed file that i will run to populate the database
