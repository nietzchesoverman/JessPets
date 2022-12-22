import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {BsBagCheckFill} from 'react-icons/bs';
import { useStateContext } from '../context/StateContext';
import { runConf } from '../lib/utils';

const success = () => {

  const {setcartItems, settotalPrice, settotalQuantities} = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setcartItems([]);
    settotalPrice(0);
    settotalQuantities(0);
    runConf();
  }, [])

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your purchase!</h2>
            <p className='email-msg'>Check you email inbox for the receipt.</p>
            <p className='description'> If you have any questions please email <a className='email' href="mailto:xxxx@hotmail.com">xxxx@hotmail.com</a></p>
            <Link href='/'>
                <button type='button' className='btn' width='300px'>Continue Shopping</button>
            </Link>
        </div>
    </div>
  )
}

export default success