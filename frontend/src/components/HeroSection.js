import React from 'react'
import { Button } from './Button'
import '../App.css'
import './HeroSection.css'

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-2.mp4' autoPlay loop muted />
      <h1> Feeder Finder</h1>
      <h3> Find the Feeder before they Ruin your game</h3>
      <div className='hero btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Find Them <i className='fa fa-search'/>
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          Dont become These guys!<i className='far fa-play-circle' />
        </Button>
      </div>

    </div>
  )
}

export default HeroSection
