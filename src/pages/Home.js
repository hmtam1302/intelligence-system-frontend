import React from 'react'
import Row from '../components/Row'
import Banner from '../components/Banner'
import Nav from '../components/Nav'
import requests from '../api/requests'
import '../assets/css/Home.css'
import { useSelector, useDispatch } from 'react-redux';
import { UserController } from '../api/controllers';
import SnackBar from '../components/SnackBar';

const Home = () => {
  const [search, setSearch] = React.useState('')
  //State
  const { username } = useSelector(state => state)
  const [open, setOpen] = React.useState(false)
  const [responseErr, setResponseErr] = React.useState('')

  //Dispatch
  const dispatch = useDispatch();

  //Rendering
  React.useEffect(() => {
    const getData = async () => {
      const response = await new UserController(username).getInfo();
      if (response.error) {
        setResponseErr(response.error.response.data.message)
        setOpen(true)
      } else {
        dispatch({ type: 'UPDATE_USER', payload: { userinfo: response.data } })
      }
    }
    getData()
    // eslint-disable-next-line
  }, [username, dispatch])


  return (
    <div className='app'>
      <Nav onChangeSearch={(value) => setSearch(value)} />
      <Banner />
      {/* <Row
        title='Recommend netflix movie'
        id='NO'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      /> */}
      {/* <Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending} />
      <Row title='Top Rated' id='TR' fetchUrl={requests.fetchTopRated} /> */}

      {search !== '' ? (
        <Row
          title='Search Movies'
          id='Search'
          theme={search}
          fetchUrl={requests.fetchActionMovies}
        />
      ) : (
        <>
          <Row
            title='Action Movies'
            id='AM'
            theme='Action'
            fetchUrl={requests.fetchActionMovies}
          />
          <Row
            title='Comedy Movies'
            id='CM'
            theme='Comedy'
            fetchUrl={requests.fetchComedyMovies}
          />
          <Row
            title='Horror Movies'
            id='HM'
            theme='Horror'
            fetchUrl={requests.fetchHorrorMovies}
          />
          <Row
            title='Romance  Movies'
            id='Romance'
            theme='Romance'
            fetchUrl={requests.fetchRomanceMovies}
          />
          <Row
            title='Drama Movies'
            id='Drama'
            theme='Drama'
            fetchUrl={requests.fetchDocumentaries}
          />
        </>
      )}
      <SnackBar
        open={open}
        onClose={() => setOpen(false)}
        content={responseErr}
        severity='warning'
      />
    </div>
  )
}

export default Home
