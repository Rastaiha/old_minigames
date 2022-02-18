function average(X) {
  let sum = 0;
  for (let i = 0; i < X.length; i++) {
    sum += parseFloat(X[i]);
  }
  return sum / X.length
}

function covariance(X, Y) {
  let sum = 0;
  let averageX = average(X);
  let averageY = average(Y);
  for (let i = 0; i < X.length; i++) {
    sum += (parseFloat(X[i]) - averageX) * (parseFloat(Y[i]) - averageY)
  }
  return sum / (X.length)
}

function standardDeviation(X) {
  let sum = 0;
  let averageX = average(X);
  for (let i = 0; i < X.length; i++) {
    sum += (parseFloat(X[i]) - averageX) ** 2;
  }
  return Math.sqrt(sum / X.length);
}

export function correlation(X, Y) {
  return covariance(X, Y) / standardDeviation(X) / standardDeviation(Y)
}