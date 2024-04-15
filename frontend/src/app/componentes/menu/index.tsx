'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import './style.css';
import { LuLayoutPanelLeft } from 'react-icons/lu';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';
import { FaRegCalendar } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';

export default function Menu({ expand }) {
  const [activeLink, setActiveLink] = useState('/inicial'); // State to track active link

  const handleClick = (href) => {
    setActiveLink(href); // Update active link on click
  };

  return (
    <div className={`menu ${expand ? 'expanded' : ''}`}>
      <Link href="/inicial" onClick={() => handleClick('/inicial')}>
        <LuLayoutPanelLeft className={`icon ${activeLink === '/inicial' ? 'active' : ''}`} />
      </Link>
      <Link href="/chat" onClick={() => handleClick('/chat')}>
        <BiSolidMessageSquareDetail className={`icon ${activeLink === '/chat' ? 'active' : ''}`} />
      </Link>
      <Link href="/calendario" onClick={() => handleClick('/calendario')}>
        <FaRegCalendar className={`icon ${activeLink === '/calendario' ? 'active' : ''}`} />
      </Link>
      <Link href="/referencias" onClick={() => handleClick('/referencias')}>
        <IoIosPaper className={`icon ${activeLink === '/referencias' ? 'active' : ''}`} />
      </Link>
    </div>
  );
}

