import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "../styles/globals.scss";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
    dayjs.extend(customParseFormat);
    return (
        <>
            <Toaster />
            <Component {...pageProps} />
        </>
    );
}
