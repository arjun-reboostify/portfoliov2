'use client'
import { useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion, useScroll } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ClientProjectView({data}){
    // console.log(data,"project");
    const containerRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: containerRef });
    const router = useRouter();
    
    return(
        <div className="max-w-screen-xl mt-16 sm:mt-20 md:mt-24 mb-6 sm:mb-10 md:mb-14 px-4 sm:px-6 md:px-8 mx-auto" id="project">
            <AnimationWrapper className={"py-4 sm:py-8 md:py-16"}>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="leading-tight sm:leading-[50px] md:leading-[70px] mb-2 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
                        {"My Projects".split(" ").map((item, index) => (
                            <span key={index} className={`${index === 1 ? "text-green-main" : "text-[#ffffff]"}`}> {item}{" "} </span>
                        ))}
                    </h1>
                    <svg id="progress" width={80} height={80} viewBox="0 0 100 100" className="sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px]">
                        <circle
                            cx={"50"}
                            cy={"50"}
                            r="30"
                            pathLength={"1"}
                            className="stroke-[#000]"
                        />
                        <motion.circle
                            cx={"50"}
                            cy={"50"}
                            r="30"
                            pathLength={"1"}
                            className="stroke-green-main"
                            style={{ pathLength: scrollXProgress }}
                        /> 
                    </svg> 
                </div> 
            </AnimationWrapper>

            <AnimationWrapper>
                <div className="overflow-x-auto">
                    <ul className="project-wrapper flex space-x-4 pb-4 min-w-max" ref={containerRef}>
                        {data && data.length ?
                            data.map((item, index) => (
                                <li className="w-[300px] sm:w-[350px] md:w-[400px] flex-shrink-0 flex items-stretch cursor-pointer" key={index}>
                                    <div className="border-2 w-full relative border-green-main transition-all rounded-lg flex flex-col h-full">
                                        <div className="flex p-3 sm:p-4 flex-col w-full items-stretch">
                                            <div className="flex">
                                                <div className="flex flex-col">
                                                    <h3 className="text-xl sm:text-2xl md:text-3xl text-[#ffffff] capitalize font-bold">{item.name}</h3>
                                                    <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-[#ffffff] capitalize font-bold">{item.createdAt.split("T")[0]}</p>

                                                    <div className="grid gap-1 sm:gap-2 mt-3 sm:mt-5 grid-cols-2 h-full pb-12">
                                                        {item?.technologies.split(",").map((techItem, techIndex) => (
                                                            <div key={techIndex} className="w-full flex justify-start items-center">
                                                                <button className="whitespace-nowrap text-ellipsis overflow-hidden py-1 sm:py-2 w-[100px] sm:w-[120px] px-2 sm:px-4 md:px-6 border-[2px] border-green-main bg-[#000] text-[#ffffff] font-semibold rounded-lg text-[10px] sm:text-xs tracking-widest hover:shadow-green-main transition-all outline-none">
                                                                    {techItem}
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div> 
                                                </div> 
                                            </div> 
                                        </div>

                                        <div className="absolute w-full bottom-0 justify-center flex gap-2 p-2">
                                            <button 
                                                onClick={() => router.push(item.website)} 
                                                className="py-1 sm:py-2 px-2 sm:px-3 text-[#ffffff] font-semibold text-[12px] sm:text-[14px] tracking-widest bg-green-main transition-all outline-none hover:bg-green-600"
                                            >
                                                Website
                                            </button>
                                            <button  
                                                onClick={() => router.push(item.github)} 
                                                className="py-1 sm:py-2 px-2 sm:px-3 text-[#fff] font-semibold text-[12px] sm:text-[14px] tracking-widest bg-green-main transition-all outline-none hover:bg-green-600"
                                            >
                                                Github
                                            </button>
                                        </div>
                                    </div> 
                                </li>
                            )) : null
                        }
                    </ul>
                </div>
            </AnimationWrapper>
        </div>
    )
}