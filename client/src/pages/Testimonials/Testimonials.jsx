import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './testimonials.scss';

const testimonials = [
  {
    name: "Aida Rutta",
    role: "Home Inspector",
    text: "Ut vix primis tractatos. Ad est alterum epicuri accusamus. Duo per id his qualisque deseruisse reformidans ex, quo omnesque cotidieque. Dolor voluptua per, his in congue.",
    image: "https://www.francaisauthentique.com/wp-content/uploads/2023/09/decrire-une-personne-en-francais.jpg" // Replace with actual image path
  },
  {
    name: "Ron Bradley",
    role: "Agent",
    text: "Ut vix primis tractatos. Ad est alterum epicuri accusamus. Duo per id his qualisque deseruisse reformidans ex, quo omnesque cotidieque. Dolor voluptua per, his in congue.",
    image: "https://img.freepik.com/psd-gratuit/personne-celebrant-son-orientation-sexuelle_23-2150115662.jpg" // Replace with actual image path
  },
  {
    name: "Jeanis Green",
    role: "Sales Advisor",
    text: "Ut vix primis tractatos. Ad est alterum epicuri accusamus. Duo per id his qualisque deseruisse reformidans ex, quo omnesque cotidieque. Dolor voluptua per, his in congue.",
    image: "https://media.istockphoto.com/id/1386479313/fr/photo/heureuse-femme-daffaires-afro-am%C3%A9ricaine-mill%C3%A9naire-posant-isol%C3%A9e-sur-du-blanc.jpg?s=612x612&w=0&k=20&c=CS0xj40eNCorQyzN1ImeMKlvPDocPHSaMsXethQ-Q_g=" // Replace with actual image path
  },
  {
    name: "Joel Pearson",
    role: "Manager",
    text: "Ut vix primis tractatos. Ad est alterum epicuri accusamus. Duo per id his qualisque deseruisse reformidans ex, quo omnesque cotidieque. Dolor voluptua per, his in congue.",
    image: "https://www.le7.info/media/cache/article/uploads/photos/64101bd1e383a.jpeg" // Replace with actual image path
  }
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  return (
    <div className="testimonials" id='testimonials'>
      <div className="title-container">
            <div className="underline"></div>
                <h2>See what others said about us</h2>
            </div>
      
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div className="testimonial" key={index}>
            <img src={testimonial.image} alt={testimonial.name} />
            <h3>{testimonial.name} <span>{testimonial.role}</span></h3>
            <p>{testimonial.text}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
