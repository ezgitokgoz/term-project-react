"use client"
import React, { useState } from 'react';

type Inputs = {
    name: string;
    emailU: string;
    message: string;
  };


const ContactPage = () => { 

  // İletişim formu state'i
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    emailU: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form alanlarının değişikliklerini izle
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // Form gönderildiğinde
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Formu sunucuya gönder
    console.log(inputs);
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const result = await response.json();
      console.log(result);

      setInputs({ name: '', emailU: '', message: '' });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
    
  };

  return (
<div className='bg-orange-100 gap-10 w-1/3 mx-auto my-10 p-10 flex justify-center items-center '>

  <form onSubmit={handleSubmit} className='w-full' action="/api/contact" method="POST">
  <h2 className='text-2xl font-bold mb-6'>CONTACT  </h2>
    <div className='mb-4'>
      <label className='block text-sm  mb-2' htmlFor="name">
        Name:
      </label>
      <input
        className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
        type="text"
        name="name"
        id="name"
        value={inputs.name}
        onChange={handleChange}
      />
    </div>
    <div className='mb-4'>
      <label className='block text-sm  mb-2' htmlFor="email">
        E-mail:
      </label>
      <input
        className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
        type="email"
        name="emailU"
        id="email"
        value={inputs.emailU}
        onChange={handleChange}
      />
    </div>
    <div className='mb-6'>
      <label className='block text-sm  mb-2' htmlFor="message">
        Message:
      </label>
      <textarea
        className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
        name="message"
        id="message"
        value={inputs.message}
        onChange={handleChange}
      />
    </div>
    <button
      type="submit"
      className='w-full bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
    >
       {isSubmitting ? 'Sending...' : 'SEND'}
    </button>
    {error && <p className="text-red-500 mt-4">{error}</p>}
  </form>
</div>

  );
};

export default ContactPage;
