'use client'
import { useEffect, useState } from "react";
import AnimationWrapper from "../../client-view/animation-wrapper";
import { addData, getData, handleDelete, updateDat } from "@/services";

const controls = [
    {
        name: "movement",
        placeholder: "Enter your name",
        type: "text",
        lable: "Name"
    },
    {
        name: "measure",
        placeholder: "Enter your Email",
        type: "text",
        lable: "Email"
    },
    {
        name: "img",
        placeholder: "Enter your Email",
        type: "text",
        lable: "img"
    },
    {
        name: "process",
        placeholder: "Enter your message",
        type: "text",
        lable: "Message"
    }
]

const initialFormData = {
    movement: "",
    measure: "",
    img: "",
    process: ""
}

export default function ClientBlogsView({ data, setAllData }) {
    const stats = "stats"
    const [formData, setFormData] = useState(initialFormData);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);
    
    async function handleSendMessage() {
        if (isEditing) {
            // Update existing item
            const res = await updateDat(currentItemId, stats, formData);
            if (res && res.success) {
                // Update the local data
                const updatedData = data.map(item => 
                    item._id === currentItemId ? { ...item, ...formData } : item
                );
                setAllData(prevData => ({
                    ...prevData,
                    education: updatedData
                }));
                
                // Reset the form
                setFormData(initialFormData);
                setIsEditing(false);
                setCurrentItemId(null);
                setShowSuccessMessage(true);
            }
        } else {
            // Add new item
            const res = await addData("stats", formData);
            console.log(res, 'statsres');

            if (res && res.success) {
                setFormData(initialFormData);
                setShowSuccessMessage(true);
            }
        }
    }

    useEffect(() => {
        if (showSuccessMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 1500)
        }
    }, [showSuccessMessage]);

    const handleDeleteItem = async (id) => {
        const response = await handleDelete(id, stats);
        if (response.success) {
            const updatedData = data.filter((item) => item._id !== id);
            setAllData((prevData) => ({
                ...prevData,
                education: updatedData
            }));
            console.log("Item deleted Successfully");
        } else {
            console.error("Failed to delete item", response.message)
        }
    };

    const handleEditItem = (item) => {
        // Populate the form with the item data
        setFormData({
            movement: item.movement || "",
            measure: item.measure || "",
            img: item.img || "",
            process: item.process || ""
        });
        setIsEditing(true);
        setCurrentItemId(item._id);
        
        // Scroll to the form
        document.getElementById("contact-form").scrollIntoView({ behavior: "smooth" });
    };
    
    const cancelEdit = () => {
        setFormData(initialFormData);
        setIsEditing(false);
        setCurrentItemId(null);
    };

    const isValidForm = () => {
        return formData &&
            formData.movement !== "" &&
            formData.measure !== "" &&
            formData.img !== "" &&
            formData.process !== "" ? true : false
    };

    return (
        <div className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto" id="blogs">

            <div className="mb-10 space-y-6">
                {data && data.length ? (
                    data.map((item, index) => (
                        <div key={index} className="bg-[#ffffff] flex flex-col gap-2 p-6 rounded-lg shadow-md border border-green-600 hover:border-green-800 transition duration-300" >
                            <p className="text-lg font-semibold text-gray-700">Degree: {item.movement}</p>
                            <p className="text-lg text-gray-700">Year: {item.measure}</p>
                            <p className="text-lg text-gray-700">College: {item.process}</p>

                            <div className="flex gap-2">
                                <button onClick={() => handleEditItem(item)} className="bg-blue-500 text-white-500 p-2 rounded">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteItem(item._id)} className="bg-red-500 text-white-500 p-2 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : 
                    <p className="text-center text-gray-600"> No Job Experience data Available</p>
                }
            </div>

            <AnimationWrapper className={"py-6"}>
                <div className="flex flex-col justify-center items-center row-start-2 sm:row-start-1">
                    <h1 className="leading-[70px] mb-4 text-3xl lg:text-4xl xl:text-5xl font-bold">
                        {(isEditing ? "Edit Entry" : "Contact Me").split(" ").map((item, index) => (
                            <span key={index} className={`${index === 1 ? "text-green-main" : "text-[#000]"}`}> {item}{" "} </span>
                        ))}
                    </h1> 
                </div> 
            </AnimationWrapper>

            <div className="text-gray-500 relative" id="contact-form">
                <div className="container px-5">
                    <div className="w-full">
                        <div className="flex flex-wrap -m-2">
                            {controls.map((controlItem, index) => 
                                controlItem.name === "process" ? (
                                    <div key={index} className="p-2 w-full">
                                        <div className="relative">
                                            <label className="text-sm text-[#000]">
                                                {controlItem.lable}</label>
                                        
                                            <textarea 
                                                id={controlItem.name}
                                                name={controlItem.name}
                                                value={formData[controlItem.name]}
                                                onChange={(e) => 
                                                    setFormData({
                                                        ...formData,
                                                        [controlItem.name] : e.target.value
                                                    })
                                                } 
                                                className="w-full border-green-main border-[2px] bg-[#ffffff] rounded h-32 text-base outline-none text-[#000] py-1 px-3 resize-none leading-6">
                                            </textarea> 
                                        </div> 
                                    </div>
                                ) : (
                                    <div key={index} className="p-2 w-full">
                                        <div className="relative">
                                            <label className="text-sm text-[#000]">
                                                {controlItem.lable}</label>
                                        
                                            <input 
                                                id={controlItem.name}
                                                name={controlItem.name}
                                                value={formData[controlItem.name]}
                                                onChange={(e) => 
                                                    setFormData({
                                                        ...formData,
                                                        [controlItem.name] : e.target.value
                                                    })
                                                } 
                                                className="w-full border-green-main border-[2px] bg-[#ffffff] rounded text-base outline-none text-[#000] py-1 px-3 leading-6">
                                            </input> 
                                        </div> 
                                    </div> 
                                )
                            )}
                            {
                                showSuccessMessage && 
                                <p className="text-[14px] font-bold my-[8px] w-full p-2 text-green-600">
                                    {isEditing ? "Entry updated successfully!" : "Your Message is successfully delivered"}
                                </p>
                            }
                            <div className="p-2 w-full flex gap-2">
                                <button 
                                    disabled={!isValidForm()} 
                                    onClick={handleSendMessage} 
                                    className="disabled:opacity-50 py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg text-2xl tracking-widest bg-green-main outline-none">
                                    {isEditing ? "Update" : "Send Message"}
                                </button>
                                
                                {isEditing && (
                                    <button 
                                        onClick={cancelEdit} 
                                        className="py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg text-2xl tracking-widest bg-gray-500 outline-none">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}