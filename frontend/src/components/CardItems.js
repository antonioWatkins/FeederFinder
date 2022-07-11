import React from 'react'
//import { Link } from 'react-router-dom'

function CardItems(props) {
  return (
  <>
    <li className='cards__item'>
      <a className='cards__item__link' href={props.path}>
        <figure className='cards__item__pic-wrap' data-category={props.label}>
          <img src={props.src} alt="time"
          className='cards__item_img'/>
        </figure>
<div className='cards__item_Info'/>
    <h5 className='cards_item_text'>{props.text}</h5>
      </a>
    </li>
  </>
  )
}

export default CardItems
