const API_URL = "https://fairefac.yairggdev.lat";

export async function getUserByEmail(email, token) {
  try {
    const response = await fetch(`${API_URL}/user/find-email/${email}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Error desconocido al obtener el usuario"
      );
    }

    const json = await response.json();
    const user = json.data.user;

    localStorage.setItem("userId", user._id);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getByID(id, token) {
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Error desconocido al obtener el usuario"
      );
    }

    const json = await response.json();
    return json.data.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function create(userData) {
  try {
    const { email, password, isClient, isRepairShop } = userData;
    const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        isClient,
        isRepairShop,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Error desconocido al crear el usuario"
      );
    }

    const json = await response.json();
    const user = json.data.User;

    localStorage.setItem("userId", user._id);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateUserClient(
  userId,
  userData,
  profilePicture,
  token
) {
  try {
    const formData = new FormData();

    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("phoneNumber", userData.phoneNumber);

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    const response = await fetch(`${API_URL}/user/${userId}/client`, {
      method: "PATCH",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error ||
          "Error desconocido al actualizar el perfil del cliente."
      );
    }

    const json = await response.json();
    return json.data.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateUserRepairShop(
  userId,
  repairShopData,
  profilePicture,
  token
) {
  try {
    const formData = new FormData();

    formData.append("companyName", repairShopData.companyName);
    formData.append("phoneNumber", repairShopData.phoneNumber);
    formData.append("address[street]", repairShopData.address.street);
    formData.append("address[extNum]", repairShopData.address.extNum);
    if (repairShopData.address.intNum) {
      formData.append("address[intNum]", repairShopData.address.intNum);
    }
    formData.append(
      "address[neighborhood]",
      repairShopData.address.neighborhood
    );
    formData.append("address[zipCode]", repairShopData.address.zipCode);
    formData.append("address[city]", repairShopData.address.city);
    formData.append("address[state]", repairShopData.address.state);

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    const response = await fetch(`${API_URL}/user/${userId}/repairShop`, {
      method: "PATCH",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error ||
          "Error desconocido al actualizar el perfil de la refaccionaria."
      );
    }

    const json = await response.json();
    return json.data.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addCar(clientId, userData, carPicture, token) {
  try {
    const formData = new FormData();

    let { brand, model, version, year, nickname } = userData;

    if (nickname === "") {
      nickname = null;
    }

    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("version", version);
    formData.append("year", year);
    formData.append("nickname", nickname);
    if (carPicture) {
      formData.append("carPicture", carPicture);
    }

    const response = await fetch(`${API_URL}/client/${clientId}/car`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Error desconocido al agregar el carro"
      );
    }
    const json = await response.json();

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createAccountLink(id, token) {
  try {
    const response = await fetch(`${API_URL}/repairshop/account-link/${id}`,{
      method: "GET",
      headers: {
        Authorization: token,
      },
    })

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Error desconocido al obtener URL de stripe."
      );
    }
    const json =  await response.json(); 
    return json.data;

  } catch (error) {
    throw new Error(error.message);
  }
}

export async function activateStripeAccount(id, token) {
  try {
    const response = await fetch(`${API_URL}/repairshop/account/${id}`,{
      method: "GET",
      headers: {
        Authorization: token,
      },
    })

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Error desconocido al actualizar información de pago."
      );
    }
    const json =  await response.json(); 
    return json.data;

  } catch (error) {
    throw new Error(error.message);
  }
}

