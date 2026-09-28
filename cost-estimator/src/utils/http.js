// Base URL for the backend API server
const BASE_URL = "http://localhost:5000";

/**
 * Simple GET function to fetch data from the server
 * @param {string} endpoint - The path to fetch, e.g. "/projects" or "/users"
 * @param {object|AbortSignal} signal - Optional abort signal to cancel request
 */
export async function get(endpoint, signal) {
  // Extract signal whether passed directly or inside an options object { signal }
  const abortSignal = signal?.signal || signal;

  // Make the network request
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    signal: abortSignal,
  });

  // If the server returned an error status, throw an error
  if (!response.ok) {
    throw new Error("Failed to fetch data from server");
  }

  return await response.json();
}

const http = {
  BASE_URL,
  get,
};

export default http;

