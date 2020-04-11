const covid19ImpactEstimator = (data) => ({
  data: {
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
  },
  impact: {
    currentlyInfected: reportedCases * 10,
    infectionsByRequestedTime: currentlyInfected * (2 ** (Math.floor(timeToElapse / 3))),
    severeCasesByRequestedTime: 0.15 * infectionsByRequestedTime,
    hospitalBedsByRequestedTime: totalHospitalBeds * 0.35,
    casesForICUByRequestedTime: infectionsByRequestedTime * 0.5,
    casesForVentilatorsByRequestedTime: infectionsByRequestedTime * 0.2,
    dollarsInFlight: (infectionsByRequestedTime * 0.65 * Math.floor(avgDailyIncomeInUSD)) / 30

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
});

export default covid19ImpactEstimator;
