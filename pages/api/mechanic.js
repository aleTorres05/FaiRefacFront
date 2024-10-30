const API_URL = "https://fairefac-api.onrender.com";

export async function getAllMechanics() {
  try {
    const response = await fetch(`${API_URL}/mechanic`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Error desconocido al obtener los mecanicos"
      );
    }

    const json = await response.json();
    const mechanics = json.data.Mechanics;

    return mechanics;
  } catch (error) {
    throw new Error(error.message);
  }
}
