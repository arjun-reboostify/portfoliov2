'use client'
import { useMemo, useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from 'framer-motion';
import Image from "next/image";
import about from "../../../assets/about.png"

function variants() {
    return {
        offscreen: {
            y: 150,
            opacity: 0
        },
        onscreen: ({ duration = 2 } = {}) => ({
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                duration,
            }
        })
    } 
}

const skillItemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

export default function ClientAboutView({ data }) {
    console.log(data, 'ClientAboutView');

    const setVariants = useMemo(() => variants(), []);

    const aboutDataInfo = [
        {
            label: "Client",
            value: data?.noofclients || "0",
        },
        {
            label: "Projects",
            value: data?.noofprojects || "0",
        },
        {
            label: "Experience",
            value: data?.yearofexerience || "0",
        }
    ]

    const headingText = "Why Hire Me For Your Next Project";

    return (
        <div className="max-w-screen-xl  mx-auto" id="about">
            <div className="w-full flex">
                <AnimationWrapper className="rounded-lg w-full grid-flow-row grid grid-cols-1 sm:grid-cols-3  divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-green-main bg-ehite-500 z-10">
                    {aboutDataInfo.map((infoItem, index) => (
                        <motion.div 
                            className={`flex items-center
                            ${
                                index === 0
                                ? "justify-center sm:justify-start"
                                : index === 1
                                ? "justify-center"
                                : "justify-center sm:justify-end"
                            } py-3 sm:py-6 px-2 sm:px-4 mx-auto`}
                            key={index}
                            custom={{ duration: 2 + index }}
                            variants={setVariants}
                        >
                            <div className="flex m-0 w-auto text-center sm:text-left">
                                <div className="flex flex-col">
                                    <p className="text-[36px] text-[#ffffff] sm:text-[42px] md:text-[50px] text-green-main font-bold">
                                        {infoItem.value}+
                                    </p>
                                    <p className="text-[18px] sm:text-[20px] md:text-[25px] font-bold text-[#fff]">
                                        {infoItem.label}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimationWrapper>
            </div>

            <AnimationWrapper className={"pt-6"}>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="leading-tight sm:leading-[50px] md:leading-[70px] mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-center">
                        {headingText.split(" ").map((item, index) => (
                            <span key={index} className={`${index === 5 ? "text-green-main" : "text-[#ffffff]"}`}> {item}{" "} </span>
                        ))}
                    </h1>
                    <p className="text-[#ffffff] mt-2 sm:mt-4 mb-4 sm:mb-8 font-bold text-center px-2 sm:px-4"> {data?.aboutme} </p> 
                </div>
            </AnimationWrapper>

            <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <AnimationWrapper className="flex w-full">
                    <motion.div variants={setVariants} className="h-full w-full p-2 sm:p-4">
                        <Image
                            src={about}
                            alt="about image"
                            layout="responsive"
                            quality={100}
                            height={414}
                            width={508} 
                        />  
                    </motion.div> 
                </AnimationWrapper>

                <AnimationWrapper className={"flex items-center w-full p-2 sm:p-4"}>
                    <motion.div 
                        variants={setVariants} 
                        className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-3 h-full w-full"
                    >
                        {data?.skills.split(",").map((skill, index) => (
                            <motion.div 
                                key={index}
                                className="w-full flex justify-center items-center mb-2" 
                                variants={skillItemVariant}
                            >
                                <button className="whitespace-nowrap text-ellipsis overflow-hidden py-2 sm:py-3 w-full max-w-[160px] px-2 sm:px-6 border-[2px] border-green-main bg-[#fff] text-[#000] font-bold rounded-lg text-sm sm:text-base md:text-xl tracking-wider sm:tracking-widest hover:shadow-green-main transition-all outline-none">
                                    {skill.trim()}
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimationWrapper>
            </div>
        </div>
    )
}