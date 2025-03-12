'use client'
import AdminAboutView from "@/components/admin-view/about"
import Stats from "@/components/admin-view/stats"
import AdminContactView from "@/components/admin-view/contact"
import AdminBlogsView from "@/components/admin-view/blogs"
import AdminEducationView from "@/components/admin-view/education"
import AdminExperienceView from "@/components/admin-view/experience"
import AdminHomeView from "@/components/admin-view/home"
import Login from "@/components/admin-view/login"
import AdminProjectView from "@/components/admin-view/project"
import { addData, getData, login, updateData } from "@/services"
import { useEffect, useState } from "react"

const initialHomeFormData = {
    heading: "",
    summary: ""
}; 

const initialAboutFormData = {
    aboutme: "",
    noofprojects: "",
    yearofexerience: "",
    noofclients: "",
    skills: ""
};
const initialExperienceFormData = {
    position: "",
    company: "",
    duration: "",
    location: "",
    jobprofile: ""
};
const initialEducationFormData = {
    degree: "",
    year: "",
    college: "", 
};
const initialProjectFormData = {
    name: "",
    website: "",
    technologies: "",
    github: "", 
}
const initialLoginFormData = {
    username: "",
    password: "", 
}

export default function AdminView(){
    const [currentSeletedTab, setCurrentSeletedTab] = useState('home');
    const [homeViewFormData, setHomeViewFormData] = useState(initialHomeFormData);
    const [aboutViewFormData, setAboutViewFormData] = useState(initialAboutFormData);
    const [experinceViewFormData, setExperinceViewFormData] = useState(initialExperienceFormData);
    const [educationViewFormData, setEducationViewFormData] = useState(initialEducationFormData);
    const [projectViewFormData, setProjectViewFormData] = useState(initialProjectFormData);

    const [allData, setAllData] = useState({});
    const [update, setUpdate] = useState(false);
    const [authUser, setAuthUser] = useState(false);
    const [loginFormData, setLoginFormData] = useState(initialLoginFormData);

    const menuItem = [
        { 
            id: 'home',
            lable: 'Home',
            component: <AdminHomeView
            formData = {homeViewFormData}
            setFormData = {setHomeViewFormData}
            handleSaveData={handleSaveData}
            />
        },
        {
            id: 'about',
            lable: 'About Page',
            component: <AdminAboutView 
            formData = {aboutViewFormData}
            setFormData = {setAboutViewFormData}
            handleSaveData={handleSaveData}
            />
        },
        {
            id: 'experience',
            lable: 'Experience',
            component: <AdminExperienceView 
            formData = {experinceViewFormData}
            setFormData = {setExperinceViewFormData}
            handleSaveData={handleSaveData}
            data={allData?.experience}
            />
        },
        {
            id: 'education',
            lable: 'Education',
            component: <AdminEducationView 
            formData = {educationViewFormData}
            setFormData = {setEducationViewFormData}
            handleSaveData={handleSaveData}
            data={allData?.education}
            setAllData={setAllData}
            />
        },
        {
            id: 'project',
            lable: 'Project',
            component: <AdminProjectView 
            formData = {projectViewFormData}
            setFormData = {setProjectViewFormData}
            handleSaveData={handleSaveData}
            data={allData?.project}
            />
        },
        {
            id: 'contact',
            lable: 'Contact',
            component: <AdminContactView
            data={allData && allData?.contact}
            />
        },
        {
            id: 'blogs',
            lable: 'Blogs',
         
            component: <AdminBlogsView
            data={allData?.blogs}
            setAllData={setAllData}
            />
        },
        {
            id: 'stats',
            lable: 'stats',
         
            component: <Stats
            data={allData?.stats}
            setAllData={setAllData}
            />
        }
    ]

    async function handleSaveData(){
        const dataMap = {
            home: homeViewFormData,
            about: aboutViewFormData,
            experience: experinceViewFormData,
            education: educationViewFormData,
            project: projectViewFormData,
        };

        const response = update 
        ? await updateData(currentSeletedTab,dataMap[currentSeletedTab]) 
        : await addData(currentSeletedTab,dataMap[currentSeletedTab]);
        console.log(response, "response");

        if (response && response.success) {
            resetFormDatas();
            extractAllDatas();
        }
        
    }

    useEffect(() => {
        extractAllDatas();
    },[currentSeletedTab]);

    async function extractAllDatas() {
        const response = await getData(currentSeletedTab);

        if (
            currentSeletedTab === "home" &&
            response &&
            response.data &&
            response.data.length
        ) {
            setHomeViewFormData(response && response.data[0]);
            setUpdate(true);
        }

        if (
            currentSeletedTab === "about" &&
            response &&
            response.data &&
            response.data.length
        ) {
            setAboutViewFormData(response && response.data[0]);
            setUpdate(true);
        }

        if (response?.success) {
            setAllData({
                ...allData,
                [currentSeletedTab]: response && response.data,
            });
        } 
    }


    function resetFormDatas(){
        setHomeViewFormData(initialHomeFormData);
        setAboutViewFormData(initialAboutFormData);
        setExperinceViewFormData(initialExperienceFormData);
        setEducationViewFormData(initialEducationFormData);
        setProjectViewFormData(initialProjectFormData);
    }

    async function handleLogin() {
        const res = await login(loginFormData);
        console.log(res, "login");

        if (res?.success) {
            setAuthUser(true);
            sessionStorage.setItem("authUser", JSON.stringify(true));
        }
    }

    useEffect(() => {
        setAuthUser(JSON.parse(sessionStorage.getItem("authUser")))
    },[]);

    if (!authUser)
        return (
            <Login             
            formData = {loginFormData}
            setFormData = {setLoginFormData}
            handleLogin={handleLogin}
            />
        );   

    return (
        <div className="border-b border-gray-400">
            <nav className="-mb-0.5 flex justify-center space-x-6" role="tablist">
              {menuItem.map((item) => (
                <button
                key={item.id}
                type="button"
                className="p-4 font-bold text-xl text-black"
                onClick={() => {
                    setCurrentSeletedTab(item.id);
                    resetFormDatas();
                    setUpdate(false);
                }}
                >
                    {item.lable}
                </button>
              ))} 

        <button
        onClick={() => {
            setAuthUser(false);
            sessionStorage.removeItem("authUser")
        }}
        className="p-4 font-bold text-xl text-black"
        >
            Logout
        </button> 

            </nav>
            <div className="mt-10 p-10">
    {
      menuItem.map(item => item.id === currentSeletedTab && item.component )  
    }
           </div>

        </div>
    )
}