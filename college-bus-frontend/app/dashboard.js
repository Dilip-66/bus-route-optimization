"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import {
getBuses,
getStops,
optimizeRoute,
} from "./api";

const BusMap = dynamic(() => import("./map"), {
ssr: false,
});

export default function Dashboard() {
const [buses, setBuses] = useState([]);
const [stops, setStops] = useState([]);
const [optimizedRoute, setOptimizedRoute] = useState([]);
const [totalDistance, setTotalDistance] = useState(0);

const [optimizing, setOptimizing] = useState(false);
const [showBuses, setShowBuses] = useState(false);

// Load buses and stops
useEffect(() => {
async function loadData() {
try {
const busData = await getBuses();
const stopData = await getStops();

    setBuses(busData);
    setStops(stopData);
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

loadData();


}, []);

// Total students
const totalStudents = stops.reduce(
(total, stop) => total + (stop.students || 0),
0
);

// Average bus speed
const averageSpeed =
buses.length > 0
? Math.round(
buses.reduce(
(total, bus) => total + (bus.speed || 0),
0
) / buses.length
)
: 0;

// Optimize route
const handleOptimizeRoute = async () => {
setOptimizing(true);

try {
  console.log("CALLING BACKEND...");

  const result = await optimizeRoute();

  console.log("BACKEND RESPONSE:", result);

  setOptimizedRoute(result.route || []);
  console.log("SETTING OPTIMIZED ROUTE:", result.route);

  setTotalDistance(result.totalDistance || 0);
} catch (error) {
  console.error("Route optimization failed:", error);
  alert("Failed to optimize route. Please check the backend.");
} finally {
  setOptimizing(false);
}


};

return (
<div className="dashboard">

  {/* SIDEBAR */}
  <aside className="sidebar">

    <div className="logo">
      <div className="logo-icon">
        🚌
      </div>

      <div>
        <h2>CampusMove</h2>
        <span>Transport System</span>
      </div>
    </div>

    <nav className="sidebar-nav">

      <a className="nav-item active">
        <span>▦</span>
        Dashboard
      </a>

      <a className="nav-item">
        <span>◉</span>
        Live Tracking
      </a>

      <a className="nav-item">
        <span>↗</span>
        Routes
      </a>

      <a className="nav-item">
        <span>🚌</span>
        Buses
      </a>

      <a className="nav-item">
        <span>📍</span>
        Bus Stops
      </a>

    </nav>

    <div className="sidebar-bottom">

      <div className="system-status">

        <span className="status-dot"></span>

        <div>
          <strong>System Online</strong>
          <small>All services operational</small>
        </div>

      </div>

    </div>

  </aside>


  {/* MAIN CONTENT */}
  <main className="main-content">

    {/* TOP BAR */}
    <header className="topbar">

      <div>

        <span className="breadcrumb">
          Campus / Dashboard
        </span>

        <h1>
          Transportation Dashboard
        </h1>

      </div>

      <div className="profile">

        <div className="notification">
          🔔
        </div>

        <div className="avatar">
          V
        </div>

      </div>

    </header>


    {/* WELCOME */}
    <section className="welcome">

      <div>

        <h2>
          Good afternoon 👋
        </h2>

        <p>
          Monitor your college buses, routes and
          estimated arrival times.
        </p>

      </div>

      <div className="date-box">

        <span>
          Today
        </span>

        <strong>
          {new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </strong>

      </div>

    </section>


    {/* STATISTICS */}
    <section className="stats-grid">

      {/* ACTIVE BUSES */}
      <div
        className="stat-card"
        onClick={() => setShowBuses(!showBuses)}
        style={{ cursor: "pointer" }}
      >

        <div className="stat-icon blue">
          🚌
        </div>

        <div>

          <span>
            Active Buses
          </span>

          <strong>
            {buses.length}
          </strong>

          <small className="positive">
            Currently running
          </small>

        </div>

      </div>


      {/* ON ROUTE */}
      <div className="stat-card">

        <div className="stat-icon green">
          ◉
        </div>

        <div>

          <span>
            On Route
          </span>

          <strong>
            {buses.length}
          </strong>

          <small className="positive">
            All operational
          </small>

        </div>

      </div>


      {/* STUDENTS */}
      <div className="stat-card">

        <div className="stat-icon orange">
          👥
        </div>

        <div>

          <span>
            Students
          </span>

          <strong>
            {totalStudents}
          </strong>

          <small>
            Across all stops
          </small>

        </div>

      </div>


      {/* AVERAGE SPEED */}
      <div className="stat-card">

        <div className="stat-icon purple">
          ⚡
        </div>

        <div>

          <span>
            Average Speed
          </span>

          <strong>
            {averageSpeed}
          </strong>

          <small>
            km/h
          </small>

        </div>

      </div>

    </section>


    {/* ACTIVE BUS DETAILS */}
    {showBuses && (

      <section
        className="bus-details-panel"
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#fff",
          borderRadius: "12px",
        }}
      >

        <h3>
          Active Buses
        </h3>

        {buses.length === 0 ? (

          <p style={{ color: "#888" }}>
            No buses available.
          </p>

        ) : (

          buses.map((bus) => (

            <div
              key={bus.id}
              className="bus-details"
              style={{
                padding: "15px",
                marginTop: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >

              <strong>
                {bus.busNumber}
              </strong>

              <p>
                Capacity: {bus.capacity}
              </p>

              <p>
                Speed: {bus.speed} km/h
              </p>

              <p>
                Location: {bus.latitude}, {bus.longitude}
              </p>

            </div>

          ))

        )}

      </section>

    )}


    {/* MAP + BUS LIST */}
    <section className="content-grid">


      {/* MAP */}
      <div className="map-card">

        <div className="card-header">

          <div>

            <h3>
              Live Bus Tracking
            </h3>

            <span>
              Real-time transportation overview
            </span>

          </div>


          {/* OPTIMIZE ROUTE BUTTON */}
          <button
            className="view-button"
            onClick={handleOptimizeRoute}
            disabled={optimizing}
          >

            {optimizing
              ? "Optimizing..."
              : "Optimize Route →"}

          </button>

        </div>


        {/* MAP */}
        <div className="real-map">

          <BusMap
            buses={buses}
            stops={stops}
          />

        </div>
        


        {/* OPTIMIZED ROUTE */}
        {optimizedRoute.length > 0 && (

          <div className="route-result">

            <h3>
              Optimized Route
            </h3>

            <p>
              Total Distance:{" "}
              {Number(totalDistance).toFixed(3)}
            </p>


            <div className="route-list">

              {optimizedRoute.map((stop, index) => (

                <div
                  className="route-stop"
                  key={stop.id || index}
                >

                  <span className="route-number">
                    {index + 1}
                  </span>

                  <div>

                    <strong>
                      {stop.name}
                    </strong>

                    <small>
                      {stop.students || 0} students
                    </small>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>


      {/* ACTIVE BUSES CARD */}
      <div className="bus-card">

        <div className="card-header">

          <div>

            <h3>
              Active Buses
            </h3>

            <span>
              {buses.length} buses currently running
            </span>

          </div>

          <button className="more-button">
            •••
          </button>

        </div>


        <div className="bus-list">

          {buses.length === 0 ? (

            <p style={{ color: "#888" }}>
              No buses available.
            </p>

          ) : (

            buses.map((bus) => (

              <div
                className="bus-item"
                key={bus.id}
              >

                <div className="bus-avatar">
                  🚌
                </div>


                <div className="bus-info">

                  <strong>
                    {bus.busNumber}
                  </strong>

                  <span>
                    Capacity {bus.capacity}
                  </span>

                </div>


                <div className="bus-speed">

                  <span className="live-dot"></span>

                  <strong>
                    {bus.speed || 0} km/h
                  </strong>

                  <small>
                    Live
                  </small>

                </div>

              </div>

            ))

          )}

        </div>


        {/* VIEW ALL BUSES */}
        <button
          className="all-buses-button"
          onClick={() => setShowBuses(!showBuses)}
        >

          {showBuses
            ? "Hide bus details"
            : "View all buses"}

          <span>
            →
          </span>

        </button>

      </div>

    </section>


    {/* BUS STOPS */}
    <section className="stops-section">

      <div className="section-heading">

        <div>

          <h3>
            Bus Stops
          </h3>

          <span>
            Student pickup locations
          </span>

        </div>

        <span className="stop-count">
          {stops.length} stops
        </span>

      </div>


      <div className="stops-grid">

        {stops.length === 0 ? (

          <p style={{ color: "#888" }}>
            No bus stops available.
          </p>

        ) : (

          stops.map((stop) => (

            <div
              className="stop-card"
              key={stop.id}
            >

              <div className="stop-icon">
                📍
              </div>

              <div>

                <strong>
                  {stop.name}
                </strong>

                <span>
                  {stop.students || 0} students
                </span>

              </div>

            </div>

          ))

        )}

      </div>

    </section>

  </main>

</div>


);
}