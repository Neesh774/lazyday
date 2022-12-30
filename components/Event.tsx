import Select, { OptionProps as SelectProps } from "react-select";
import React, { useState } from "react";
import { Dumbbell, Film, Pizza, Tv } from "lucide-react";
import { OptionProps } from "../utils/types";
import chroma from "chroma-js";
import { data } from "browserslist";
import dayjs from "dayjs";
import Creatable, { useCreatable } from "react-select/creatable";
import toast from "react-hot-toast"


export default function Event({
    event,
    setEvent,
    intervals
}: {
    event: string;
    setEvent: (event: object) => void;
    intervals: Array<Number>
}) {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [description, setDescription] = useState(null);
    const eventOptions = [
        {
            value: "movie",
            label: "Watch a movie",
            icon: <Film />,
            color: "#264ede"
        },
        {
            value: "tvSeries",
            label: "Binge TV",
            icon: <Tv />,
            color: "#e85900"
        },
        {
            value: "food",
            label: "Food",
            icon: <Pizza />,
            color: "#489c14"
        },
        {
            value: "exercise",
            label: "Do a workout",
            icon: <Dumbbell />,
            color: "#860fbd"
        }
    ];

    const createEvent = () => {
        if (!startTime || !endTime || !description) toast.error("Make sure you fill out all the fields!")
        else if (startTime.value > endTime.value) toast.error("Make sure the start time is before the end time")
        else if (startTime && endTime && description) {
            setEvent({ startTime, endTime, description })
            setStartTime(null);
            setEndTime(null);
            setDescription(null);
            toast.success("Created!")
    }
}

    return (
        <div className="items-start w-full rounded-lg bg-white border border-slate-200 px-4 py-3 flex flex-row gap-x-2">
            <div className="flex flex-col gap-y-2">
                <Select
                    options={eventOptions}
                    value={eventOptions.find(option => option.value === event)}
                    onChange={(option: any, action: any) => {
                        setEvent(option.value);
                    }}
                    placeholder="Event"
                    className="w-60 !border-slate-200"
                    isSearchable={false}
                    getOptionLabel={(option: OptionProps) =>
                        (
                            <div className="flex flex-row gap-2 items-center font-medium">
                                <span
                                    style={{
                                        color: option.color
                                    }}>
                                    {option.icon}
                                </span>
                                {option.label}
                            </div>
                        ) as any
                    }
                    styles={{
                        option: (styles, { data, isFocused, isSelected }) => {
                            const color = chroma(data.color);
                            return {
                                ...styles,
                                "transition": "all 0.1s ease-in-out",
                                "backgroundColor": isFocused
                                    ? color.alpha(0.1).css()
                                    : isSelected
                                    ? color.alpha(0.1).css()
                                    : "white",
                                "color": "black",
                                ":active": {
                                    ...styles[":active"],
                                    backgroundColor: !isSelected
                                        ? color.alpha(0.3).css()
                                        : color.alpha(0.1).css()
                                }
                            };
                        }
                    }}
                />
                <Creatable value={startTime} options={intervals} onChange={option => setStartTime(option)} placeholder="Start time"/>
                <Creatable value={endTime} options={intervals} onChange={option => setEndTime(option)} placeholder="End time"/>
            </div>
            <input
                type="text"
                className="w-full border-slate-200 rounded-md"
                onChange={event => setDescription(event.target.value)}
                placeholder="Event name"
                disabled={!event}
                value={description}
            />
            <button className="bg-blue-500 px-4 py-2 rounded text-white font-bold" onClick={createEvent}>Create</button>
        </div>
    );
}
