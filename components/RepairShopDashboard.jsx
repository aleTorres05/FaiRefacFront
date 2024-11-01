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
  const [quotes, setQuotes] = useState(repairShop?.quotes || []);

  return (
    <>
      <main className="md:mt-[18px] md:mx-[32px] flex flex-col md:gap-4">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-0 p-3 md:p-0">
          <DashboardButtons isSelected={isSelected} handleButtonSelection={handleButtonSelection} repairShop={repairShop}/>


          <div className="bg-black h-fit col-start-1 col-end-13 md:p-2 p-4 lg:col-start-4 lg:col-end-13 md:col-start-3 md:col-end-13 md:ml-4 rounded-2xl mt-2 md:h-screen md:flex-col lg:mt-4 lg:p-8 xl:col-start-4 xl:col-end-13 2xl:col-start-4 2xl:col-end-13 xl:p-7">
            {isSelected.pendingQuotes && <PendingQuotes quotes={quotes} setQuotes={setQuotes}/>}
            {isSelected.followUpPanel && <FollowUpPanel repairShop={repairShop}/>}
          </div>
        </div>
      </main>
    </>
  );
}

