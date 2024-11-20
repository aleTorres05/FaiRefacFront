import Introduction from "@/components/Introduction";
import DescriptionCard from "@/components/DescriptionCard";
import BenefitCards from "@/components/BenefitCards";
import History from "@/components/History";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="grid mt-[18px] mx-[32px] grid-cols-12">
      <Introduction />
      <DescriptionCard />
      <BenefitCards />
      <History />
      <FAQ />
      <Footer />
    </main>
  );
}
