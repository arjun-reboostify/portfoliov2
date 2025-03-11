'use client';

export default function AdminBlogsView({ data }) {
    return (
        <div className="flex flex-col gap-5">
            {data?.map((item) => (
                <a
                    key={item._id} 
                    href={`/blogs/${encodeURIComponent(item.name)}`}
                    className="p-5 border block hover:bg-gray-100 transition"
                >{item.img && (
                    <div className="mb-6">
                      <img 
                        src={item.img} 
                        alt={`Featured image for ${item.img}`}
                        className="w-full rounded-lg object-cover max-h-96"
                      />
                    </div>
                  )}
                    <p className="font-bold">{item.name}</p>
                    <p className="text-gray-600">{item.email}</p>
                    <p className="line-clamp-2 mt-2">{item.message}</p> 
                </a>
            ))}

            {data?.length === 0 && (
                <p className="text-center py-10">No blog posts found</p>
            )}
        </div>
    );
}