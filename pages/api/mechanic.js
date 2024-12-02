const API_URL = "https://fairefac.yairggdev.lat";

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

export async function postMechanic(mechanicData) {
  const {
    firstName,
    lastName,
    workshopName,
    phoneNumber,
    street,
    extNum,
    intNum,
    neighborhood,
    zipCode,
    city,
    state,
  } = mechanicData;

  try {
    const response = await fetch(`${API_URL}/mechanic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        workshopName,
        phoneNumber,
        address: {
          street,
          extNum,
          intNum: intNum === "" ? null : intNum,
          neighborhood,
          zipCode,
          city,
          state,
        },
      }),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Error Desconocido");
    }

    const json = await response.json();

    return json; // Devuelve directamente el mecánico recién creado
  } catch (error) {
    throw new Error(error.message);
  }
}
