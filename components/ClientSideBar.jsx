import { useState } from "react";

export default function ClientSideBar() {
  const [isCarSelected, setIsCarSelected] = useState(false);

  const carButtonSelection = () => {
    setIsCarSelected(!isCarSelected);
  };

  return (
    <section className="bg-black lg:col-start-1 lg:col-end-4 lg:h-screen lg:p-3 lg:mt-4">
      <div>
        <div className="flex flex-row lg:mb-[65px] lg:mt-[22px]">
          <img
            className="lg:w-[80px] lg:h-[80px] rounded-full"
            src="https://api.dicebear.com/9.x/adventurer/svg?seed=Mackenzie"
            alt="avatar"
          />
          <div className="flex flex-col justify-center">
            <h4 className="lg:h-[24px]">Juan Perez</h4>
            <p className="lg:h-[15px]">Calle 213 av. kodemia</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-9">
        <button className="lg:w-[275px] lg:h-[50px]">Coches</button>
        <button className="lg:w-[275px] lg:h-[50px]">Cotizaciones</button>
      </div>
    </section>
  );
}
