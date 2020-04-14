import http from 'http';
import express from 'express';
import xml from 'xml';
import covid19ImpactEstimator from './estimator';

const app = express();
const server = http.createServer(app);
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
app.use('/api/v1/on-covid-19/json', (req, res) => {
  const getCov = covid19ImpactEstimator(input);
  res.json(getCov);
});
app.use('/api/v1/on-covid-19/xml', (req, res) => {
  const getCov = covid19ImpactEstimator(input);
  res.set('Content-Type', 'text/xml');
  res.send(xml(getCov));
});


server.listen(3456, () => {
  console.log('Server running on port: 3456');
});
