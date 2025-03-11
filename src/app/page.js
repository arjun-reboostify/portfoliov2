import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";
import Image from "next/image";

async function extractAllDatas(currentSection) {
  const urls = [
    `http://localhost:3000/api/${currentSection}/get`,  // Replace with actual URL
    `https://portfoliov2-five-iota.vercel.app//api/${currentSection}/get`  // Replace with actual URL
  ];

  try {
    const results = await Promise.allSettled(
      urls.map(async (url) => {
        const res = await fetch(url, { method: "GET", cache: "no-store" });
        return res.ok ? res.json() : Promise.reject(`Failed to fetch from ${url}`);
      })
    );

    // Extract successful responses only
    const data = results
      .filter(result => result.status === "fulfilled") // Keep only successful requests
      .map(result => result.value.data) // Extract data field, adjust as per API response structure
      .flat();

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
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