import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import axios from '../api/axios'
import '../assets/css/Row.css'
import MovieModal from './MovieModal'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { MovieController } from '../api/controllers'
import { Card, CardContent } from '@material-ui/core'

const Row = ({ title, fetchUrl, isLargeRow, theme, id, data }) => {
  const [movies, setMovies] = useState([])
  const [modalVisibility, setModalVisibility] = useState(false)
  const [movieSelected, setMovieSelection] = useState({})

  //A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    //if [], run once when the row loads, and dont run again

    async function fetchData() {
      //Dont move until we get the api answer
      let request
      if (id === 'recommend movies') {
        request = await new MovieController().getMovieIds(data)
      } else if (id === 'Search') {
        request = await new MovieController().getSearchMovie(theme)
      } else {
        request = await new MovieController().getGroupMovie(theme)
      }
      // console.log('http://localhost:3000/home')
      setMovies(request.data)
      return request
    }

    fetchData()
  }, [fetchUrl, theme, id, data])

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
          {movies.map((movie, index) => (
            <Card
              key={movie.title + index}
              onClick={() => handleClick(movie)}
              style={{
                backgroundColor: '#2d2c2c',
                color: 'white',
                minWidth: 'calc(10% - 10px)',
                overflow: 'visible',
              }}
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
