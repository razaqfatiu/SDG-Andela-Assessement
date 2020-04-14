/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable radix */
// import http from 'http';
// import express from 'express';
// import xml from 'xml';
// import covid19ImpactEstimator from './estimator';

// // const app = express();
// // const server = http.createServer(app);
// const input = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 4,
//     avgDailyIncomePopulation: 0.73
//   },
//   periodType: 'days',
//   timeToElapse: 38,
//   reportedCases: 2747,
//   population: 92931687,
//   totalHospitalBeds: 678874
// };
// // app.get('/api/v1/on-covid-19', (req, res) => {
// //   const getCov = covid19ImpactEstimator(input);
// //   res.json(getCov);
// // });
// // app.get('/api/v1/on-covid-19/json', (req, res) => {
// //   const getCov = covid19ImpactEstimator(input);
// //   res.json(getCov);
// // });
// // app.get('/api/v1/on-covid-19/xml', (req, res) => {
// //   const getCov = covid19ImpactEstimator(input);
// //   res.type('application/xml');
// //   res.status(201).send(xml(getCov,{declaration:true}));
// // });


// // server.listen(3456, () => {
// //   console.log('Server running on port: 3456');
// // });

// const express = require('express');

// const app = express();
// const bodyParser = require('body-parser');
// const xml = require('xml');
// const morgan = require('morgan');
// const fs = require('fs');
// const path = require('path');

// // const covid19ImpactEstimator = require('./estimator');

// // Body parser used to expose req.body
// app.use(bodyParser.json());

// // Create log file
// // var dir = __dirname + './log';
// // if (!path.existsSync(dir)) {
// //     fs.mkdirSync(dir, 0744);
// // }

// fs.mkdirSync(path.join(__dirname, './logs/'));
// const logFile = fs.createWriteStream(path.join(__dirname, './logs/log.txt'), { flags: 'a' });

// // Morgan for logging requests to the server
// app.use(
//   morgan(
//     // ':method\t\t:url\t\t:status\t\t:response-time\bms',
//     (tokens, req, res) => [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       parseInt(tokens['response-time'](req, res).toString()) < 10
//         ? `0${parseInt(tokens['response-time'](req, res).toString())}ms`
//         : `${parseInt(tokens['response-time'](req, res).toString())}ms`
//     ].join('\t\t'),
//     {
//       stream: logFile
//     }
//   )
// );

// app.post('/api/v1/on-covid-19', (req, res) => {
//   covid19ImpactEstimator(input);
//   res.status(201).json(res.body);
// });

// app.post('/api/v1/on-covid-19/:type', (req, res) => {
//   covid19ImpactEstimator(input);
//   if (req.params.type === 'json') {
//     res.status(201).json(res.body);
//   } else if (req.params.type === 'xml') {
//     const { data, impact, severeImpact } = res.body;

//     // Format the res.body data for conversion to xml
//     const dataToSubmit = [
//       {
//         results: [
//           { _attr: { from: 'COVID-19 estimator' } },
//           {
//             data: [
//               {
//                 region: [
//                   { name: data.region.name },
//                   { avgAge: data.region.avgAge },
//                   { avgDailyIncomeInUSD: data.region.avgDailyIncomeInUSD },
//                   { avgDailyIncomePopulation: data.region.avgDailyIncomePopulation }
//                 ]
//               },
//               { periodType: data.periodType },
//               { timeToElapse: data.timeToElapse },
//               { reportedCases: data.reportedCases },
//               { population: data.population },
//               { totalHospitalBeds: data.totalHospitalBeds }
//             ]
//           },
//           {
//             impact: [
//               { currentlyInfected: impact.currentlyInfected },
//               { infectionsByRequestedTime: impact.infectionsByRequestedTime },
//               { severeCasesByRequestedTime: impact.severeCasesByRequestedTime },
//               { hospitalBedsByRequestedTime: impact.hospitalBedsByRequestedTime },
//               { casesForICUByRequestedTime: impact.casesForICUByRequestedTime },
//               { casesForVentilatorsByRequestedTime: impact.casesForVentilatorsByRequestedTime },
//               { dollarsInFlight: impact.dollarsInFlight }
//             ]
//           },
//           {
//             severeImpact: [
//               { currentlyInfected: severeImpact.currentlyInfected },
//               { infectionsByRequestedTime: severeImpact.infectionsByRequestedTime },
//               { severeCasesByRequestedTime: severeImpact.severeCasesByRequestedTime },
//               { hospitalBedsByRequestedTime: severeImpact.hospitalBedsByRequestedTime },
//               { casesForICUByRequestedTime: severeImpact.casesForICUByRequestedTime },
//               { casesForVentilatorsByRequestedTime: severeImpact.casesForVentilatorsByRequestedTime },
//               { dollarsInFlight: severeImpact.dollarsInFlight }
//             ]
//           }
//         ]
//       }
//     ];

