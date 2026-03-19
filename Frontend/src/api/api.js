const BASE_URL = "http://127.0.0.1:8000";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : null,
  });

  // Handle unauthorized
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  // Handle non-JSON safely
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("API did not return JSON");
  }
}
