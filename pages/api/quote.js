const API_URL = "https://fairefac-api.onrender.com";

export async function createQuote(carId, mechanicId, quoteData) {
  try {
    const response = await fetch(
      `${API_URL}/quote/create/car/${carId}/mechanic/${mechanicId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(quoteData),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Error desconocido al crear el cotización"
      );
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {}
}
