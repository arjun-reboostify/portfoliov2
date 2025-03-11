import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";
import Image from "next/image";

async function extractAllDatas(currentSection) {
  // First option URL
  const url1 = `http://localhost:3000/api/${currentSection}/get`;
  // Second option URL
  const url2 = `https://portfoliov2-five-iota.vercel.app/api/${currentSection}/get`;
  
  // Try the first URL
  try {
    const res = await fetch(url1, {
      method: "GET",
      cache: "no-store"
    });
    
    if (res.ok) {
      const data = await res.json();
      return data && data.data;
    }
  } catch (error) {
    console.log(`First URL failed: ${error.message}`);
  }
  
  // If first URL fails, try the second URL
  try {
    const res = await fetch(url2, {
      method: "GET",
      cache: "no-store"
    });
    
    if (res.ok) {
      const data = await res.json();
      return data && data.data;
    }
  } catch (error) {
    console.log(`Second URL failed: ${error.message}`);
  }
  
  // If both URLs fail, return null or throw an error
  throw new Error("All endpoints failed to respond");
}

export default async function Home() {

  const homeSectionData = await extractAllDatas("home");
  const aboutSectionData = await extractAllDatas("about");
  const experienceSectionData = await extractAllDatas("experience");
  const educationSectionData = await extractAllDatas("education");
  const projectSectionData = await extractAllDatas("project");

  return (
    <div>
      <ClientHomeView data={homeSectionData} />
      <ClientAboutView data={ 
        aboutSectionData && aboutSectionData.length ? aboutSectionData[0] : []
      } />
      <ClientExperienceAndEducationView  educationData={educationSectionData} experienceData={experienceSectionData}  />
      <ClientProjectView data={projectSectionData} />
      <ClientContactView/>
    </div>
  );
}