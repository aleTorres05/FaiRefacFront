import { toast } from "sonner";

const API_URL = "https://fairefac.yairggdev.lat";

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

    if (response.ok) {
      const json = await response.json();
      return json.data;
    } else {
      return response;
    }
  } catch (error) {
    toast.error(error);
  }
}
