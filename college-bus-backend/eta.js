function distance(point1, point2) {

  const latDifference =
    point1.latitude - point2.latitude;

  const lonDifference =
    point1.longitude - point2.longitude;

  return Math.sqrt(
    latDifference * latDifference +
    lonDifference * lonDifference
  );
}


function calculateETA(bus, stop) {

  const rawDistance =
    distance(bus, stop);

  const distanceKm = rawDistance * 111;

  const speed = bus.speed;

  if (speed <= 0) {
    return null;
  }

  const timeHours =
    distanceKm / speed;

  const timeMinutes =
    timeHours * 60;

  return Math.round(timeMinutes);
}


module.exports = {
  calculateETA
};
