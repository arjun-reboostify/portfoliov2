'use client'
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";

export default function ClientExperienceAndEducationView({educationData, experienceData}){
    // console.log(educationData,experienceData,"educationData");

    return (
    <div className="max-w-screen-xl mt-16 sm:mt-20 md:mt-24 mb-6 sm:mb-10 md:mb-14 px-4 sm:px-6 lg:px-16 mx-auto" id="experience">

        <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">

            {/* Experience Section */}
            <div className="flex flex-col gap-3 sm:gap-5">
                <AnimationWrapper className={"py-4 sm:py-8 md:py-16"}>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="leading-tight sm:leading-[50px] md:leading-[70px] mb-2 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
                            {"My Experince".split(" ").map((item, index) => (
                                <span key={index} className={`${index === 1 ? "text-green-main" : "text-[#fff]"}`}> {item}{" "} </span>
                            ))}
                        </h1>
                    </div>
                </AnimationWrapper>

                <AnimationWrapper>
                    <div className="flex w-full">
                        <motion.div className="container">
                            <Timeline position="right">
                                {experienceData && experienceData.length ? 
                                    experienceData.map((experienceItem, index) => (
                                        <TimelineItem key={index}>
                                            <TimelineSeparator>
                                                <TimelineDot className="bg-green-main" />
                                                <TimelineConnector className="bg-green-main" />  
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <div className="border-[2px] p-3 sm:p-4 rounded-[8px] border-green-main mt-[14px] ml-[8px] sm:ml-[16px]">
                                                    <p className="font-bold text-[#ffffff] text-sm sm:text-base">{ experienceItem.duration }</p>
                                                    <p className="font-extrabold text-[#ffffff] mt-1 sm:mt-2 text-sm sm:text-base">
                                                        { experienceItem.company },{" "}
                                                        { experienceItem.location}
                                                    </p>
                                                    <p className="font-extrabold text-[#ffffff] mt-1 sm:mt-2 text-sm sm:text-base">
                                                        { experienceItem.position } 
                                                    </p>
                                                    <p className="font-bold text-[#ffffff] mt-1 sm:mt-2 text-xs sm:text-sm">
                                                        { experienceItem.jobprofile } 
                                                    </p>
                                                </div>
                                            </TimelineContent>
                                        </TimelineItem>
                                    )) : null 
                                }
                            </Timeline>
                        </motion.div>
                    </div> 
                </AnimationWrapper> 
            </div> 

            {/* Education Section */}
            <div className="flex flex-col gap-3 sm:gap-5 mt-6 sm:mt-0">
                <AnimationWrapper className={"py-4 sm:py-8 md:py-16"}>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="leading-tight sm:leading-[50px] md:leading-[70px] mb-2 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
                            {"My Education".split(" ").map((item, index) => (
                                <span key={index} className={`${index === 1 ? "text-green-main" : "text-[#fff]"}`}> {item}{" "} </span>
                            ))}
                        </h1>
                    </div>
                </AnimationWrapper>

                <AnimationWrapper>
                    <div className="flex w-full">
                        <motion.div className="container">
                            <Timeline position="right">
                                {educationData && educationData.length ? 
                                    educationData.map((educationItem, index) => (
                                        <TimelineItem key={index}>
                                            <TimelineSeparator>
                                                <TimelineDot className="bg-green-main" />
                                                <TimelineConnector className="bg-green-main" />  
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <div className="border-[2px] p-3 sm:p-4 rounded-[8px] border-green-main mt-[14px] ml-[8px] sm:ml-[16px]">
                                                    <p className="font-bold text-[#ffffff] text-sm sm:text-base">Year: { educationItem.year }</p> 
                                                    <p className="text-[#ffffff] font-extrabold mt-1 sm:mt-2 text-sm sm:text-base">
                                                        College: { educationItem.college } 
                                                    </p>
                                                    <p className=" text-[#ffffff] font-bold mt-1 sm:mt-2 text-xs sm:text-sm">
                                                        Degree: { educationItem.degree } 
                                                    </p>
                                                </div>
                                            </TimelineContent>
                                        </TimelineItem>
                                    )) : null 
                                }
                            </Timeline>
                        </motion.div>
                    </div> 
                </AnimationWrapper> 
            </div>         
        </div> 
    </div>
    )
}