import { useState } from 'react'

import './App.css'
import MovieSearch from './MovieSearch'
import WeatherDashboard from './WeatherDashboard'
import Pokiemon from './Pokiemon'
import CatGallery from './CatGallery'

function App() {

  return (
    <>
    <MovieSearch/>
    <WeatherDashboard/>
    <Pokiemon/>
    <CatGallery/>
    </>
  )
}

export default App
