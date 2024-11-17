import { toast } from "sonner";

const API_URL = "https://fairefac.yairggdev.lat";

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
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
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
        body: JSON.stringify({ clientId, carId }),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Error desconocido al crear el cotización"
      );
    }

    const json = await response.json();
    return json.data?.token;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function validateToken(token, router) {
  try {
    const response = await fetch(`${API_URL}/quote/validate-token/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const json = await response.json();

    if (response.status === 401) {
      router.push("/timeOutPage");
      toast.error("Session Expirada, Solicite Nuevo Enlace");
    } else if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Error desconocido al crear el cotización"
      );
    }

    return json?.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getQuoteByID(quoteId, token) {
  try {
    const response = await fetch(`${API_URL}/quote/${quoteId}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const json = await response.json();

    return json.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function rejectQuote(carId, repairShopQuoteId, token) {
  try {
    const response = await fetch(
      `${API_URL}/quote/${carId}/reject/${repairShopQuoteId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al rechazar la Cotizaición.");
    }

    const json = await response.json();

    return json;
  } catch (error) {
    toast.error("Error al rechazar la Cotizaición:", error);
  }
}

export async function deleteItemRepairShopQuote(
  repairShopQuoteId,
  itemId,
  token
) {
  try {
    const response = await fetch(
      `${API_URL}/repairshop-quote/${repairShopQuoteId}/delete-item/${itemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al Eliminar Pieza.");
    }

    if (response.status === 204) {
      return { success: true, message: "Pieza eliminada correctamente." };
    }

    const json = await response.json();

    return json;
  } catch (error) {
    toast.error("Error al Eliminar Pieza:", error);
  }
}
export async function getPaymentIfonBySessionId(sessionId, token) {
  try {
    const response = await fetch(`${API_URL}/quote/payment-info/${sessionId}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error ||
          "Error desconocido al obtener información de pago."
      );
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getStripeSession(carQuoteId, token) {
  try {
    const response = await fetch(
      `${API_URL}/quote/${carQuoteId}/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error ||
          "Error desconocido al obtener información de pago."
      );
    }
    const json = await response.json();

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
}
