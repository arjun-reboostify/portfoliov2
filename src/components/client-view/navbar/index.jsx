'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../assets/logo.png";
import { Link as LinkScroll, scroller } from "react-scroll";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { Home, User, Briefcase, FolderDot, Mail, BookOpen,ChartLine ,NotebookPen} from "lucide-react";

const menuItems = [
    {
        id: "home",
        label: "Home",
        icon: Home
    },
    {
        id: "about",
        label: "About",
        icon: User
    },
    {
        id: "experience",
        label: "Experience",
        icon: Briefcase
    },
    {
        id: "project",
        label: "Project",
        icon: FolderDot
    },
    {
        id: "contact",
        label: "Contact",
        icon: Mail
    },
    {
        id: "stats",
        label: "Stats",
        icon: ChartLine
    },
    {
        id: "courses",
        label: "courses",
        icon: NotebookPen
    },
];

function CreateMenus({ activeLink, getMenuItems, setActiveLink, router, pathname, isMobile }) {
    return getMenuItems.map((item) => {
        const Icon = item.icon;
        
        return (
            <LinkScroll
                key={item.id}
                activeClass="active"
                to={item.id}
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => setActiveLink(item.id)}
                onClick={() => {
                    // Redirect to /home if not already there
                    if (pathname !== "/") {
                        router.push("/");
                    }
                }}
                className={`px-2 py-2 sm:px-3 md:px-4 mx-1 sm:mx-2 cursor-pointer animation-hover inline-block relative text-[#ffffff] text-sm sm:text-base ${
                    isMobile ? "flex-1 text-center flex flex-col items-center justify-center" : "flex items-center"
                } ${
                    activeLink === item.id 
                    ? "text-green-main animation-active font-bold " + (isMobile ? "border-t-2 border-green-main" : "shadow-green-main")
                    : "text-[#fff] font-medium hover:text-green-main"
                }`}
            >
                <Icon className={`${isMobile ? "mb-1 h-5 w-5" : "mr-2 h-5 w-5"}`} />
             
            </LinkScroll>
        );
    });
}

export default function Navbar() {
    const [activeLink, setActiveLink] = useState("home");
    const [scrollActive, setScrollActive] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScrollActive(window.scrollY > 20);
        });
        
        return () => {
            window.removeEventListener("scroll", () => {
                setScrollActive(window.scrollY > 20);
            });
        };
    }, []);

    return (
        <>
            <header className={` fixed top-0 w-full z-30 bg-[#000] transition-all ${scrollActive ? "shadow-md pt-0" : "pt-2 sm:pt-4"}`}>
                <nav className="bg-[#000]max-w-screen-xl px-4 sm:px-6 lg:px-16 mx-auto grid grid-flow-col py-2 sm:py-3">
                    <div className="col-start-1 col-end-2 flex items-center">
                        <Image
                            src={logo}
                            alt="Logo"
                            layout="intrinsic"
                            quality={100}
                            width={100}
                            height={80}
                            className="w-16 sm:w-20 md:w-24 lg:w-28 object-contain"
                        />
                    </div>
                    
                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex col-start-4 col-end-8 text-[#ffffff] items-center">
                        <CreateMenus
                            setActiveLink={setActiveLink}
                            activeLink={activeLink}
                            getMenuItems={menuItems}
                            router={router}
                            pathname={pathname}
                            isMobile={false}
                        /> 
                    </ul>
                    
                    {/* Desktop Blog Button */}
                    <div className="hidden lg:flex col-start-10 col-end-12 justify-end items-center">
                        <button
                            onClick={() => (window.location.href = "/Courses")} 
                            className="py-1.5 px-4 border-2 border-green-600 text-green-600 font-semibold rounded-full text-base hover:bg-green-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out flex items-center"
                        >
                            <BookOpen className="mr-2 h-5 w-5" />
                        Blogs
                        </button>
                    </div>
                    
                    {/* Mobile Menu Toggle Button */}
                    <div className="lg:hidden col-start-10 col-end-12 flex justify-end items-center">
                        <button
                            onClick={() => (window.location.href = "/Courses")} 
                            className="py-1 px-3 mr-3 border-2 border-green-600 text-green-600 font-semibold rounded-full text-sm hover:bg-green-600 hover:text-white transition-all duration-300 ease-in-out flex items-center"
                        >
                            <BookOpen className="mr-1 h-4 w-4" />
                          Blogs
                        </button>
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            {mobileMenuOpen ? 
                                <FaTimes className="h-6 w-6 text-green-600" /> : 
                                <FaBars className="h-6 w-6 text-green-600" />
                            }
                        </button>
                    </div>
                </nav>
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-[#000] px-4 py-3 shadow-lg">
                  
                        <ul className="flex flex-col space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                
                                return (
                                    <LinkScroll
                                        key={item.id}
                                        activeClass="active"
                                        to={item.id}
                                        spy={true}
                                        smooth={true}
                                        duration={1000}
                                        onSetActive={() => setActiveLink(item.id)}
                                        onClick={() => {
                                            if (pathname !== "/") {
                                                router.push("/");
                                            }
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`px-3 py-2 block w-full text-[#ffffff] rounded flex items-center ${
                                            activeLink === item.id 
                                            ? "text-[#ffffff] bg-green-600 font-bold"
                                            : "text-[#fff]  hover:text-green-600"
                                        }`}
                                    >
                                        <Icon className="mr-3 h-5 w-5" />
                                        {item.label}
                                    </LinkScroll>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </header>
            {!mobileMenuOpen && (
                <nav className="fixed bg-[#000] lg:hidden bottom-0 left-0 right-0 z-20 shadow-t bg-white border-t border-gray-200">
                    
                    <div className="">
                        <ul className="flex w-full justify-between items-center text-[#fff]">
                            <CreateMenus
                                setActiveLink={setActiveLink}
                                activeLink={activeLink}
                                getMenuItems={menuItems}
                                router={router}
                                pathname={pathname}
                                isMobile={true}
                            /> 
                        </ul>
                    </div>
                </nav>
            )}
        </>
    );
}