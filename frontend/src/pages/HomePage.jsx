import React from 'react'
import useState from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import HeroSection from '../components/HeroSection'
import Cards from '../components/Cards'


function HomePage() {

  return (
<>
  <HeroSection />
  <Cards />
</>
  )
}

export default HomePage
