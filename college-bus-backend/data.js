const buses = [
  {
    id: 1,
    busNumber: "BUS-01",
    capacity: 40,
    latitude: 15.3647,
    longitude: 75.1240,
    speed: 30
  },
  {
    id: 2,
    busNumber: "BUS-02",
    capacity: 40,
    latitude: 15.3700,
    longitude: 75.1300,
    speed: 35
  }
];

const stops = [
  {
    id: 1,
    name: "Stop A",
    latitude: 15.3500,
    longitude: 75.1100,
    students: 10
  },
  {
    id: 2,
    name: "Stop B",
    latitude: 15.3550,
    longitude: 75.1150,
    students: 8
  },
  {
    id: 3,
    name: "Stop C",
    latitude: 15.3600,
    longitude: 75.1200,
    students: 12
  },
  {
    id: 4,
    name: "Stop D",
    latitude: 15.3650,
    longitude: 75.1250,
    students: 6
  }
];

module.exports = {
  buses,
  stops
};
