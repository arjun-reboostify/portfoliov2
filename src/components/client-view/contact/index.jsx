'use client'
import { useEffect, useState } from "react";
import AnimationWrapper from "../animation-wrapper";
import { addData } from "@/services";

const controls = [
    {
        name: "name",
        placeholder: "Enter your name",
        type: "text",
        lable: "Name"
    },
    {
        name: "email",
        placeholder: "Enter your Email",
        type: "text",
        lable: "Email"
    },
    {
        name: "message",
        placeholder: "Enter your message",
        type: "text",
        lable: "Message"
    }
]

const initialFormData = {
    name: "",
    email: "",
    message: ""
}

export default function ClientContactView() {
    const [formData, setFormData] = useState(initialFormData);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    async function handleSendMessage() {
        const res = await addData("contact", formData);
        console.log(res, 'contactres');

        if (res && res.success) {
            setFormData(initialFormData)
            setShowSuccessMessage(true)
        }
    }

    useEffect(() => {
        if (showSuccessMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 1500)
        }
    }, [showSuccessMessage]) // Added dependency array here

    const isValidForm = () => {
        return formData &&
        formData.name !== "" &&
        formData.email !== "" &&
        formData.message !== "" ? true : false
    };

    return (
        <div className="max-w-screen-xl mt-12 mb-4 sm:mt-14 sm:mb-14 px-4 sm:px-6 lg:px-16 mx-auto" id="contact">
            <AnimationWrapper className={"py-4 sm:py-6"}>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="leading-tight sm:leading-[70px] mb-2 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center">
                        {"Contact Me".split(" ").map((item, index) => (
                            <span key={index} className={`${index === 1 ? "text-green-main" : "text-[#fff]"}`}> {item}{" "} </span>
                        ))}
                    </h1> 
                </div> 
            </AnimationWrapper>

            <div className="text-[#fff] relative">
                <div className="container px-2 sm:px-5">
                    <div className="w-full">
                        <div className="flex flex-wrap -m-2">
                            {controls.map((controlItem, index) => 
                                controlItem.name === "message" ? (
                                    <div key={index} className="p-2 w-full">
                                        <div className="relative">
                                            <label className="text-sm text-[#fff] block mb-1">
                                                {controlItem.lable}
                                            </label>
                                            <textarea 
                                                id={controlItem.name}
                                                name={controlItem.name}
                                                value={formData[controlItem.name]}
                                                onChange={(e) => 
                                                    setFormData({
                                                        ...formData,
                                                        [controlItem.name]: e.target.value
                                                    })
                                                } 
                                                className="w-full border-green-main border-[2px] bg-[#000] rounded h-24 sm:h-32 text-base outline-none text-[#fff] py-1 px-3 resize-none leading-6"
                                                placeholder={controlItem.placeholder}
                                            />
                                        </div> 
                                    </div>
                                ) : (
                                    <div key={index} className="p-2 w-full">
                                        <div className="relative">
                                            <label className="text-sm text-[#000] block mb-1">
                                                {controlItem.lable}
                                            </label>
                                            <input 
                                                id={controlItem.name}
                                                name={controlItem.name}
                                                type={controlItem.type}
                                                value={formData[controlItem.name]}
                                                onChange={(e) => 
                                                    setFormData({
                                                        ...formData,
                                                        [controlItem.name]: e.target.value
                                                    })
                                                } 
                                                className="w-full border-green-main border-[2px] bg-[#000] rounded text-base outline-none text-[#fff] py-1 px-3 leading-6"
                                                placeholder={controlItem.placeholder}
                                            />
                                        </div> 
                                    </div> 
                                )
                            )}
                            {
                                showSuccessMessage && <p className="text-[14px] font-bold my-[8px] w-full text-center text-green-main">Your Message is successfully delivered</p>
                            }
                            <div className="p-2 w-full flex justify-center sm:justify-start mt-2">
                                <button 
                                    disabled={!isValidForm()} 
                                    onClick={handleSendMessage} 
                                    className="disabled:opacity-50 py-2 sm:py-3 lg:py-4 px-8 sm:px-12 lg:px-16 text-white-500 font-semibold rounded-lg text-lg sm:text-xl lg:text-2xl tracking-widest bg-green-main outline-none transition-all hover:bg-opacity-90"
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}