import React, { useState } from 'react'
import '../../assets/css/MovieModal.css'
import CancelIcon from '@material-ui/icons/Cancel'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { useSelector, useDispatch } from 'react-redux'
import { UserController } from '../../api/controllers';

const MovieModal = ({
  movieId,
  genres,
  title,
  overview,
  name,
  setModalVisibility,
}) => {
  //Redux
  const { username, userinfo } = useSelector(state => state);
  const dispatch = useDispatch();

  const [isHeart, setIsHeart] = useState(false);

  React.useEffect(() => {
    const listFavorites = userinfo && userinfo.favorite ? userinfo.favorite : [];
    // eslint-disable-next-line eqeqeq
    if (listFavorites.findIndex(ele => ele == movieId) != -1) {
      setIsHeart(true);
    } else {
      setIsHeart(false);
    }
  }, [movieId, userinfo])
  // eslint-disable-next-line no-unused-vars
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  }

  //Handle favorite
  const handleFavorite = async state => {
    setIsHeart(state);
    //Remove favorite
    const favorite = userinfo.favorite;
    let changes = {};
    if (state) {
      favorite.push(movieId);
      changes = { favorite };

    } else {
      favorite.splice(favorite.indexOf(movieId));
      changes = { favorite };
    }
    await new UserController(username).update(changes);
    dispatch({ type: "UPDATE_FAVORITE", payload: { favorite } });
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
            <p className='modal__overview'>{genres}</p>
            <br></br>
            <p className='modal__overview' style={{ display: 'flex' }}>
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
