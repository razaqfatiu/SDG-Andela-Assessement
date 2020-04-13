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
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;

  const currentlyInfected = reportedCases * 10;
  const sCurrentlyInfected = reportedCases * 50;

  if (periodType === 'weeks') {
    timeToElapse *= 7;
  } else if (periodType === 'months') {
    timeToElapse *= 30;
  }
  const infectionsByRequestedTime = currentlyInfected * (2 ** (Math.trunc(timeToElapse / 3)));
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.trunc((totalHospitalBeds * 0.35) - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
  const dollarsInFlight = (infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / timeToElapse;

  const sInfectionsByRequestedTime = sCurrentlyInfected * (2 ** (Math.trunc(timeToElapse / 3)));
  const sSevereCasesByRequestedTime = Math.trunc(sInfectionsByRequestedTime * 0.15);
  const sHospitalBedsByRequestedTime = Math.trunc((totalHospitalBeds * 0.35) - sSevereCasesByRequestedTime);
  const sCasesForICUByRequestedTime = Math.trunc(sInfectionsByRequestedTime * 0.05);
  const sCasesForVentilatorsByRequestedTime = Math.trunc(sInfectionsByRequestedTime * 0.02);
  const sDollarsInFlight = ((sInfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / timeToElapse);

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
