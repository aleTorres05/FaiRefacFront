import Header from "./Header";
import DashboardButtons from "./DashboardButtons";
import PendingQuotes from "./PendingQuotes";
import FollowUpPanel from "./FollowUpPanel";
import { useState } from "react";

export default function RepairShopDashboard({ user }) {
  const [isSelected, setIsSelected] = useState({
    pendingQuotes: true, 
    followUpPanel: false, 
  });

  const handleButtonSelection = (option) => {
    setIsSelected({
      pendingQuotes: option === "pendingQuotes",
      followUpPanel: option === "followUpPanel",
    });
  };

  const { repairShop } = user;

  return (
    <>
      <main className="mt-[18px] mx-[32px] flex flex-col gap-4">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-12 gap-0 p-3 md:p-0">
          <DashboardButtons isSelected={isSelected} handleButtonSelection={handleButtonSelection} repairShop={repairShop}/>


          <div className="bg-black h-full col-start-1 col-end-13 md:p-2 p-4 lg:col-start-4 lg:col-end-13 md:col-start-5 md:col-end-13 md:ml-4 rounded-2xl mt-2 md:h-fit lg:h-fit md:flex-col lg:mt-4 lg:p-8 xl:col-start-4 xl:col-end-13 2xl:col-start-4 2xl:col-end-13 xl:p-7">
            {isSelected.pendingQuotes && <PendingQuotes repairShop={repairShop}/>}
            {isSelected.followUpPanel && <FollowUpPanel/>}
          </div>
        </div>
      </main>
    </>
  );
}

