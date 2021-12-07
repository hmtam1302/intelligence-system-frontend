import React from 'react'
import Row from '../components/Row'
import Banner from '../components/Banner'
import Nav from '../components/Nav'
import requests from '../API/requests'
import '../assets/css/Home.css'

const Home = () => {
  const [search, setSearch] = React.useState('')
  return (
    <div className='app'>
      <Nav onChangeSearch={(value) =>setSearch(value)} />
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
    </div>
  )
}

export default Home
