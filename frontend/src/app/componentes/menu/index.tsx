'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './style.css';
import { LuLayoutPanelLeft } from 'react-icons/lu';
import { FaCodePullRequest } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from 'react-icons/bi';
import { IoMdSettings, IoIosPaper } from "react-icons/io";
import { FaRegCalendar, FaUserCircle } from 'react-icons/fa';

export default function Menu({ active, currentRoute }) {
  const [activeLink, setActiveLink] = useState(active);

  useEffect(() => {
    setActiveLink(currentRoute);
  }, [currentRoute]);

  return (
    <div className={`menu`}>
      <div className='cont-icons'>
        <Link href="/perfil">
          <FaUserCircle className={`icon ${activeLink === '/perfil' ? 'active' : ''}`} />
        </Link>
        <Link href="/orientacao">
          <FaCodePullRequest className={`icon ${activeLink === '/orientacao' ? 'active' : ''}`} />
        </Link>
        <Link href="/inicial">
          <LuLayoutPanelLeft className={`icon ${activeLink === '/inicial' ? 'active' : ''}`} />
        </Link>
        <Link href="/chat">
          <BiSolidMessageSquareDetail className={`icon ${activeLink === '/chat' ? 'active' : ''}`} />
        </Link>
        <Link href="/calendario">
          <FaRegCalendar className={`icon ${activeLink === '/calendario' ? 'active' : ''}`} />
        </Link>
        <Link href="/referencias">
          <IoIosPaper className={`icon ${activeLink === '/referencias' ? 'active' : ''}`} />
        </Link>
      </div>
      <div>
        <Link href="/configuracao">
          <IoMdSettings className={`icon ${activeLink === '/configuracao' ? 'active' : ''}`} />
        </Link>
      </div>
    </div>
  );
}
