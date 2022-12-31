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
import { eventOptions } from "../utils/types";
import chroma from "chroma-js";

export default function Index() {
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({
        type: undefined,
        description: "",
        startTime: undefined,
        endTime: undefined
    });
    return (
        <div className="bg-slate-100 min-h-screen font-body p-12 pt-4 flex flex-col justify-start gap-4">
            <h1 className="text-4xl font-extrabold">LazyDay</h1>
            <div className="flex gap-x-4 items-center max-w-5xl">
                <div className="flex flex-col items-center justify-center prose prose-slate prose-md bg-blue-400/20 rounded-md py-3 px-4">
                    <h2 className="text-blue-600/60 mb-0">
                        {dayjs().format("ddd")}
                    </h2>
                    <h1 className="text-blue-500">{dayjs().format("D")}</h1>
                </div>
                <Event
                    event={currentEvent}
                    setEvent={info =>
                        setCurrentEvent({ ...currentEvent, ...info })
                    }
                    addEvent={() => {
                        setEvents([...events, currentEvent]);
                        setCurrentEvent({
                            startTime: undefined,
                            endTime: undefined,
                            description: "",
                            type: undefined
                        });
                    }}
                />
            </div>
            <VerticalTimeline
                className="shadow-none w-fit !m-0"
                layout="1-column-left">
                {events.map((event, key) => {
                    if (event.startTime === undefined) return null;
                    const option = eventOptions.find(
                        option => option.value === event.type
                    );
                    return (
                        <VerticalTimelineElement
                            icon={option.icon}
                            key={key}
                            contentStyle={{
                                boxShadow: "none"
                            }}
                            iconStyle={{
                                backgroundColor: chroma(option.color).brighten(
                                    2
                                ),
                                color: option.color
                            }}>
                            <div className="flex flex-col gap-2">
                                <h3>
                                    <span className="text-lg font-bold text-zinc-500">
                                        {dayjs(event.startTime, "HH:mm").format(
                                            "h:mm A "
                                        )}
                                    </span>
                                    &mdash;
                                    <span className="text-lg font-bold text-zinc-500">
                                        {dayjs(event.endTime, "HH:mm").format(
                                            " h:mm A"
                                        )}
                                    </span>
                                </h3>
                                <h1 className="text-xl font-bold">
                                    {option.label}
                                </h1>
                                <h3 className="!text-lg !font-semibold text-zinc-700">
                                    {event.description}
                                </h3>
                            </div>
                        </VerticalTimelineElement>
                    );
                })}
            </VerticalTimeline>
        </div>
    );
}
