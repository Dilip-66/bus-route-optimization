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


function optimizeRoute(stops) {

  if (stops.length === 0) {
    return {
      route: [],
      totalDistance: 0
    };
  }

  const remainingStops = [...stops];

  const route = [];

  let currentStop = remainingStops.shift();

  route.push(currentStop);

  let totalDistance = 0;


  while (remainingStops.length > 0) {

    let nearestIndex = 0;

    let shortestDistance =
      distance(currentStop, remainingStops[0]);


    for (let i = 1; i < remainingStops.length; i++) {

      const currentDistance =
        distance(currentStop, remainingStops[i]);

      if (currentDistance < shortestDistance) {

        shortestDistance = currentDistance;

        nearestIndex = i;
      }
    }


    const nextStop =
      remainingStops.splice(nearestIndex, 1)[0];

    totalDistance += shortestDistance;

    route.push(nextStop);

    currentStop = nextStop;
  }


  return {
    route,
    totalDistance
  };
}


module.exports = {
  optimizeRoute
};
