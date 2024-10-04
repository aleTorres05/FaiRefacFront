import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner'; 

export default function VerifyEmail() {
  const [code, setCode] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const router = useRouter();

  
  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  
  const handleConfirmClick = () => {
    
    if (code.some(digit => digit === '')) {
      toast.error('Por favor, completa todos los dígitos antes de confirmar.'); 
      return;
    }
    
    toast.success('Código validado correctamente. Bienvenido a FaiRefac.'); 
    router.push('/clients/1');
  };

  return (
    <div className='flex justify-center md:items-center min-h-screen'>
      <main className="w-full md:h-[300px] max-w-full md:max-w-[630px] md:bg-[#282525] p-4 flex flex-col items-center justify-center gap-6 md:clip-custom">
        <h1 className="font-chakra font-bold text-white text-2xl md:text-3xl">VALIDA TU CORREO</h1>
        <h2 className="text-white font-mulish text-lg md:text-xl">Ingresa los 6 dígitos enviados a tu correo</h2>
        
        <div className="flex justify-center w-full max-w-[300px] md:max-w-[490px] gap-2 md:gap-4">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-[39px] h-[39px] md:w-[65px] md:h-[65px] bg-transparent border-b border-[#343434] text-center text-white text-lg focus:outline-none focus-visible:border-[#D26528] focus:border-[#D26528] font-mulish"
            />
          ))}
        </div>

        <button 
          onClick={handleConfirmClick}
          className="mt-6 w-full max-w-80 md:w-[239px] py-2 bg-[#D26528] text-white font-chakra font-bold text-lg"
        >
          CONFIRMAR CORREO
        </button>
      </main>
    </div>
  );
}
