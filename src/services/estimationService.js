export const calculateFP = (data) => {
  const { inputs = 0, outputs = 0, inquiries = 0, files = 0 } = data;

  const fp = inputs * 4 + outputs * 5 + inquiries * 4 + files * 10;

  return fp;
};

export const calculateUUCP = (data) => {
  const { actors = [], useCases = 0 } = data;

  const actorWeight = actors.length * 3;

  const useCaseWeight = useCases * 5;

  return actorWeight + useCaseWeight;
};

export const calculateTCF = (technicalFactors = {}) => {
  let total = 0;

  Object.values(technicalFactors).forEach((value) => {
    total += value;
  });

  return 0.6 + total * 0.01;
};

export const calculateECF = (environmentalFactors = {}) => {
  let total = 0;

  Object.values(environmentalFactors).forEach((value) => {
    total += value;
  });

  return 1.4 + total * -0.03;
};

export const calculateUCP = (data) => {
  const uucp = calculateUUCP(data);

  const tcf = calculateTCF(data.technicalFactors);

  const ecf = calculateECF(data.environmentalFactors);

  const ucp = uucp * tcf * ecf;

  return {
    uucp,
    tcf,
    ecf,
    ucp: Math.round(ucp),
  };
};

export const calculateProjectEstimation = (data) => {
  const fp = calculateFP(data);

  const ucpData = calculateUCP(data);

  const effortHours = ucpData.ucp * 20;
  const hourlyRate = data.hourlyRate || 15;

  const cost = effortHours * hourlyRate;
  return {
    fp,

    uucp: ucpData.uucp,
    tcf: ucpData.tcf,
    ecf: ucpData.ecf,
    ucp: ucpData.ucp,

    effortHours,
    cost,
  };
};
