const API_URL = "localhost:8080";

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

export async function createQuoteLinkToken(clientId, carId) {
  try {
    const response = await fetch(
      `${API_URL}/quote/quote-link-token/${clientId}/${carId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientId, carId),
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
