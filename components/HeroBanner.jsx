import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const HeroBanner = ({heroBanner}) => {
  return (
    <div className="hero-banner-container">
        <p className='beats-solo'>{heroBanner.smallText}</p>
        <h1>{heroBanner.largeText1}</h1>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText2}</h1>
        <img src={urlFor(heroBanner.image)} alt="sumn" className='hero-banner-image'/>

        <div>
          <Link href={`/product/${heroBanner.desc}`}>
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
          <div className='desc'>
            <h5>{heroBanner.product}</h5>
            <p>{/*heroBanner.desc*/}</p>
          </div>
        </div>
    </div>
  )
}

export default HeroBanner