const API_URL = "https://fairefac-api.onrender.com";

export async function getUserByEmail(email, token) {
  const response = await fetch(`${API_URL}/user/find-email/${email}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();

  return json.data.user;
}

export async function getByID(id, token) {
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
    if (response.status != 200) throw new Error("error on getting user");

    const json = await response.json();
    return json.data.user;
  } catch (error) {
    throw new Error(error);
  }
}
