'use client'
import FormControls from "../form-controls"

const controls = [
    {
        name: 'name',
        placeholder: 'Project name',
        type: 'text',
        label: 'Project name'
    },
    {
        name: 'website',
        placeholder: 'Website Name',
        type: 'text',
        label: 'Website Name'
    },
    {
        name: 'technologies',
        placeholder: 'Enter Technologies',
        type: 'text',
        label: 'Enter Technologies'
    },
    {
        name: 'github',
        placeholder: 'Github',
        type: 'text',
        label: 'Github'
    } 
] 

export default function AdminProjectView({formData,setFormData,handleSaveData,data}){
    console.log(formData);
    return <div className="w-full">
    <div className="bg-[#d7d7d7] shadow-md rounded px-8 pt-6 pb-8 mb-4">


    <div className="mb-10 space-y-6">
        {data && data.length ? (
            data.map((item,index) => (
                <div key={index} className="bg-[#ffffff] flex flex-col gap-2 p-6 rounded-lg shadow-md border border-green-600 hover:border-green-800 transition duration-300" >
 <p className="text-lg font-semibold text-gray-700">Name: {item.name}</p>
 <p className="text-lg text-gray-700">
    <a href={item.website} target="/blank"> Website: {item.website}</a></p>
 <p className="text-lg   text-gray-700">Technologies: {item.technologies}</p> 
 <p className="text-lg   text-gray-700">
 <a href={item.github} target="/blank"> github: {item.github }</a></p> 
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

<button onClick={() => handleSaveData('project')} className="mt-[5px] border border-blue-600 bg-blue-600 text-white p-3 font-bold text-[16px] focus:bg-green-800 rounded-md">
    Add Project
</button>

    </div>
 </div>
} 