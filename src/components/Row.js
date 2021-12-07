import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import axios from '../api/axios'
import '../assets/css/Row.css'
import MovieModal from './MovieModal'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { MovieController } from '../api/controllers'
import { Card, CardContent } from '@material-ui/core'

const Row = ({ title, fetchUrl, isLargeRow, theme, id }) => {
  const [movies, setMovies] = useState([])
  const [modalVisibility, setModalVisibility] = useState(false)
  const [movieSelected, setMovieSelection] = useState({})

  //A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    //if [], run once when the row loads, and dont run again

    async function fetchData() {
      //Dont move until we get the api answer
      let request
      if (id === 'Search') {
        request = await new MovieController().getSearchMovie(theme)
      } else {
        request = await new MovieController().getGroupMovie(theme)
      }
      setMovies(request.data)
      return request
    }

    fetchData()
  }, [fetchUrl, theme, id])

  const handleClick = (movie) => {
    setModalVisibility(true)
    setMovieSelection(movie)
  }
  return (
    <section className='row'>
      {/** TITLE */}
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span
            className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80
            }}>
            <ArrowBackIosIcon />
          </span>
        </div>
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <Card
              key={movie.title}
              onClick={() => handleClick(movie)}
              style={{ backgroundColor: '#2d2c2c', color: 'white' }}
              className={`row__poster ${isLargeRow && 'row__posterLarge'}`}>
              <CardContent>{movie.title}</CardContent>
            </Card>
          ))}
        </div>
        <div className='slider__arrow-right'>
          <span
            className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80
            }}>
            <ArrowForwardIosIcon />
          </span>
        </div>
      </div>
      {modalVisibility && (
        <MovieModal
          {...movieSelected}
          setModalVisibility={setModalVisibility}
        />
      )}
    </section>
  )
}

export default Row
