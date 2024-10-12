const API_URL = "https://fairefac-api.onrender.com";

export async function getUserByEmail(email, token) {
  const response = await fetch(`${API_URL}/user/${email}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();

  return json.data.user;
}
