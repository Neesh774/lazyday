import Event from "../components/Event";
import { useState, useEffect } from "react";
import {
    VerticalTimeline,
    VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Creatable, { useCreatable } from "react-select/creatable";
import dayjs from "dayjs";
import toast from "react-hot-toast";

export default function Index() {
    const [events, setEvents] = useState([]);
    const intervals = [];
    const start = dayjs();
    for (
        let i = dayjs()
            .set("seconds", 0)
            .set("minute", Math.round(start.get("minutes") / 5) * 5);
        i < dayjs().add(12, "h");
        i = i.add(5, "minutes")
    ) {
        intervals.push({ value: i, label: i.format("hh:mm A").toString() });
    }

    return (
        <div className="bg-slate-100 min-h-screen font-body">
            <div className="p-7">
                <div className="flex gap-x-4 items-center">
                    <div className="flex flex-col items-center justify-center prose prose-slate prose-xl">
                        <h2 className="text-blue-300 mb-0">
                            {
                                [
                                    "Sun",
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat"
                                ][new Date().getDay()]
                            }
                        </h2>
                        <h1 className="text-blue-500">
                            {new Date().getDate()}
                        </h1>
                    </div>
                    <Event
                        event={events}
                        setEvent={info =>
                            setEvents(
                                [...events, info].sort(
                                    (a, b) =>
                                        a.startTime.value > b.startTime.value
                                )
                            )
                        }
                        intervals={intervals}
                    />
                </div>
                <VerticalTimeline>
                    <style jsx>{`
                        .vertical-timeline-element-content {
                            box-shadow: none !important;
                        }

                        p {
                            margin-top: 0 !important;
                        }
                    `}</style>
                    {events.map((event, key) => {
                        console.log(event);
                        return (
                            <VerticalTimelineElement
                                key={key}
                                className="vertical-timeline-element"
                                iconStyle={{ backgroundColor: "#3b82f6" }}>
                                <h3>
                                    {event.startTime.label} -{" "}
                                    {event.endTime.label}
                                </h3>
                                <p>{event.description}</p>
                            </VerticalTimelineElement>
                        );
                    })}
                </VerticalTimeline>
            </div>
        </div>
    );
}
