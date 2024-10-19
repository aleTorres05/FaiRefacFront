const API_URL = "https://fairefac-api.onrender.com";

export async function send(email) {
  try {
    const response = await fetch(`${API_URL}/user/send-otp`, {
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
  } catch (error) {
    throw new Error(error);
  }
}

export async function verify(email, otp) {
  try {
    const response = await fetch(`${API_URL}/user/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    const json = await response.json();
    return json.data;
  } catch (error) {
    throw new Error(error);
  }
}
