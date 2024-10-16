import CustomToaster from "@/components/CustomToaster";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CustomToaster />
    </>
  );
}
