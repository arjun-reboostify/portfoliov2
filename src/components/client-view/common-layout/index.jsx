'use client'
import { useParams, usePathname } from "next/navigation"
import Navbar from "../navbar";

export default function CommonLayout({children}) {
    const pathName = usePathname();
    return (
        <>
    {pathName !== "/admin" ? <Navbar/> : null }
    {children}
        </>
    )
}