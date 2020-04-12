/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const input = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, totalHospitalBeds } = data;
  let { timeToElapse } = data;
  const { avgDailyIncomeInUSD } = data.region;

  const currentlyInfected = reportedCases * 10;

  if (periodType === 'week') {
    timeToElapse *= 7;
  } else if (periodType === 'month') {
    timeToElapse *= 30;
  }
  const infectionsByRequestedTime = currentlyInfected * (2 ** (Math.floor(data.timeToElapse / 3)));
  const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;
  const hospitalBedsByRequestedTime = totalHospitalBeds * 0.35;
  const casesForICUByRequestedTime = infectionsByRequestedTime * 0.5;
  const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * 0.2;
  const dollarsInFlight = (infectionsByRequestedTime * 0.65 * Math.floor(avgDailyIncomeInUSD)) / 30;

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    },
    severeImpact: {
      currentlyInfected: reportedCases * 50,
      infectionsByRequestedTime: currentlyInfected * (2 ** (Math.floor(timeToElapse / 3))),
      severeCasesByRequestedTime: 0.15 * infectionsByRequestedTime,
      hospitalBedsByRequestedTime: totalHospitalBeds * 0.35,
      casesForICUByRequestedTime: infectionsByRequestedTime * 0.5,
      casesForVentilatorsByRequestedTime: infectionsByRequestedTime * 0.2,
      dollarsInFlight: (infectionsByRequestedTime * 0.65 * Math.floor(avgDailyIncomeInUSD)) / 30

    }
  };
};

// covid19ImpactEstimator(input);

export default covid19ImpactEstimator;
