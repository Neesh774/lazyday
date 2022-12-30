import { Reorder } from "framer-motion";
import Event from "../components/Event";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

export default function Index() {
    const [today, setToday] = useState({
        day: "",
        weekday: "",
        current: {
            hours: "",
            minutes: ""
        }
    });

    // TODO: Store in localStorage?
    const [events, setEvents] = useState([
        {
            type: "movie",
            description: "The Matrix"
        }
    ]);

    useEffect(() => {
        const dates = {
            0: "Sun",
            1: "Mon",
            2: "Tue",
            3: "Wed",
            4: "Thu",
            5: "Fri",
            6: "Sat"
        };
        const date = new Date();
        setToday({
            weekday: dates[date.getDay()],
            day: date.getDate(),
            current: {
                hours: date.getHours(),
                minutes: date.getMinutes()
            }
        });
    }, [today]);

    return (
        <div className="font-body">
            <div className="p-14 w-full flex flex-col gap-4">
                <div className="items-center flex gap-x-4">
                    <div className="flex flex-col w-fit items-center prose prose-xl">
                        <h4 className="mb-0 text-blue-500">{today.weekday}</h4>
                        <h3 className="text-blue-500">{today.day}</h3>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        {events.map((event, i) => (
                            <Event
                                key={i}
                                event={event}
                                setEvent={event => {
                                    setEvents([
                                        ...events.slice(0, i),
                                        event,
                                        ...events.slice(i + 1)
                                    ]);
                                }}
                                deleteEvent={() => {
                                    setEvents([
                                        ...events.slice(0, i),
                                        ...events.slice(i + 1)
                                    ]);
                                }}
                            />
                        ))}
                    </div>
                </div>
                <button
                    className="flex flex-row w-fit gap-2 p-2 rounded-md bg-blue-100 hover:bg-blue-200 transition-all"
                    onClick={() => {
                        setEvents([
                            ...events,
                            {
                                type: "movie",
                                description: "The Matrix"
                            }
                        ]);
                    }}>
                    <Plus />
                    Create
                </button>
            </div>
        </div>
    );
}
