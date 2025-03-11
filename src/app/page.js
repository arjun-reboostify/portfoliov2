import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";
import Image from "next/image";

async function extractAllDatas(currentSection) {
  const urls = [
    `http://localhost:3000/api/${currentSection}/get`,
    `https://portfoliov2-five-iota.vercel.app/api/${currentSection}/get`
  ];

  try {
    const results = await Promise.allSettled(
      urls.map(async (url) => {
        try {
          const res = await fetch(url, { method: "GET", cache: "no-store" });
          if (!res.ok) throw new Error(`Failed to fetch from ${url}`);
          return await res.json();
        } catch (error) {
          console.error(`Fetch error for ${url}:`, error);
          return null; // Ensure a consistent return type
        }
      })
    );

    // Extract successful responses only
    const data = results
    .filter(result => {
      return result.status === "fulfilled" && 
             result.value !== null && 
             result.value !== undefined && 
             result.value.data !== null && 
             result.value.data !== undefined;
    })
    .map(result => result.value.data)
    .flat();

    return data.length ? data : null;
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