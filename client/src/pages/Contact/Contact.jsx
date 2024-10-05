import React, { useRef} from 'react'
import "./contact.scss"
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_o2fzm0r',
      'template_toiab49',
      form.current,
      'IVOut_aHp380MeAsT'
    )
    .then((result) => {
        console.log('Message sent successfully:', result.text);
        alert('Message sent successfully!');
    }, (error) => {
        console.log('An error occurred:', error.text);
        alert('Failed to send the message, please try again later.');
    });
  };
  return (
    <div className="contact-form"  id="contact">
    <h1>Have Question In Mind?</h1>
    <h2>Let Us Help You</h2>
    <form ref={form} onSubmit={sendEmail}>
      <input
      name='email'
        type="email"
        placeholder="your email@gmail.com"
        required
      />
      <button type="submit">Send</button>
    </form>
  </div>
  
  )
}

export default Contact
