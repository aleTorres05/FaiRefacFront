import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import clsx from 'clsx';

export default function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isClient: false,
    isRepairShop: false,
  });
  const router = useRouter();

  const handleRoleSelection = (role) => {
    setFormData({
      ...formData,
      isClient: role === 'client',
      isRepairShop: role === 'repairShop',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {isClient, isRepairShop} = formData;

    if (!isClient && !isRepairShop) {
      toast.error('Debes seleccionar al menos una opción "CLIENTE" o "REFACCIONARIA".');
      return;
    }

    toast.success("Registro exitoso, valida tu correo electronico para poder continuar.");
    router.push("/email-verification");
  };

  return (
    <main className='flex justify-center items-center flex-col min-w-[320px]  w-full min-h-dvh gap-4 p-7 md:p-8 lg:p-10'>
    <form onSubmit={handleSubmit} className="w-full max-w-sm md:max-w-[660px]">

      {/* Botones para seleccionar si es cliente o refaccionaria */}
      <div className="mb-14 flex  flex-col md:flex-row justify-between ">
        <button
          type="button"
          onClick={() => handleRoleSelection('client')}
          className={clsx(
            'py-2 px-4 mr-2 w-full mb-14 md:mb-0 md:w-64 text-white font-chakra font-bold',
            formData.isClient ? 'bg-[#D26528]' : 'bg-[#030303]'
          )}
        >
          CLIENTE
        </button>

        <button
          type="button"
          onClick={() => handleRoleSelection('repairShop')}
          className={clsx(
            'py-2 px-4 mr-2 w-full md:w-64 text-white font-chakra font-bold',
            formData.isRepairShop ? 'bg-[#D26528]' : 'bg-[#030303]'
          )}
        >
          REFACCIONARIA
        </button>
      </div>

      <div className="mb-14">
        <label className="block text-sm font-chakra font-medium mb-1">CORREO ELECTRONICO</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528] font-mulish"
        />
      </div>

      <div className="mb-14">
        <label className="block text-sm font-medium mb-1">CONTRASEÑA</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="w-full border-b border-[#343434] bg-transparent focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528] font-mulish"
        />
      </div>

      <button type="submit" className="w-full md:w-64 py-2 bg-[#D26528] text-white font-bold font-chakra">
        CREAR USUARIO
      </button>
    </form>
    </main>
  );
}


