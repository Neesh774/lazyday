import { Dumbbell, Film, Pizza, Tv } from "lucide-react";
import React from "react";

export const allTypes = [
    "movie",
    "musicVideo",
    "podcastEpisode",
    "short",
    "tvEpisode",
    "tvSeries",
    "videoGame"
];
export type TitleType = typeof allTypes[number];

export type OptionProps = {
    value: string;
    label: string;
    icon: React.ReactNode;
    color: string;
};

export type Event = {
    type: string;
    description: string;
    startTime: any;
    endTime: any;
};

export const eventOptions = [
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

export type Suggestion = {
    label: string;
    onClick?: () => void;
};
