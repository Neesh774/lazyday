import { Reorder } from "framer-motion";
import { useState, useEffect } from "react";

function Item({ content }) {
    return (
        <div className="border-b prose prose-xl">
            <p>{content}</p>
        </div>
    );
}

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
    const [items, setItems] = useState([0, 1, 2, 3]);
    const [intervals, setIntervals] = useState([]);

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

        let intervals = [];
        for (let i = today.current.hours; i <= 24; i++) {
            intervals.push(i);
        }
        setIntervals(intervals);
    }, [today]);

    return (
        <div className="font-body overflow-x-hidden w-screen">
            <div className="p-14 w-full">
                <div className="flex gap-x-4">
                    <div className="flex flex-col w-fit items-center prose prose-xl">
                        <h4 className="mb-0 text-blue-500">{today.weekday}</h4>
                        <h3 className="bg-blue-500 text-white rounded-full w-fit !w-[50px] h-[50px] flex items-center justify-center">
                            <span>{today.day}</span>
                        </h3>
                    </div>
                    <button className=""
                </div>
                <div className="relative flex py-7 w-full">
                    <div>
                        {intervals.map(i => (
                            <div className="-z-1 w-full" key={i}>
                                <div className="w-full !flex gap-x-2 min-h-[50px] justify-center prose items-center max-w-none">
                                    <h3 className="text-slate-500 m-0">
                                        {i}:00
                                    </h3>
                                    <div className="bg-slate-300 w-screen h-[1px] self-center" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col z-50 max-w-none absolute left-20 top-14">
                        <div className="bg-sky-500 prose text-white max-w-none h-[100px] p-3 rounded-md">
                            <p>Watch a movie</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
