'use client'
import { handleDelete } from "@/services"
import FormControls from "../form-controls"

const controls = [
    {
        name: 'degree',
        placeholder: 'Degree Name',
        type: 'text',
        label: 'Degree Name'
    },
    {
        name: 'year',
        placeholder: 'Year',
        type: 'text',
        label: 'Year'
    },
    {
        name: 'college',
        placeholder: 'College Name',
        type: 'text',
        label: 'College Name'
    } 
] 


export default function AdminEducationView({formData,setFormData,handleSaveData,data,setAllData}){

    const handleDeleteItem = async (id) => {
        const response = await handleDelete(id);
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




    console.log(formData);
    return <div className="w-full">
    <div className="bg-[#d7d7d7] shadow-md rounded px-8 pt-6 pb-8 mb-4">

    <div className="mb-10 space-y-6">
        {data && data.length ? (
            data.map((item,index) => (
                <div key={index} className="bg-[#ffffff] flex flex-col gap-2 p-6 rounded-lg shadow-md border border-green-600 hover:border-green-800 transition duration-300" >
 <p className="text-lg font-semibold text-gray-700">Degree: {item.degree}</p>
 <p className="text-lg text-gray-700">Year: {item.year}</p>
 <p className="text-lg   text-gray-700">College: {item.college}</p>

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


<FormControls controls={controls}
 formData={formData}
 setFormData={setFormData}
/> 

<button onClick={() => handleSaveData('education')}  className="mt-[5px] border border-blue-600 bg-blue-600 text-white p-3 font-bold text-[16px] focus:bg-green-800 rounded-md">
    Add Education
</button>

    </div>
 </div>
}