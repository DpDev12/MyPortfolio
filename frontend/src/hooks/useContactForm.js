
import { useForm } from '@inertiajs/react';
import { useState } from 'react';


export default function useContactForm() {
  const [statusMessage, setStatusMessage] = useState('');

  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    email: '',
    project: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    post('/api/submit-message', {
        preserveScroll:true,
      onSuccess: () => {
        setStatusMessage('Message sent successfully!');
        reset();

        window.history.replaceState(null, null, '#contact');
        const contactSection = document.getElementById('contact');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
      },
      onError: (errors) => {
        console.error(errors);
        setStatusMessage(
          'Failed to send message: ' +
            (errors.message || Object.values(errors).flat().join(', '))
        );
      },
    });
  };

  

  return {
    data,
    setData,
    handleInputChange,
    handleSubmit,
    processing,
    statusMessage,
    errors
  };
}
