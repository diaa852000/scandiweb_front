import { Link } from "react-router-dom";
import { SVGS } from "../../constants/svgs";

export default function Logo() {
    return (
        <Link to={"/"} className="flex-2 flex justify-center items-center">
            {SVGS.logo}
        </Link>
    )
}
