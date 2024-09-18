import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import DescriptionCard from "@/components/DescriptionCard";

export default function Home() {
  return (
    <main className="grid mt-[18px] mx-[32px] lg:grid-cols-12">
      <Header />
      <Introduction />
      <DescriptionCard />
    </main>
  );
}
