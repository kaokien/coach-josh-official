import React from 'react';
import Image from 'next/image';

export const metadata = {
    title: 'Class Schedule | Coach Josh Official',
    description: 'View the full weekly boxing class schedule — kids, teens, and adults. Classes run Mon–Sat in Hamden, CT. First 7 days free.',
    openGraph: {
        title: 'Boxing Class Schedule | Coach Josh Official',
        description: 'Kids, teens, and adult boxing classes Mon–Sat in Hamden, CT. First 7 days free.',
        images: ['/og-image.jpg'],
    },
};

export default function ScheduleFlyer() {
    const tableData = [
        {
            time: "10AM-11AM",
            mon: { text: "NO CLASS", type: "red" },
            tues: { text: "NO CLASS", type: "red" },
            wed: { text: "NO CLASS", type: "red" },
            thurs: { text: "NO CLASS", type: "red" },
            fri: { text: "NO CLASS", type: "red" },
            sat: { text: "ADULTS &\nTEENS", type: "red" }, // Adults are red
        },
        {
            time: "5PM-6PM",
            mon: { text: "KIDS CLASS", type: "blue" }, // Kids are blue
            tues: { text: "NO CLASS", type: "red" },
            wed: { text: "KIDS CLASS", type: "blue" },
            thurs: { text: "NO CLASS", type: "red" },
            fri: { text: "KIDS CLASS", type: "blue" },
            sat: { text: "NO CLASS", type: "red" },
        },
        {
            time: "6PM-7:30PM",
            mon: { text: "NO CLASS", type: "red" },
            tues: { text: "NO CLASS", type: "red" },
            wed: { text: "NO CLASS", type: "red" },
            thurs: { text: "NO CLASS", type: "red" },
            fri: { text: "ADULTS &\nTEENS", type: "red" },
            sat: { text: "NO CLASS", type: "red" },
        },
        {
            time: "7:30PM-9PM",
            mon: { text: "ADULTS &\nTEENS", type: "red" },
            tues: { text: "ADULTS &\nTEENS", type: "red" },
            wed: { text: "ADULTS &\nTEENS", type: "red" },
            thurs: { text: "ADULTS &\nTEENS", type: "red" },
            fri: { text: "OPEN GYM", type: "red" },
            sat: { text: "NO CLASS", type: "red" },
        },
    ];

    const getCellClasses = (type: string) => {
        if (type === 'red') return "text-red-600 font-extrabold uppercase tracking-widest text-xs md:text-sm lg:text-lg whitespace-pre-wrap";
        if (type === 'blue') return "text-blue-600 font-extrabold uppercase tracking-widest text-xs md:text-sm lg:text-lg whitespace-pre-wrap";
        return "";
    };

    return (
        <div className="relative min-h-screen bg-white text-black font-display flex flex-col items-center p-4 sm:p-8">
            {/* Print container: restricts width on large screens to standard 8.5x11 aspect ratio */}
            <div className="w-full max-w-[900px] mx-auto bg-white flex flex-col items-center">

                {/* Header with Logo */}
                <div className="flex flex-col items-center w-full mb-6 text-center">
                    <Image
                        src="/coach-josh-logo.png"
                        alt="Coach Josh Official Logo"
                        width={180}
                        height={180}
                        className="mb-6 object-contain filter drop-shadow-md"
                    />
                    <div className="flex flex-col sm:flex-row justify-center items-center w-full uppercase text-xs sm:text-sm font-body tracking-widest font-bold gap-2 sm:gap-6 border-b-[3px] border-black pb-4">
                        <span>55 Connelly Rd Hamden, CT</span>
                        <span className="hidden sm:inline">•</span>
                        <span>(203) 248-2274</span>
                        <span className="hidden sm:inline">•</span>
                        <span>coachjoshofficial@playersclubllc.com</span>
                    </div>
                </div>

                {/* Title Section */}
                <div className="text-center w-full mb-6">
                    <h1 className="text-6xl sm:text-7xl md:text-[5.5rem] font-extrabold uppercase leading-[0.9] tracking-tighter m-0 p-0 text-black">
                        BEGINNER
                    </h1>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-black mt-2">
                        BOXING CLASS SCHEDULE
                    </h2>
                    <p className="text-xl md:text-2xl mt-3 tracking-[0.25em] font-bold text-gray-800">
                        WITH @COACHJOSHOFFICIAL
                    </p>
                </div>

                {/* Subtitle */}
                <div className="text-center mb-8">
                    <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide">
                        FIRST 7 DAYS <span className="text-red-600">FREE!</span>
                    </h3>
                </div>

                {/* Schedule Grid */}
                <div className="w-full flex flex-col mb-8 overflow-x-auto">
                    <table className="w-full border-collapse min-w-[700px] table-fixed border-[4px] border-black">
                        <thead>
                            <tr>
                                <th className="w-[12%] border-[3px] border-black p-2 md:p-3 text-center bg-gray-100">
                                </th>
                                {['MON.', 'TUES.', 'WED.', 'THURS.', 'FRI.', 'SAT.'].map((day, i) => (
                                    <th key={i} className="w-[14.6%] border-[3px] border-black p-2 md:p-3 text-center text-xl md:text-3xl font-extrabold uppercase bg-gray-100">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    <td className="border-[3px] border-black p-2 md:p-3 text-center align-middle font-extrabold text-sm md:text-xl uppercase whitespace-nowrap bg-gray-100">
                                        {row.time}
                                    </td>
                                    {[row.mon, row.tues, row.wed, row.thurs, row.fri, row.sat].map((cell, idx) => (
                                        <td key={idx} className="border-[3px] border-black p-2 md:p-3 text-center align-middle h-24 sm:h-28">
                                            <span className={getCellClasses(cell.type)}>
                                                {cell.text}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Annotations & QR Code Section */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-end border-t-[3px] border-black pt-6 pb-8 gap-8 sm:gap-0">
                    <div className="flex flex-col font-extrabold text-black text-base md:text-xl tracking-wider text-center sm:text-left">
                        <p className="text-red-600">*ADULTS AND TEENS: <span className="text-black">11YRS+</span></p>
                        <p className="mt-2 text-blue-600">*KIDS CLASS: <span className="text-black">6-11YRS</span></p>
                    </div>

                    {/* QR Code */}
                    <div className="flex flex-col items-center">
                        <p className="font-extrabold uppercase text-xl md:text-2xl mb-3 text-center text-black tracking-widest">
                            SCAN TO JOIN
                        </p>
                        <div className="w-32 h-32 md:w-40 md:h-40 border-[4px] border-black p-2 bg-white relative">
                            <Image
                                src="/qr-code.png"
                                alt="Scan code to claim 7 days free"
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
