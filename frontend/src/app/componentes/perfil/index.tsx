
import React, { useEffect, useState } from 'react';
import './style.css'

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const sEmail = localStorage.getItem('user_email');
    const sName = localStorage.getItem('user_name');
    setEmail(sEmail); 
    setNome(sName); 
  }, []);

  return (
    <div className='cont-perfil'>
      <span className='nome'><strong>{nome}</strong></span>
      <span className='email'>{email}</span>
    </div>
  );
}
