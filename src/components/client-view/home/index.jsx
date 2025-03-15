'use client'

import { useMemo, useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa"
import Image from "next/image";
import home from "../../../assets/home.png"

const variants = () => ({
  offscreen: { y: 150, opacity: 0 },
  onscreen: ({ duration = 2 } = {}) => ({
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration }
  })
});

const socialIcons = [
  { 
    id: "facebook", 
    icon: <FaFacebookF color="blue" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    href: "https://facebook.com",
    label: "Facebook"
  },
  { 
    id: "twitter", 
    icon: <FaTwitter color="black" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    href: "https://twitter.com",
    label: "Twitter"
  },
  { 
    id: "linkedin", 
    icon: <FaLinkedinIn className=" text-blue-700 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    href: "https://linkedin.com",
    label: "LinkedIn"
  },
  { 
    id: "instagram", 
    icon: <FaInstagram className="text-pink-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    href: "https://instagram.com",
    label: "Instagram"
  }
];

export default function ClientHomeView({ data }) {
  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12" id="home">
         <div className="h-[6vh] w-full bg-transparent flex items-center justify-center">
      
    </div>
      <AnimationWrapper>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center" variants={setVariants}>
          {/* Content */}
          <div className="flex flex-col justify-center order-2 sm:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {data && data.length 
                ? data[0]?.heading.split(" ").map((item, index) => (
                    <span key={index} className={`${index === 1 || index === 3 ? "text-green-main" : "text-gray-200"}`}>
                      {item}{" "}
                    </span>
                  )) 
                : null
              }
            </h1>
            <p className="text-[#ffffff] text-base md:text-lg mb-8">
              {data && data.length ? data[0]?.summary : null}
            </p>
            
            {/* Social Icons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
            <p className="text-gray-700 text-sm sm:text-base font-medium">Follow me on social media to stay connected!</p>
              {socialIcons.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100, duration: 1.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 cursor-pointer px-3 py-2 sm:px-4 sm:py-3 bg-white rounded-lg border-2 border-blue-400 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-blue-400 underline font-medium text-sm sm:text-base hidden sm:inline">
                      {item.label}
                    </span>
                  </motion.div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Image */}
          <motion.div 
  ref={containerRef} 
  className="flex justify-center mb-6 sm:mb-0" 
  initial={{ opacity: 0 }} 
  animate={{ opacity: 1 }} 
  transition={{ duration: 0.5 }}
>
  <motion.div 
    drag 
    dragConstraints={containerRef} 
    className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full shadow-xl overflow-hidden transition-all duration-300 hover:scale-105"
    style={{ 
      background: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
      border: "10px solid #22c55e", // Green border
    }}
    whileHover={{ 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
    }}
    whileTap={{ scale: 0.98 }}
  >
    {/* Remove this div as we're adding the border directly to the main element */}
    {/* <div className="absolute w-full h-full top-2 -left-2 rounded-full border-4 border-gray-800 z-0"></div> */}
    
    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-500/50 z-10 transition-opacity duration-300 hover:opacity-0"></div>
    
    <motion.div 
      className="absolute inset-0 z-20" 
      initial={{ scale: 1.2, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Image 
        src={home} 
        alt="home image" 
        fill 
        quality={90} 
        sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px" 
        className="object-cover absolute -top-1" 
      />
    </motion.div>
  </motion.div>
</motion.div>
        </motion.div>
      </AnimationWrapper>
    </section>
  );
}