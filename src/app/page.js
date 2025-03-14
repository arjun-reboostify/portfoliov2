import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";
import Stats from "@/components/client-view/stats";
import Courses from "@/components/client-view/Courses"
import Image from "next/image";

async function extractAllDatas(currentSection) {
  const res = await fetch(`https://arjundubey.vercel.app/api/${currentSection}/get`,{
    method: "GET",
    cache: "no-store"
  });
  const data = await res.json();
  return data && data.data;
}

export default async function Home() {

  const homeSectionData = await extractAllDatas("home");
  const aboutSectionData = await extractAllDatas("about");
  const experienceSectionData = await extractAllDatas("experience");
  const educationSectionData = await extractAllDatas("education");
  const projectSectionData = await extractAllDatas("project");
 const stats = await extractAllDatas("stats");
 const courses = await extractAllDatas("Courses");
  return (
    <div>
      <ClientHomeView data={homeSectionData} />
      <ClientAboutView data={ 
        aboutSectionData && aboutSectionData.length ? aboutSectionData[0] : []
      } />
      <ClientExperienceAndEducationView  educationData={educationSectionData} experienceData={experienceSectionData}  />
      <ClientProjectView data={projectSectionData} />
      <ClientContactView/>
      <Stats data={stats}/>
      <Courses data={courses}/>
      <div class="h-[10vh] w-full bg-transparent"></div>
    </div>
  );
}