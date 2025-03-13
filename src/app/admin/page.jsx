'use client'
import AdminAboutView from "@/components/admin-view/about"
import Stats from "@/components/admin-view/stats"
import AdminContactView from "@/components/admin-view/contact"
import AdminCoursesView from "@/components/admin-view/Courses"
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
    const [dataLoaded, setDataLoaded] = useState(false);

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
            id: 'Courses',
            lable: 'Courses',
            component: <AdminCoursesView
            data={allData?.Courses} // Changed from courses to Courses to match collection name
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
        ? await updateData(currentSeletedTab, dataMap[currentSeletedTab]) 
        : await addData(currentSeletedTab, dataMap[currentSeletedTab]);
        console.log(response, "response");

        if (response && response.success) {
            resetFormDatas();
            extractAllDatas();
        }
    }

    // Load all data on initial load
    useEffect(() => {
        if (!dataLoaded) {
            loadAllCollections();
            setDataLoaded(true);
        }
    }, [dataLoaded]);

    // Load specific collection data when tab changes
    useEffect(() => {
        extractAllDatas();
    }, [currentSeletedTab]);

    // Load all collections at once
    async function loadAllCollections() {
        console.log("Loading all collections...");
        const collections = [
            'home', 'about', 'experience', 
            'education', 'project', 'contact', 
            'Courses', 'stats'
        ];
        
        const newData = { ...allData };
        
        for (const collection of collections) {
            try {
                const response = await getData(collection);
                console.log(`Data for ${collection}:`, response);
                
                if (response?.success) {
                    newData[collection] = response.data;
                    
                    // Update form data if needed
                    if (collection === 'home' && response.data && response.data.length) {
                        setHomeViewFormData(response.data[0]);
                    }
                    if (collection === 'about' && response.data && response.data.length) {
                        setAboutViewFormData(response.data[0]);
                    }
                }
            } catch (error) {
                console.error(`Error loading ${collection}:`, error);
            }
        }
        
        setAllData(newData);
        console.log("All data loaded:", newData);
    }

    async function extractAllDatas() {
        try {
            console.log(`Fetching data for tab: ${currentSeletedTab}`);
            const response = await getData(currentSeletedTab);
            console.log(`Response for ${currentSeletedTab}:`, response);

            if (
                currentSeletedTab === "home" &&
                response?.data?.length
            ) {
                setHomeViewFormData(response.data[0]);
                setUpdate(true);
            }

            if (
                currentSeletedTab === "about" &&
                response?.data?.length
            ) {
                setAboutViewFormData(response.data[0]);
                setUpdate(true);
            }

            if (response?.success) {
                setAllData(prevData => ({
                    ...prevData,
                    [currentSeletedTab]: response.data,
                }));
            } 
        } catch (error) {
            console.error(`Error extracting data for ${currentSeletedTab}:`, error);
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
    }, []);

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
                {/* Debug info - remove in production */}
                <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <p className="font-semibold">Debug Info:</p>
                    <p>Current Tab: {currentSeletedTab}</p>
                    <p>Has {currentSeletedTab} data: {allData[currentSeletedTab] ? 'Yes' : 'No'}</p>
                    {allData[currentSeletedTab] && (
                        <p>Data Length: {Array.isArray(allData[currentSeletedTab]) ? allData[currentSeletedTab].length : 'Not an array'}</p>
                    )}
                    <pre className="mt-2 p-2 bg-gray-200 rounded overflow-auto max-h-40 text-xs">
                        {JSON.stringify(allData[currentSeletedTab], null, 2)}
                    </pre>
                </div>

                {menuItem.map(item => item.id === currentSeletedTab && item.component)}
            </div>
        </div>
    )
}