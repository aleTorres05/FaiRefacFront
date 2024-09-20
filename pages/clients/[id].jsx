import Header from "@/components/Header";
import ClientSideBar from "@/components/ClientSideBar";

export default function ClientProfile() {
  return (
    <>
      <main className=" mt-[18px] mx-[32px] ">
        <Header />
        <div className="lg:grid lg:grid-cols-12">
          <ClientSideBar />
        </div>
      </main>
    </>
  );
}
