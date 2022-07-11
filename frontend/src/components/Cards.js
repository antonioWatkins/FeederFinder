import React from 'react'
import CardItems from './CardItems'
import './Cards.css'


function Cards() {
  return (
    <div className='cards'>
      <h1>placeholder</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItems 
              src="/img/Kennen.png"
              text='Do you think you are a feeder? Train Here! with our Partners and get better!'
              label='The First Step'
              path='https://www.skill-capped.com/lol/pricing/plans'
            />
            <CardItems
              src='/img/calm.webp'
              text='If you are tilted take a break! Meditate.'
              label='The First Step'
              path='https://calm.com'
              />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
