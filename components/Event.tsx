import Select, { OptionProps as SelectProps } from "react-select";
import React, { useEffect, useState } from "react";
import { Event as EventType, OptionProps, eventOptions } from "../utils/types";
import chroma from "chroma-js";
import { data } from "browserslist";
import dayjs from "dayjs";
import Creatable, { useCreatable } from "react-select/creatable";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function Event({
    event,
    setEvent,
    addEvent
}: {
    event: EventType;
    setEvent: (event: EventType) => void;
    addEvent: () => void;
}) {
    const [inputFocused, setInputFocused] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState([]);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const suggestionsRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getSuggestions = async () => {
            const res = await fetch(`/api/getSuggestions?type=${event.type}`)
                .then(res => res.json())
                .catch(err => console.log(err));
            setSuggestions(res);
        };

        if (inputRef.current && inputFocused) {
            getSuggestions();
        }
    }, [inputFocused, event.type]);

    useEffect(() => {
        // add on click handler that closes the suggestions
        const handleClickOutside = (e: any) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target) &&
                suggestionsRef.current &&
                !suggestionsRef.current.contains(e.target)
            ) {
                setInputFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const createEvent = () => {
        if (!event.startTime || !event.endTime || !event.description)
            toast.error("Make sure you fill out all the fields!");
        else if (
            !dayjs(event.startTime, "HH:mm").isBefore(
                dayjs(event.endTime, "HH:mm")
            )
        )
            toast.error("Make sure the start time is before the end time");
        else if (event.startTime && event.endTime && event.description) {
            addEvent();
            toast.success("Created!");
        }
    };

    return (
        <>
            <div className="items-start w-full rounded-lg bg-white border border-slate-200 px-4 py-3 flex flex-row gap-x-2">
                <div className="flex flex-col gap-y-2">
                    <Select
                        options={eventOptions}
                        value={eventOptions.find(
                            option => option.value === event.type
                        )}
                        onChange={(option: any, action: any) => {
                            setEvent({
                                ...event,
                                type: option.value
                            });
                        }}
                        placeholder="Event"
                        className="w-72 !border-slate-200"
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
                            option: (
                                styles,
                                { data, isFocused, isSelected }
                            ) => {
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
                    <div className="flex flex-row w-fit whitespace-nowrap gap-4">
                        <input
                            type="time"
                            className="w-36 border-slate-200 rounded-md"
                            onChange={e => {
                                setEvent({
                                    ...event,
                                    startTime: e.target.value
                                });
                            }}
                            placeholder="Start time"
                            value={event.startTime}
                        />
                        <input
                            type="time"
                            className="w-36 border-slate-200 rounded-md"
                            onChange={e => {
                                setEvent({
                                    ...event,
                                    endTime: e.target.value
                                });
                            }}
                            placeholder="End time"
                            value={event.endTime}
                        />
                    </div>
                </div>
                <input
                    type="text"
                    className="w-full border-slate-200 rounded-md"
                    onChange={e => {
                        setEvent({
                            ...event,
                            description: e.target.value
                        });
                    }}
                    placeholder="Event description"
                    disabled={!event}
                    value={event.description}
                    ref={inputRef}
                    onFocus={() => setInputFocused(true)}
                />
                <button
                    className="bg-blue-500 px-4 py-2 rounded text-white font-bold"
                    onClick={createEvent}>
                    Create
                </button>
            </div>
            {inputFocused && (
                <div
                    className="w-96 max-h-80 h-fit overflow-scroll z-50 bg-white shadow-lg animate-fadeUp"
                    ref={suggestionsRef}
                    style={{
                        position: "absolute",
                        top: inputRef.current?.getBoundingClientRect().bottom,
                        left: inputRef.current?.getBoundingClientRect().left
                    }}>
                    {suggestions.length > 0 ? (
                        <div className="flex flex-col gap-2 font-medium">
                            {suggestions.map((suggestion, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setEvent({
                                            ...event,
                                            description: suggestion
                                        });
                                        setInputFocused(false);
                                    }}
                                    className="px-4 py-2 border-b-2 border-b-zinc-200 cursor-pointer">
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full w-full flex py-12 justify-center items-center">
                            <Loader2 className="animate-spin" />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
