import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getByID } from "@/pages/api/user";

export default function UserUpdateForm() {
  const router = useRouter();

  const { id } = router.query;
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (id) {
      console.log("este es un id", id);
      getByID(id, token)
        .then((user) => {
          setUser(user);
          console.log(user);
        })
        .catch((e) => {
          //toast and send back to login
          toast.error("Wrong password or Username");
          router.push("/login");
          console.log(e);
        });
    }
  }, [id]);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    refaccionariaName: "",
    street: "",
    exteriorNumber: "",
    interiorNumber: "",
    colonia: "",
    postalCode: "",
    municipality: "",
    state: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.isClient) {
      router.push(`/dashboard/${user._id}`);
    } else if (user.isRepairShop) {
      router.push(`/dashboard/${user._id}`);
    }
    console.log(formData);
  };

  return (
    <main className="flex justify-center items-center flex-col min-w-[320px] w-full min-h-dvh gap-4 p-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm md:max-w-[660px]"
      >
        {/* Si es cliente */}
        {user.isClient && (
          <>
            <div className="mb-14">
              <label className="block text-sm font-medium mb-1">NOMBRE</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528]"
              />
            </div>

            <div className="mb-14">
              <label className="block text-sm font-medium mb-1">APELLIDO</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
                className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528]"
              />
            </div>

            <div className="mb-14">
              <label className="block text-sm font-medium mb-1">TELÉFONO</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528]"
              />
            </div>
          </>
        )}

        {/* Si es refaccionaria */}
        {user.isRepairShop && (
          <>
            {/* Nombre de la Refaccionaria */}
            <div className="mb-10">
              <label className="block text-sm font-medium mb-1">
                NOMBRE DE LA REFACCIONARIA
              </label>
              <input
                type="text"
                name="refaccionariaName"
                value={formData.refaccionariaName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    refaccionariaName: e.target.value,
                  })
                }
                required
                className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528]"
              />
            </div>

            {/* Teléfono */}
            <div className="mb-10">
              <label className="block text-sm font-medium mb-1">TELÉFONO</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528]"
              />
            </div>

            {/* Calle */}
            <div className="mb-10">
              <label className="block text-sm font-medium mb-1">CALLE</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                required
                className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528]"
              />
            </div>

            {/* Número Exterior e Interior */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full mb-10 ">
                <label className="block text-sm font-medium mb-1">
                  NÚMERO EXTERIOR
                </label>
                <input
                  type="text"
                  name="exteriorNumber"
                  value={formData.exteriorNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, exteriorNumber: e.target.value })
                  }
                  required
                  className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528]"
                />
              </div>
              <div className="w-full mb-10">
                <label className="block text-sm font-medium mb-1">
                  NÚMERO INTERIOR
                </label>
                <input
                  type="text"
                  name="interiorNumber"
                  value={formData.interiorNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, interiorNumber: e.target.value })
                  }
                  className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528]"
                />
              </div>
            </div>

            {/* Colonia y Código Postal */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full mb-10">
                <label className="block text-sm font-medium mb-1">
                  COLONIA
                </label>
                <input
                  type="text"
                  name="colonia"
                  value={formData.colonia}
                  onChange={(e) =>
                    setFormData({ ...formData, colonia: e.target.value })
                  }
                  required
                  className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528]"
                />
              </div>
              <div className="w-full mb-10">
                <label className="block text-sm font-medium mb-1">
                  CÓDIGO POSTAL
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                  required
                  className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528]"
                />
              </div>
            </div>

            {/* Delegación o Municipio */}
            <div className="mb-10">
              <label className="block text-sm font-medium mb-1">
                DELEGACIÓN O MUNICIPIO
              </label>
              <input
                type="text"
                name="municipality"
                value={formData.municipality}
                onChange={(e) =>
                  setFormData({ ...formData, municipality: e.target.value })
                }
                required
                className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528]"
              />
            </div>

            {/* Estado */}
            <div className="mb-10">
              <label className="block text-sm font-medium mb-1">ESTADO</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                required
                className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528]"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full md:w-64 py-2 bg-[#D26528] text-white font-bold"
        >
          ACTUALIZAR INFORMACIÓN
        </button>
      </form>
    </main>
  );
}
