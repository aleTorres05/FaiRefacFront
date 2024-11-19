import { toast } from "sonner";

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
        firstName: firstName,
        lastName: lastName,
        workshopName: workshopName,
        phoneNumber: phoneNumber,
        address: {
          street: street,
          extNum: extNum,
          intNum: intNum === "" ? null : intNum,
          neighborhood: neighborhood,
          zipCode: zipCode,
          city: city,
          state: state,
        },
      }),
    });

    if (response.status === 409) {
      toast.error("El numero telefónico ya esta en uso");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
}
