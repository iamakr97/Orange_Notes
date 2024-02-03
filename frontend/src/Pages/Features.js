import React from 'react';
import './Features.css';
import { orangeNotesFeatures } from '../FeaturesData';
function Features() {
  return (
    <div className='feature-card-container'>
      {
        orangeNotesFeatures.map((featureCard, index) => {
          return <div className='featureCard' key={index}>
            <>{featureCard.icon}</>
            <p className='feature-desc'>
              {featureCard.desc}
            </p>
          </div>
        })
      }
    </div>
  );
}

export default Features;