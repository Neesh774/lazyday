import Select, { OptionProps as SelectProps } from "react-select";
import React from "react";
import { Dumbbell, Film, Pizza, Trash, Tv } from "lucide-react";
import { OptionProps } from "../utils/types";
import chroma from "chroma-js";
import { data } from "browserslist";

export default function Event({
    event,
    setEvent,
    deleteEvent
}: {
    event: {
        type: string;
        description: string;
        start_time: string;
    };
    setEvent: (event: {
        type: string;
        description: string;
        start_time: string;
    }) => void;
    deleteEvent: () => void;
}) {
    const [inputFocused, setInputFocused] = React.useState(false);
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

    const showSuggestions = type => {
        fetch(`/api/titles?type=${type}`)
            .then(res => res.text())
            .then(res => console.log(res));
    };

    return (
        <div className="w-full rounded-lg bg-white border border-slate-200 shadow-md px-4 py-3 flex flex-row justify-between items-center gap-4">
            <div className="flex flex-row gap-4 flex-grow">
                <Select
                    options={eventOptions}
                    value={eventOptions.find(
                        option => option.value === event.type
                    )}
                    onChange={(option: any, action: any) => {
                        showSuggestions(option.value);
                        setEvent(option.value);
                    }}
                    placeholder="Event"
                    className="w-72"
                    isSearchable={false}
                    getOptionLabel={(option: OptionProps) =>
                        (
                            <div className="flex flex-row gap-4 items-center font-medium">
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
                        },
                        // make portal take up full width
                        menuPortal: (styles: any) => ({
                            ...styles,
                            zIndex: 9999,
                            width: "100%"
                        }),
                        menu: (styles: any) => ({
                            ...styles,
                            minWidth: "fit-content",
                            whiteSpace: "nowrap"
                        })
                    }}
                />
                <input
                    type="text"
                    className="w-4/5 rounded-md border-slate-300"
                    placeholder="Event name"
                    disabled={!event}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    value={event.description}
                    onChange={e =>
                        setEvent({ ...event, description: e.target.value })
                    }
                />
            </div>
            <button
                onClick={deleteEvent}
                className="p-1 rounded-md bg-red-300/40 hover:bg-red-300/60 text-red-500 transition-all">
                <Trash />
            </button>
        </div>
    );
}
