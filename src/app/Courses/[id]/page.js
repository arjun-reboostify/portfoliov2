'use client';

import { useEffect, useState } from 'react';
import { getData } from '@/services';

export default function BlogPage({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const response = await getData("Courses");
        if (response?.success) {
          // Find the blog post that matches the name in the URL
          const foundBlog = response.data.find(
            (item) => encodeURIComponent(item.title) === params.id
          );
          
          if (foundBlog) {
            setBlog(foundBlog);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      }
    }

    fetchBlogData();
  }, [params.id]);

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  if (!blog) {
    return <div className="p-5">Blog post not found</div>;
  }

  return (
    <div className=" w-screen h-screen p-5 max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">{blog.name}</h1>
      <h1 className="text-3xl font-bold mb-4">{blog.name}</h1>
      {blog.img && (
                    <div className="mb-6">
                      <img 
                        src={blog.img} 
                        alt={`Featured image for ${blog.img}`}
                        className="w-full rounded-lg object-cover max-h-96"
                      />
                    </div>
                  )}
      <div className="text-gray-600 mb-2">Author: {blog.email}</div>
      <div className="border-t border-gray-200 pt-4 mt-4">
        <p className="whitespace-pre-wrap">{blog.message}</p>
      </div>
    </div>
  );
}