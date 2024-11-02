const API_URL = "https://fairefac-api.onrender.com/repairshop-quote";


export async function repairShopQuoteUpdateById (id, token, items) {
try {
    const response = await fetch(`${API_URL}/${id}/update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(items)
    });

    if(!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
            errorResponse.error || "Error desconocido al actualizar la cotización"
        );
    }

    return await response.json();
    
} catch (error) {
    throw new Error(error.message);
}
}