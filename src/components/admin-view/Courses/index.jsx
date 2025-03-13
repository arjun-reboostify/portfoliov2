'use client'
import { useEffect, useState } from "react";
import AnimationWrapper from "../../client-view/animation-wrapper";
import { addData, handleDelete, updateDa } from "@/services";

const controls = [
    {
        name: "category",
        placeholder: "Enter the category",
        type: "text",
        lable: "category"
    },
    {
        name: "title",
        placeholder: "Enter your title",
        type: "text",
        lable: "title"
    },
    {
        name: "concept",
        placeholder: "Enter your concept",
        type: "text",
        lable: "concept"
    },
    {
        name: "videolink",
        placeholder: "Enter your videolink",
        type: "text",
        lable: "videolink"
    },
    {
        name: "content",
        placeholder: "Enter your content",
        type: "text",
        lable: "content"
    },
    {
        name: "keywords",
        placeholder: "Enter your keywords",
        type: "text",
        lable: "keywords"
    },
    {
        name: "img",
        placeholder: "Enter your illustrationlink",
        type: "text",
        lable: "img"
    }
]

const initialFormData = {
  category: "",
  title: "",
  concept: "",
  videolink: "",
  content: "",
  keywords: "",
  img: ""
}

export default function AdminCoursesView({ data, setAllData }) {
    const collectionName = "Courses"; // Ensure consistent capitalization
    const [formData, setFormData] = useState(initialFormData);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [localData, setLocalData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);
    
    // Log incoming data for debugging
    useEffect(() => {
        console.log("AdminCoursesView received data:", data);
        if (data) {
            setLocalData(Array.isArray(data) ? data : []);
        }
    }, [data]);

    async function handleSendMessage() {
        try {
            setIsLoading(true);
            setError(null);
            
            if (isEditing) {
                // Update existing item
                console.log("Updating item:", currentItemId, "in collection:", collectionName);
                console.log("Form data being updated:", formData);
                
                const res = await updateDa(currentItemId, collectionName, formData);
                console.log("Update response:", res);
                
                if (res && res.success) {
                    // Update the local data
                    const updatedData = localData.map(item => 
                        item._id === currentItemId ? { ...item, ...formData } : item
                    );
                    setLocalData(updatedData);
                    
                    // Update parent component state
                    if (setAllData) {
                        setAllData(prevState => ({
                            ...prevState,
                            [collectionName]: updatedData
                        }));
                    }
                    
                    // Reset the form
                    setFormData(initialFormData);
                    setIsEditing(false);
                    setCurrentItemId(null);
                    setShowSuccessMessage(true);
                } else {
                    setError("Failed to update course: " + (res?.message || "Unknown error"));
                }
            } else {
                // Add new item
                console.log("Sending data to collection:", collectionName);
                console.log("Form data being sent:", formData);
                
                const res = await addData(collectionName, formData);
                console.log("Add response:", res);

                if (res && res.success) {
                    // Add the new item to local state
                    const newItem = res.data || { ...formData, _id: Date.now().toString() };
                    setLocalData(prev => [...prev, newItem]);
                    
                    // Update parent component state
                    if (setAllData) {
                        setAllData(prevState => ({
                            ...prevState,
                            [collectionName]: [...(prevState[collectionName] || []), newItem]
                        }));
                    }
                    
                    setFormData(initialFormData);
                    setShowSuccessMessage(true);
                } else {
                    setError("Failed to add course: " + (res?.message || "Unknown error"));
                }
            }
        } catch (err) {
            console.error(isEditing ? "Error updating course:" : "Error adding course:", err);
            setError(`Error ${isEditing ? "updating" : "adding"} course: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 1500);
            
            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage]);

    const handleDeleteItem = async (id) => {
        try {
            setIsLoading(true);
            setError(null);
            
            console.log("Deleting item:", id, "from collection:", collectionName);
            
            const response = await handleDelete(id, collectionName);
            console.log("Delete response:", response);
            
            if (response && response.success) {
                // Update local state
                const updatedData = localData.filter((item) => item._id !== id);
                setLocalData(updatedData);
                
                // Update parent component state
                if (setAllData) {
                    setAllData(prevState => ({
                        ...prevState,
                        [collectionName]: updatedData
                    }));
                }
                
                console.log("Item deleted successfully");
            } else {
                setError("Failed to delete item: " + (response?.message || "Unknown error"));
            }
        } catch (err) {
            console.error("Error deleting item:", err);
            setError("Error deleting item: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditItem = (item) => {
        // Populate the form with the item data
        setFormData({
            category: item.category || "",
            title: item.title || "",
            concept: item.concept || "",
            videolink: item.videolink || "",
            content: item.content || "",
            keywords: item.keywords || "",
            img: item.img || ""
        });
        setIsEditing(true);
        setCurrentItemId(item._id);
        
        // Scroll to the form
        window.scrollTo({
            top: document.getElementById("course-form").offsetTop,
            behavior: "smooth"
        });
    };
    
    const cancelEdit = () => {
        setFormData(initialFormData);
        setIsEditing(false);
        setCurrentItemId(null);
    };

    const isValidForm = () => {
        return formData &&
        formData.category !== "" &&
        formData.title !== "" &&
        formData.concept !== "" &&
        formData.videolink !== "" &&
        formData.content !== "" &&
        formData.keywords !== "" &&
        formData.img !== "";
    };

    // Helper function to check if data is empty
    const isDataEmpty = !localData || localData.length === 0;

    return (
        <div className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto" id="Courses">
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                    <button 
                        className="ml-2 font-bold" 
                        onClick={() => setError(null)}
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="mb-10 space-y-6">
                {isLoading && (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    </div>
                )}
                
                {!isLoading && isDataEmpty ? (
                    <p className="text-center text-gray-600">No Courses data available</p>
                ) : (
                    localData.map((item, index) => (
                        <div key={item._id || index} className="bg-[#ffffff] flex flex-col gap-2 p-6 rounded-lg shadow-md border border-green-600 hover:border-green-800 transition duration-300">
                            <p className="text-lg font-semibold text-gray-700">Category: {item.category}</p>
                            <p className="text-lg text-gray-700">Title: {item.title}</p>
                            <p className="text-lg text-gray-700">Concept: {item.concept}</p>

                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleEditItem(item)}
                                    disabled={isLoading}
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteItem(item._id)}
                                    disabled={isLoading}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300 disabled:opacity-50"
                                >
                                    {isLoading ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <AnimationWrapper className={"py-6"}>
                <div className="flex flex-col justify-center items-center row-start-2 sm:row-start-1">
                    <h1 className="leading-[70px] mb-4 text-3xl lg:text-4xl xl:text-5xl font-bold">
                        {(isEditing ? "Edit Course" : "Add Course").split(" ").map((item, index) => (
                            <span key={index} className={`${index === 1 ? "text-green-main" : "text-[#000]"}`}> {item}{" "} </span>
                        ))}
                    </h1> 
                </div> 
            </AnimationWrapper>

            <div className="text-gray-500 relative" id="course-form">
                <div className="container px-5">
                    <div className="w-full">
                        <div className="flex flex-wrap -m-2">
                            {controls.map((controlItem, index) => 
                                controlItem.name === "content" ? (
                                    <div key={index} className="p-2 w-full">
                                        <div className="relative">
                                            <label className="text-sm text-[#fff]">
                                                {controlItem.lable}
                                            </label>
                                        
                                            <textarea 
                                                id={controlItem.name}
                                                name={controlItem.name}
                                                placeholder={controlItem.placeholder}
                                                value={formData[controlItem.name]}
                                                onChange={(e) => 
                                                    setFormData({
                                                        ...formData,
                                                        [controlItem.name]: e.target.value
                                                    })
                                                } 
                                                className="w-full border-green-main border-[2px] bg-[#000] rounded h-32 text-base outline-none text-[#fff] py-1 px-3 resize-none leading-6"
                                            />
                                        </div> 
                                    </div>
                                ) : (
                                    <div key={index} className="p-2 w-full">
                                        <div className="relative">
                                            <label className="text-sm text-[#fff]">
                                                {controlItem.lable}
                                            </label>
                                        
                                            <input 
                                                id={controlItem.name}
                                                name={controlItem.name}
                                                type={controlItem.type}
                                                placeholder={controlItem.placeholder}
                                                value={formData[controlItem.name]}
                                                onChange={(e) => 
                                                    setFormData({
                                                        ...formData,
                                                        [controlItem.name]: e.target.value
                                                    })
                                                } 
                                                className="w-full border-green-main border-[2px] bg-[#000] rounded text-base outline-none text-[#fff] py-1 px-3 leading-6"
                                            />
                                        </div> 
                                    </div>
                                )
                            )}
                            
                            {showSuccessMessage && 
                                <p className="text-[14px] text-[#fff] font-bold my-[8px] w-full p-2">
                                    {isEditing ? "Course updated successfully!" : "Course successfully added!"}
                                </p>
                            }
                            
                            <div className="p-2 w-full flex gap-2">
                                <button 
                                    disabled={!isValidForm() || isLoading} 
                                    onClick={handleSendMessage} 
                                    className="disabled:opacity-50 py-3 lg:py-4 px-12 lg:px-16 text-white font-semibold rounded-lg text-2xl tracking-widest bg-green-main outline-none hover:bg-green-600 transition duration-300"
                                >
                                    {isLoading ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Course' : 'Add Course')}
                                </button>
                                
                                {isEditing && (
                                    <button 
                                        onClick={cancelEdit}
                                        disabled={isLoading}
                                        className="py-3 lg:py-4 px-12 lg:px-16 text-white font-semibold rounded-lg text-2xl tracking-widest bg-gray-500 outline-none hover:bg-gray-600 transition duration-300 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}