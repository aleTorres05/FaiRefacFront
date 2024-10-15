export async function send(email) {
  const response = await fetch(`${API_URL}/user/send-opt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  const json = await response.json();
  return json.data;
}
