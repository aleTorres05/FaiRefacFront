import ClientEditInfoForm from "@/components/ClientEditInfoForm";
import Header from "@/components/Header";

export default function clientInfo() {
  return (
    <>
      <main className="my-2 h-screen">
        <Header />
        <div className="grid grid-cols-12 h-screen content-center justify-items-center">
          <ClientEditInfoForm />
        </div>
      </main>
    </>
  );
}
