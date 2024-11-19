const API_URL = "https://fairefac.yairggdev.lat/repairshop-quote";

export async function repairShopQuoteUpdateById(id, token, items) {
  try {
    const response = await fetch(`${API_URL}/${id}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(items),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Error desconocido al actualizar la cotización."
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function changeStatusById(id, token) {
  try {
    const response = await fetch(`${API_URL}/${id}/change-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Error desconocido al actualizar la cotización."
      );
    }
    return await response.json();  
  } catch (error) {
    throw new Error(error.message);
  }
}
