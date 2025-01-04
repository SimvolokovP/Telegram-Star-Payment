async function request(endpoint: string, method: string = "GET", data?: any) {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/${endpoint}`, options);
  const jsonData = resp.json();

  if (resp.ok) return jsonData;
}

export default request;
