const express = require("express");

const { buses, stops } = require("./data");
const { optimizeRoute } = require("./optimizer");
const { calculateETA } = require("./eta");

const router = express.Router();


// GET ALL BUSES
router.get("/buses", (req, res) => {
  res.json(buses);
});


// GET ALL STOPS
router.get("/stops", (req, res) => {
  res.json(stops);
});


// GET ONE BUS
router.get("/buses/:id", (req, res) => {

  const busId = Number(req.params.id);

  const bus = buses.find((bus) => bus.id === busId);

  if (!bus) {
    return res.status(404).json({
      message: "Bus not found"
    });
  }

  res.json(bus);
});


// OPTIMIZE ROUTE
router.post("/optimize", (req, res) => {

  const result = optimizeRoute(stops);

  res.json(result);
});


// CALCULATE ETA
router.get("/buses/:id/eta/:stopId", (req, res) => {

  const busId = Number(req.params.id);
  const stopId = Number(req.params.stopId);

  const bus = buses.find((bus) => bus.id === busId);
  const stop = stops.find((stop) => stop.id === stopId);

  if (!bus || !stop) {
    return res.status(404).json({
      message: "Bus or stop not found"
    });
  }

  const eta = calculateETA(bus, stop);

  res.json({
    bus: bus.busNumber,
    stop: stop.name,
    etaMinutes: eta
  });
});


module.exports = router;
