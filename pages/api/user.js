const API_URL = "https://fairefac-api.onrender.com";

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

export async function addCar(userId, formData, carPicture, token) {
  try {
    const { marca, modelo, version, year, nickname } = formData;
    const response = await fetch(`${API_URL}/client/${userId}/car`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        marca,
        modelo,
        version,
        year,
        nickname,
        carPicture,
      }),
    });

    console.log(response);
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
