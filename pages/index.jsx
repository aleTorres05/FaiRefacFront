import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import DescriptionCard from "@/components/DescriptionCard";
import BenefitCards from "@/components/BenefitCards";
import History from "@/components/History";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home");
  return (
    <>
      <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <main className="grid mt-[18px] mx-[32px] grid-cols-12">
        <Introduction currentPage={currentPage} />
        <DescriptionCard currentPage={currentPage} />
        <BenefitCards currentPage={currentPage} />
        <History currentPage={currentPage} />
        <FAQ currentPage={currentPage} />
        <Footer currentPage={currentPage} />
      </main>
    </>
  );
}
