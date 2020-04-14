/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable radix */
// import http from 'http';
// import express from 'express';
// import xml from 'xml';
import covid19ImpactEstimator from './estimator';

// const app = express();
// const server = http.createServer(app);
const input = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 4,
    avgDailyIncomePopulation: 0.73
  },
  periodType: 'days',
  timeToElapse: 38,
  reportedCases: 2747,
  population: 92931687,
  totalHospitalBeds: 678874
};
// app.get('/api/v1/on-covid-19', (req, res) => {
//   const getCov = covid19ImpactEstimator(input);
//   res.json(getCov);
// });
// app.get('/api/v1/on-covid-19/json', (req, res) => {
//   const getCov = covid19ImpactEstimator(input);
//   res.json(getCov);
// });
// app.get('/api/v1/on-covid-19/xml', (req, res) => {
//   const getCov = covid19ImpactEstimator(input);
//   res.type('application/xml');
//   res.status(201).send(xml(getCov,{declaration:true}));
// });


// server.listen(3456, () => {
//   console.log('Server running on port: 3456');
// });

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const xml = require('xml');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// const covid19ImpactEstimator = require('./estimator');

// Body parser used to expose req.body
app.use(bodyParser.json());

// Create log file
// var dir = __dirname + './log';
// if (!path.existsSync(dir)) {
//     fs.mkdirSync(dir, 0744);
// }

fs.mkdirSync(path.join(__dirname, './logs/'));
const logFile = fs.createWriteStream(path.join(__dirname, './logs/log.txt'), { flags: 'a' });

// Morgan for logging requests to the server
app.use(
  morgan(
    // ':method\t\t:url\t\t:status\t\t:response-time\bms',
    (tokens, req, res) => [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      parseInt(tokens['response-time'](req, res).toString()) < 10
        ? `0${parseInt(tokens['response-time'](req, res).toString())}ms`
        : `${parseInt(tokens['response-time'](req, res).toString())}ms`
    ].join('\t\t'),
    {
      stream: logFile
    }
  )
);

app.post('/api/v1/on-covid-19', (req, res) => {
  covid19ImpactEstimator(input);
  res.status(201).json(res.body);
});

app.post('/api/v1/on-covid-19/:type', (req, res) => {
  covid19ImpactEstimator(input);
  if (req.params.type === 'json') {
    res.status(201).json(res.body);
  } else if (req.params.type === 'xml') {
    const { data, impact, severeImpact } = res.body;

    // Format the res.body data for conversion to xml
    const dataToSubmit = [
      {
        results: [
          { _attr: { from: 'COVID-19 estimator' } },
          {
            data: [
              {
                region: [
                  { name: data.region.name },
                  { avgAge: data.region.avgAge },
                  { avgDailyIncomeInUSD: data.region.avgDailyIncomeInUSD },
                  { avgDailyIncomePopulation: data.region.avgDailyIncomePopulation }
                ]
              },
              { periodType: data.periodType },
              { timeToElapse: data.timeToElapse },
              { reportedCases: data.reportedCases },
              { population: data.population },
              { totalHospitalBeds: data.totalHospitalBeds }
            ]
          },
          {
            impact: [
              { currentlyInfected: impact.currentlyInfected },
              { infectionsByRequestedTime: impact.infectionsByRequestedTime },
              { severeCasesByRequestedTime: impact.severeCasesByRequestedTime },
              { hospitalBedsByRequestedTime: impact.hospitalBedsByRequestedTime },
              { casesForICUByRequestedTime: impact.casesForICUByRequestedTime },
              { casesForVentilatorsByRequestedTime: impact.casesForVentilatorsByRequestedTime },
              { dollarsInFlight: impact.dollarsInFlight }
            ]
          },
          {
            severeImpact: [
              { currentlyInfected: severeImpact.currentlyInfected },
              { infectionsByRequestedTime: severeImpact.infectionsByRequestedTime },
              { severeCasesByRequestedTime: severeImpact.severeCasesByRequestedTime },
              { hospitalBedsByRequestedTime: severeImpact.hospitalBedsByRequestedTime },
              { casesForICUByRequestedTime: severeImpact.casesForICUByRequestedTime },
              { casesForVentilatorsByRequestedTime: severeImpact.casesForVentilatorsByRequestedTime },
              { dollarsInFlight: severeImpact.dollarsInFlight }
            ]
          }
        ]
      }
    ];

    // set the content type to xml
    res.type('application/xml');
    // send an xml data
    res.status(201).send(xml(dataToSubmit, { declaration: true }));
  }
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  const logs = fs.readFileSync(path.join(__dirname, './logs/log.txt'), { encoding: 'utf-8' });
  console.log(logs);
  res.type('text/plain');
  res.status(200).send(logs);
});

// Block access to any undefined endpoint
app.get('*', (req, res) => {
  res.status(405).send('This endpoint is off-limits');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
