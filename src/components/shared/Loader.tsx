import { LuLoaderCircle } from "react-icons/lu";

export default function Loader() {
    return (
        <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center">
            <LuLoaderCircle className="w-7 h-7 animate-spin" />
        </div>
    )
}
