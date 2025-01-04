const DEFAULT_URL = "http://localhost:3000";

async function request(endpoint: string, method: string = "GET", data?: any) {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  const resp = await fetch(`${DEFAULT_URL}/api/${endpoint}`, options);
  const jsonData = resp.json();

  if (resp.ok) return jsonData;
}

export default request;
