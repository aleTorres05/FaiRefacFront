import { toast } from "sonner";
const API_URL = "https://fairefac-api.onrender.com";


export async function login(email, password, router) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();

      if (errorResponse.error === "Verify your email to login.") {
        toast.error("Es necesario verificar su correo electrónico.");
        router.push(`/email-verification?email=${email}`);
        return;
      }

      throw new Error(errorResponse.error || 'Error desconocido al hacer login.');
    }
  
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error.message)
    throw new Error(error.message);
  }
}
