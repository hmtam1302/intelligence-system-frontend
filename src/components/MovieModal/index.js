import React, { useState } from 'react'
import '../../assets/css/MovieModal.css'
import CancelIcon from '@material-ui/icons/Cancel'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalVisibility,
}) => {
  const [isHeart, setIsHeart] = useState(false)
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  }

  //Handle favorite
  const handleFavorite = state => {
    setIsHeart(state);
    //TODO: Display recommend system
  }

  return (
    <div className='presentation' role='presentation'>
      <div className='wrapper-modal'>
        <div className='modal'>
          <span
            onClick={() => setModalVisibility(false)}
            className='modal-close'>
            <CancelIcon />
          </span>

          <div className='modal__content'>
            <h2 className='modal__title'>{title ? title : name}</h2>
            <p className='modal__overview'>{overview}</p>
            <p className='modal__overview' style={{display:'flex'}}>
              Favorite:{'  '}
              {isHeart ? (
                <FavoriteIcon
                  fontSize='large'
                  onClick={() => handleFavorite(false)}
                />
              ) : (
                <FavoriteBorderIcon
                  fontSize='large'
                  onClick={() => handleFavorite(true)}
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
