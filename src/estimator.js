/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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

const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, totalHospitalBeds } = data;
  let { timeToElapse } = data;
  const { avgDailyIncomeInUSD } = data.region;

  const currentlyInfected = reportedCases * 10;
  const sCurrentlyInfected = reportedCases * 50;

  if (periodType === 'week') {
    timeToElapse *= 7;
  } else if (periodType === 'month') {
    timeToElapse *= 30;
  }
  const infectionsByRequestedTime = currentlyInfected * (2 ** (Math.floor(timeToElapse / 3)));
  const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;
  const hospitalBedsByRequestedTime = totalHospitalBeds * 0.35;
  const casesForICUByRequestedTime = infectionsByRequestedTime * 0.05;
  const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * 0.02;
  const dollarsInFlight = (infectionsByRequestedTime * 0.65 * Math.floor(avgDailyIncomeInUSD)) / 30;

  const sInfectionsByRequestedTime = sCurrentlyInfected * (2 ** (Math.floor(timeToElapse / 3)));
  const sSevereCasesByRequestedTime = sInfectionsByRequestedTime * 0.15;
  const sHospitalBedsByRequestedTime = totalHospitalBeds * 0.35;
  const sCasesForICUByRequestedTime = sInfectionsByRequestedTime * 0.05;
  const sCasesForVentilatorsByRequestedTime = sInfectionsByRequestedTime * 0.02;
  const sDollarsInFlight = (sInfectionsByRequestedTime * 0.65 * Math.floor(avgDailyIncomeInUSD)) / 30;

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
      currentlyInfected: sCurrentlyInfected,
      infectionsByRequestedTime: sInfectionsByRequestedTime,
      severeCasesByRequestedTime: sSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: sHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: sCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: sCasesForVentilatorsByRequestedTime,
      dollarsInFlight: sDollarsInFlight

    }
  };
};

// console.log(covid19ImpactEstimator(input));

export default covid19ImpactEstimator;
