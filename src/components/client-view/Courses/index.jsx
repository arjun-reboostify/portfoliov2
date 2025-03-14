'use client';

import { useState, useEffect } from 'react';

export default function AdminBlogsView({ data }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [uniqueEmails, setUniqueEmails] = useState([]);
    
    // Extract unique email addresses for category filter
    useEffect(() => {
        if (data) {
            const emails = [...new Set(data.map(item => item.category))];
            setUniqueEmails(emails);
        }
    }, [data]);
    
    // Filter blogs based on search term and selected email
    const filteredBlogs = data?.filter(blog => 
        blog.category.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (selectedEmail === '' || blog.category === selectedEmail)
    );
    
    // Handle email selection
    const handleEmailSelect = (email) => {
        setSelectedEmail(email);
        setIsDropdownOpen(false);
    };
    
    // Clear all filters
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedEmail('');
    };
    
    return (
        <div className="flex flex-col gap-5" id="courses">
            {/* Filters Section */}
            <div className="mb-4 space-y-3">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search blogs by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                {/* Email Category Filter */}
                <div className="relative">
                    <div 
                        className="p-3 border rounded-lg flex justify-between items-center cursor-pointer bg-white"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className="truncate">
                            {selectedEmail ? selectedEmail : 'Filter by email category...'}
                        </span>
                        <svg 
                            className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute w-full mt-1 border rounded-lg bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                            <div 
                                className="p-3 hover:bg-gray-100 cursor-pointer border-b"
                                onClick={() => handleEmailSelect('')}
                            >
                                All emails
                            </div>
                            {uniqueEmails.map((email, index) => (
                                <div 
                                    key={index} 
                                    className="p-3 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleEmailSelect(email)}
                                >
                                    {email}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Clear Filters Button - Only show when filters are active */}
                {(searchTerm || selectedEmail) && (
                    <button 
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        onClick={clearFilters}
                    >
                        Clear all filters
                    </button>
                )}
            </div>
            
            {/* Blog List */}
            {filteredBlogs?.map((item) => (
                <a
                    key={item._id} 
                    href={`/Courses/${encodeURIComponent(item.title)}`}
                    className="p-5 border block hover:bg-gray-100 transition rounded-lg"
                >
                    {item.illustrationlink && (
                        <div className="mb-6">
                            <img 
                                src={item.img} 
                                alt={`Featured image for ${item.title}`}
                                className="w-full rounded-lg object-cover max-h-96"
                            />
                        </div>
                    )}
                    <p className="font-bold">{item.title}</p>
                    <p className="text-gray-600">{item.category}</p>
                    <p className="mt-2">
  {item.concept.length > 150 
    ? `${item.concept.substring(0, 150)}...` 
    : item.concept}
</p>
                </a>
            ))}

            {filteredBlogs?.length === 0 && (
                <p className="text-center py-10">No blog posts found matching your filters</p>
            )}
        </div>
    );
}