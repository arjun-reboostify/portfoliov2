'use client'
import { useEffect, useState } from "react";
import AnimationWrapper from "../../client-view/animation-wrapper";
import { addData,getData,handleDelete } from "@/services";

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
        name: "illustrationlik",
        placeholder: "Enter your illustrationlink",
        type: "text",
        lable: "illustrationlink"
    }
]

const initialFormData ={
  category:"",
  title:"",
  concept:"",
  videolink:"",
  content:"",
  keywords:"",
  illustrationlink:"",
}


export default function ClientBlogsView({data,setAllData}){
const Courses = "Courses"
    const [formData, setFormData] = useState(initialFormData);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    async function handleSendMessage(){
        const res = await addData("Courses",formData);
        console.log(res,'Coursesres');

        if (res && res.success) {
            setFormData(initialFormData)
            setShowSuccessMessage(true)
        }
    }

    useEffect(() => {
        if (showSuccessMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false)
            },1500)
        }
    })

 const handleDeleteItem = async (id) => {
        const response = await handleDelete(id,Courses);
        if (response.success) {
            const updatedData = data.filter((item) => item._id !== id);
            setAllData((prevData) => ({
                ...prevData,
                education: updatedData
            }));
            console.log("Item deleted Successfully");
        }else {
            console.error("Failed to delete item", response.message)
        }
    };
    const isValidForm = () => {
        return formData &&
        formData.category !== "" &&
        formData.title !== "" &&
        formData.concept !== "" &&
        formData.videolink!==""&&
        formData.content!==""&&
        formData.keywords!==""&&
        formData.illustrationlink !== "" ? true : false
    };

    return (
        <div className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto" id="blogs">

<div className="mb-10 space-y-6">
        {data && data.length ? (
            data.map((item,index) => (
                <div key={index} className="bg-[#ffffff] flex flex-col gap-2 p-6 rounded-lg shadow-md border border-green-600 hover:border-green-800 transition duration-300" >
 <p className="text-lg font-semibold text-gray-700">Degree: {item.category}</p>
 <p className="text-lg text-gray-700">Year: {item.concept}</p>
 <p className="text-lg   text-gray-700">College: {item.title}</p>

  <div className="flex gap-2">
     <button onClick={() => handleDeleteItem(item._id)} className="bg-red-500 text-white-500 p-2 rounded">
            Delete
     </button>
  </div>



              </div>
            ))
        ) : 
        <p className="text-center text-gray-600"> No Job Experince data Available</p>
    }

    </div>
<AnimationWrapper className={"py-6"}>
    
    <div className="flex flex-col justify-center items-center row-start-2 sm:row-start-1">

    <h1 className="leading-[70px] mb-4 text-3xl lg:text-4xl xl:text-5xl font-bold">
            {"Contact Me".split(" ").map((item,index) => (
                <span className={`${index === 1 ? "text-green-main" : "text-[#000]"}`}> {item}{" "} </span>
            ))}
        </h1> 
    </div> 
</AnimationWrapper>

<div className="text-gray-500 relative">
    <div className="container px-5">
        <div className="w-full">
            <div className="flex flex-wrap -m-2">
                {controls.map((controlItem) => 
                controlItem.name === "content"||"content" ? (
        <div className="p-2 w-full">
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
            } className="w-full border-green-main border-[2px] bg-[#ffffff] rounded h-32 text-base outline-none text-[#000] py-1 px-3 resize-none leading-6">

            </textarea> 
            </div> 
        </div>
                ) : (
            <div className="p-2 w-full">
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
            } className="w-full border-green-main border-[2px] bg-[#ffffff] rounded text-base outline-none text-[#000] py-1 px-3 resize-none leading-6">

            </input> 
            </div> 
        </div> 
                )
                )}
                {
                    showSuccessMessage && <p className="text-[14px] font-bold my-[8px]">Your Message is successfully delivered</p>
                }
        <div className="p-2 w-full">
            <button disabled={!isValidForm()} onClick={handleSendMessage} className="disabled:opacity-50 py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg text-2xl tracking-widest bg-green-main outline-none">Send Message</button>
        </div>

            </div>
        </div>

    </div>

</div>



        </div>
    ) 
}