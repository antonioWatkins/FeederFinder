import React from 'react';
import './Radio.css';
import { Link } from 'react-router-dom';

const STYLES = ['rad--primary', 'rad--outline', 'rad--test', 'rad--radio'];

const SIZES = ['rad--medium', 'rad--large', 'rad--report'];



export const Radio = ({
  children,
  type,
  onClick,
  radioStyle,
  radioSize
}) => {
  const checkRadioStyle = STYLES.includes(radioStyle)
    ? radioStyle
    : STYLES[0];

  const checkRadioSize = SIZES.includes(radioSize) ? radioSize : SIZES[0];



  return (
    <div className='rad-mobile'>
      <div
        className={`rad ${checkRadioStyle} ${checkRadioSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </div>
    </div>
  );
};