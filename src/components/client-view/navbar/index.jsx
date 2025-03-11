'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../assets/logo.png";
import { Link as LinkScroll, scroller } from "react-scroll";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
    {
        id: "home",
        label: "Home"
    },
    {
        id: "about",
        label: "About"
    },
    {
        id: "experience",
        label: "Experience"
    },
    {
        id: "project",
        label: "Project"
    },
    {
        id: "contact",
        label: "Contact"
    },
];

function CreateMenus({ activeLink, getMenuItems, setActiveLink, router, pathname }) {
    return getMenuItems.map((item) => (
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
            className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative ${
                activeLink === item.id 
                ? "text-green-main animation-active shadow-green-main"
                : "text-[#000] font-bold hover:text-green-main"
            }`}
        >
            {item.label}
        </LinkScroll>
    ))
}

export default function Navbar() {
    const [activeLink, setActiveLink] = useState("home");
    const [scrollActive, setScrollActive] = useState(false);
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
            <header className={`fixed top-0 w-full z-30 bg-white-500 transition-all ${scrollActive ? "shadow-md pt-0" : "pt-4"}`}>
                <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
                    <div className="col-start-1 col-end-2 flex items-center">
                        <Image
                            src={logo}
                            alt="Logo"
                            layout="responsive"
                            quality={100}
                            height={100}
                            width={120}
                        />
                    </div> 
                    <ul className="hidden lg:flex col-start-4 col-end-8 text-[#000] items-center">
                        <CreateMenus
                            setActiveLink={setActiveLink}
                            activeLink={activeLink}
                            getMenuItems={menuItems}
                            router={router}
                            pathname={pathname}
                        /> 
                    </ul>
                    <div className="col-start-10 col-end-12 flex justify-end">
                        <button
                            onClick={() => (window.location.href = "/blogs")} 
                            className="py-2 px-5 border-2 border-green-600 text-green-600 font-semibold rounded-full text-xl hover:bg-gray-200 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out"
                        >
                            Blogs
                        </button>
                    </div> 
                </nav> 
            </header>

            <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t">
                <div className="bg-white-500 sm:px-3">
                    <ul className="overflow-x-auto flex w-full justify-between items-center text-[#000]">
                        <CreateMenus
                            setActiveLink={setActiveLink}
                            activeLink={activeLink}
                            getMenuItems={menuItems}
                            router={router}
                            pathname={pathname}
                        /> 
                    </ul>
                </div>
            </nav>
        </>
    );
}