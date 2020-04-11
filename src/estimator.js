const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: reportedCases * 10,
    infectionsByRequestedTime: currentlyInfected * (Math.pow(2, (Math.floor(days / 3))))

  },
  severeImpact: {
    currentlyInfected: reportedCases * 50,
    infectionsByRequestedTime: currentlyInfected * (Math.pow(2, (Math.floor(days / 3))))

  }
});

export default covid19ImpactEstimator;
