import { useState } from "react";
import Event from "../components/Event";

export default function EventPage() {
    const [event, setEvent] = useState();

    return <Event event={event} setEvent={setEvent} />;
}