//     // set the content type to xml
//     res.type('application/xml');
//     // send an xml data
//     res.status(201).send(xml(dataToSubmit, { declaration: true }));
//   }
// });

// app.get('/api/v1/on-covid-19/logs', (req, res) => {
//   const logs = fs.readFileSync(path.join(__dirname, './logs/log.txt'), { encoding: 'utf-8' });
//   console.log(logs);
//   res.type('text/plain');
//   res.status(200).send(logs);
// });

// // Block access to any undefined endpoint
// app.get('*', (req, res) => {
//   res.status(405).send('This endpoint is off-limits');
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const xml2js = require('xml2js');
const fs = require('fs');
const { json, urlencoded } = require('body-parser'); // declaring absolute paths before relative paths
const estimator = require('./estimator');


const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));

const filePath = './src/logs.txt';
const xml = new xml2js.Builder({
  rootName: 'estimate',
  trim: true
});

app.post('/api/v1/on-covid-19', (req, res) => {
  const start = new Date();
  const request = '/api/v1/on-covid-19';
  const log = {
    method: 'POST',
    request
  };
  try {
    const estimate = estimator(req.body);
    res.status(200).json(estimate);
    const end = new Date();
    log.status = 200;
    log.responseTime = `${end - start}ms`;
    fs.readFile(filePath, (err, data) => {
      if (err) return false;
      let logs;
      try {
        logs = JSON.parse(data.toString()); // content it's retrieving must be parseable to JSON
      } catch (error) {
        logs = [];
      }

      logs.push(log);
      return fs.writeFile(filePath, JSON.stringify(logs), (error) => {
        if (error) return false;
        return true;
      });
    });
  } catch (er) {
    log.status = 400;
    log.responseTime = `${new Date() - start}ms`;
    return res.status(400).send({ error: 'invalid data provided' });
  }
  return true;
});

app.post('/api/v1/on-covid-19/:format', (req, res) => {
  const start = new Date();
  const { format } = req.params;
  const request = `/api/v1/on-covid-19/${format}`;
  const log = {
    method: 'POST',
    request
  };
  try {
    const estimate = estimator(req.body);

    const XMLEstimate = xml.buildObject(estimate);
    if (format === 'xml') {
      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send(XMLEstimate);
    } else {
      res.status(200).json(estimate);
    }
    const end = new Date();
    log.status = 200;
    log.responseTime = `${end - start}ms`;

    fs.readFile(filePath, (err, data) => {
      if (err) {
        log.status = 500;
        log.responseTime = `${new Date() - start}ms`;
        return res.status(500).send({ error: 'server error' });
      }
      let logs;
      try {
        logs = JSON.parse(data.toString());
      } catch (error) {
        logs = [];
      }

      logs.push(log);
      return fs.writeFile(filePath, JSON.stringify(logs), (error) => {
        if (error) return false;
        return true;
      });
    });
  } catch (er) {
    log.status = 400;
    log.responseTime = `${new Date() - start}ms`;
    return res.status(400).send({ error: 'invalid data provided' });
  }
  return true;
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  const start = new Date();
  const request = '/api/v1/on-covid-19/logs';
  const newLog = {
    method: 'GET',
    request
  };
  fs.readFile(filePath, (err, data) => {
    if (err) {
      newLog.responseTime = `${new Date() - start}ms`;
      newLog.status = 500;
      return res.status(500).send({ error: 'server error' });
    }

    let logs;
    try {
      logs = JSON.parse(data.toString()); // content it's retrieving must be parseable to JSON
    } catch (error) {
      logs = [];
    }
    res.setHeader('Content-Type', 'application/text');
    const end = new Date();
    newLog.status = 200;
    newLog.responseTime = `${end - start}ms`;

    logs.push(newLog);
    let logsText = '';
    logs.forEach((log) => {
      logsText += `${log.method}\t\t${log.request}\t\t${log.status}\t\t${log.responseTime}\n`;
    });

    return fs.writeFile(filePath, JSON.stringify(logs), (error) => {
      if (error) return false;
      return res.status(200).send(logsText);
    });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
