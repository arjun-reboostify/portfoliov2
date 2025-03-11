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
  { id: "facebook", icon: <FaFacebookF color="rgba(13, 183, 96, 1)" className="w-6 h-6 md:w-8 md:h-8" /> },
  { id: "twitter", icon: <FaTwitter color="rgba(13, 183, 96, 1)" className="w-6 h-6 md:w-8 md:h-8" /> },
  { id: "linkedin", icon: <FaLinkedinIn color="rgba(13, 183, 96, 1)" className="w-6 h-6 md:w-8 md:h-8" /> },
  { id: "instagram", icon: <FaInstagram color="rgba(13, 183, 96, 1)" className="w-6 h-6 md:w-8 md:h-8" /> }
];

export default function ClientHomeView({ data }) {
  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12" id="home">
         <div className="h-[6vh] w-full bg-transparent  flex items-center justify-center">
      
    </div>
      <AnimationWrapper>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center" variants={setVariants}>
          {/* Content */}
          <div className="flex flex-col justify-center order-2 sm:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {data && data.length 
                ? data[0]?.heading.split(" ").map((item, index) => (
                    <span key={index} className={`${index === 2 || index === 3 ? "text-green-main" : "text-gray-800"}`}>
                      {item}{" "}
                    </span>
                  )) 
                : null
              }
            </h1>
            <p className="text-gray-700 text-base md:text-lg mb-6">
              {data && data.length ? data[0]?.summary : null}
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialIcons.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100, duration: 1.5 }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9, rotate: -360, borderRadius: "100%" }}
                  className="cursor-pointer p-2 bg-white rounded-full shadow-md hover:shadow-lg"
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Image */}
          <motion.div ref={containerRef} className="flex justify-center order-1 sm:order-2 mb-6 sm:mb-0">
            <motion.div
              drag
              dragConstraints={containerRef}
              className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-green-main rounded-lg shadow-xl"
            >
              <div className="absolute w-full h-full top-2 -left-2 rounded-lg border-4 border-gray-800"></div>
              <Image
                src={home}
                alt="home image"
                fill
                quality={90}
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
                className="object-cover rounded-lg absolute -top-1"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimationWrapper>
    </section>
  );
}