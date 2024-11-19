import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import DescriptionCard from "@/components/DescriptionCard";
import BenefitCards from "@/components/BenefitCards";
import History from "@/components/History";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function RepairShopBenefits() {
  return (
    <>
      <Header  />
      <main className="grid mt-[18px] mx-[32px] grid-cols-12">
        <Introduction  />
        <DescriptionCard  />
        <BenefitCards  />
        <History  />
        <FAQ  />
        <Footer  />
      </main>
    </>
  );
}