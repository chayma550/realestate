import React from 'react';
import "./popular.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faExpand, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Popular = () => {
    const properties = [
        {
            id: 1,
            type: 'VILLAS - Brooklyn',
            status: 'Sell',
            name: 'South Sun House',
            description: 'Lorem ipsum dolor sit amet, wisi nemore fastidii at vis, eos equidem admodum',
            price: '265,000$',
            area: '290m²',
            beds: 4,
            baths: 3,
            image: 'https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/main-home-property-460x300.jpg'
        },
        {
            id: 2,
            type: 'VILLAS - Brooklyn',
            status: 'For Rent',
            name: 'Mountain Cabin',
            description: 'Lorem ipsum dolor sit amet, wisi nemore fastidii at vis, eos equidem admodum',
            price: '89,000$',
            area: '125m²',
            beds: 2,
            baths: 2,
            image: 'https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/list-half-map-image-3-460x300.jpg'
        },
        {
            id: 3,
            type: 'CONDOS - Staten Island',
            status: 'For Rent',
            name: 'Pine Forest Bungalow',
            description: 'Lorem ipsum dolor sit amet, wisi nemore fastidii at vis, eos equidem admodum',
            price: '1,200$',
            area: '160m²',
            beds: 4,
            baths: 2,
            image: "https://newhome.qodeinteractive.com/wp-content/uploads/2023/03/list-half-map-image-3-460x300.jpg"
        }
    ];

    return (
        <div className='popular'>
            <div className="title-container">
            <div className="underline"></div>
                <h2>Our choice of popular <b>Real Estate</b></h2>
                

            </div>

            <div className="propertiesContainer">
                {properties.map((property, index) => (
                    <div className="property-card" key={index}>
                        <div className="property-image-container">
                            <img src={property.image} alt={property.name} className="property-image" />
                            <span className="property-status">{property.status}</span>
                        </div>
                        <div className="property-details">
                            <div className="detail">
                                <FontAwesomeIcon icon={faLocationDot} className='icon' />
                                <span className="property-type">{property.type}</span>
                            </div>
                            <h2>{property.name}</h2>
                            <p>{property.description}</p>
                            <div className="property-info">
                                <span className="property-price">{property.price}</span>
                                <div className="detail">
                                    <FontAwesomeIcon icon={faExpand} />
                                    <span className="property-area">{property.area}</span>
                                </div>
                                <div className="detail">
                                    <FontAwesomeIcon icon={faBed} />
                                    <span className="property-beds"> {property.beds} </span>
                                </div>
                                <div className="detail">
                                    <FontAwesomeIcon icon={faBath} />
                                    <span className="property-baths">{property.baths} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <section className="bg_parallax_scroll" >
        <div className="details">
          <h1>Modern House Make Better Life</h1>
        </div>
      </section>
        </div>
    );
};

export default Popular;
