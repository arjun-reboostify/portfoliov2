"use client";

import AdminBlogsView from "@/components/client-view/Courses";
import { getData } from "@/services";
import { useEffect, useState } from "react";

export default function AdminView() {
  const [BlogsData, setBlogsData] = useState([]);

  async function extractBlogsData() {
    try {
      const response = await getData("Courses"); // Fetch only Blogs data
      if (response?.success) {
        setBlogsData(response.data || []);
      } else {
        console.error("Unsuccessful response:", response);
      }
    } catch (error) {
      console.error("Error fetching Blogs data:", error);
    }
  }

  useEffect(() => {
    extractBlogsData();
  }, []);

  return (
    <div className=" border-b border-gray-400 ">
      <div className="mt-10 p-10">
        <AdminBlogsView data={BlogsData} />
      </div>
    </div>
  );
}
