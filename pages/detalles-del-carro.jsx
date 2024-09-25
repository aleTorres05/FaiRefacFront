import DetallesDelCarro from "@/components/DetallesDelCarro";
import Header from "@/components/Header";

export default function Login() {
  return (
    <div className="h-[100vh] flex flex-col">
      <Header className="fixed top-0 left-0 w-full" />

      <div className="flex flex-1 flex-col md:flex-row justify-center md:items-center">
        <DetallesDelCarro />
      </div>
    </div>
  );
}
