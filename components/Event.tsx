import Select, { OptionProps as SelectProps } from "react-select";
import React from "react";
import { Dumbbell, Film, Pizza, Tv } from "lucide-react";
import { OptionProps } from "../utils/types";
import chroma from "chroma-js";
import { data } from "browserslist";

export default function Event({
    event,
    setEvent
}: {
    event: string;
    setEvent: (event: string) => void;
}) {
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
    return (
        <div className="w-full rounded-lg bg-white shadow-md px-4 py-2 flex flex-row gap-4">
            <Select
                options={eventOptions}
                value={eventOptions.find(option => option.value === event)}
                onChange={(option: any, action: any) => {
                    setEvent(option.value);
                }}
                placeholder="Event"
                className="w-60"
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
            <input
                type="text"
                className="w-full"
                placeholder="Event name"
                disabled={!event}
            />
        </div>
    );
}
