const API_URL = "http://localhost:5000/api";

// Get all buses
export async function getBuses() {
  try {
    const response = await fetch(`${API_URL}/buses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch buses: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return Array.isArray(data) ? data : data.buses || [];
  } catch (error) {
    console.error("getBuses error:", error);
    throw error;
  }
}


// Get all bus stops
export async function getStops() {
  try {
    const response = await fetch(`${API_URL}/stops`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch stops: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return Array.isArray(data) ? data : data.stops || [];
  } catch (error) {
    console.error("getStops error:", error);
    throw error;
  }
}


// Get ETA for a bus at a stop
export async function getETA(busId, stopId) {
  try {
    const response = await fetch(
      `${API_URL}/buses/${busId}/eta/${stopId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ETA: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("getETA error:", error);
    throw error;
  }
}


// Optimize bus routes
export async function optimizeRoute() {
  try {
    const response = await fetch(
      `${API_URL}/optimize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to optimize route: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("optimizeRoute error:", error);
    throw error;
  }
}
