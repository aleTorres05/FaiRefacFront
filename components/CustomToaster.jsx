import { Toaster } from "sonner";


export default function CustomToaster() {
    return (
        <Toaster
        toastOptions={{
            className: "border-2 border-[#D26528] bg-[#302F2F] text-white font-chakra font-bold"
        }}
        />
    )
}