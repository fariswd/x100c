const express = require("express");
const app = express();
const parser = require("xml2json");
const moment = require("moment");
const axios = require("axios");

const IP_FINGERPRINT = "http://<FILL_YOURS>"; //FILL YOURS
const COM_KEY = "<FILL_YOURS>"; // FILL YOURS
const PIN = "All"; // All or specific

app.get("/", (req, res) => {
  const options = {
    method: "POST",
    headers: { "content-type": "text/xml" },
    body: `
      <GetAttLog>
        <ArgComKey xsi:type="xsd:integer">${COM_KEY}</ArgComKey>
        <Arg>
          <PIN xsi:type="xsd:integer">${PIN}</PIN>
        </Arg>
      </GetAttLog>
    `,
    url: `${IP_FINGERPRINT}/iWsService`
  };
  axios(options)
    .then(resp => {
      //xml
      res.set("Content-Type", "text/xml");
      res.send(resp.data);

      //json
      // const json = parser.toJson(resp.data);
      // const parsed = JSON.parse(json);
      // res.json(parseByDateHelper(parsed))
    })
    .catch(err => {
      res.send(err);
    });
});

app.get("/dummy", (req, res) => {
  const options = {
    method: "GET",
    headers: { "content-type": "text/xml" },
    url: "http://localhost:3030" //dummy server
  };
  axios(options)
    .then(resp => {
      //xml
      // res.set('Content-Type', 'text/xml');
      // res.send(resp.data)

      // json
      const json = parser.toJson(resp.data);
      const parsed = JSON.parse(json);
      res.json(parseByDateHelper(parsed));
    })
    .catch(err => {
      res.send(err);
    });
});

const parseByDateHelper = parsed => {
  const sortByDate = {};
  const sortByDateAndPin = {};
  const row = parsed.GetAttLogResponse.Row;

  if (row.length > 0) {
    //sort by date
    for (let i = 0; i < row.length; i++) {
      const dates = moment(row[i].DateTime).format("YYYY-MM-DD");
      if (!sortByDate[dates]) {
        sortByDate[dates] = [row[i]];
      } else {
        sortByDate[dates] = [...sortByDate[dates], row[i]];
      }
    }
    //sort byDate and pin
    const byDate = Object.keys(sortByDate);
    for (let i = 0; i < byDate.length; i++) {
      const dated = byDate[i];
      sortByDateAndPin[dated] = {};
      for (let j = 0; j < sortByDate[dated].length; j++) {
        const PIN = sortByDate[dated][j].PIN;
        if (!sortByDateAndPin[dated][PIN]) {
          sortByDateAndPin[dated][PIN] = [sortByDate[dated][j]];
          // sortByDateAndPin[dated][PIN][1] = { ...sortByDate[dated][j], DateTime: `${dated} 17:00:00`};
        } else {
          sortByDateAndPin[dated][PIN][1] = sortByDate[dated][j];
        }
      }
    }
    return sortByDateAndPin;
  } else {
    return {};
  }
};

app.listen(3001);
