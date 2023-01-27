import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function UpcomingMovies() {
    const [movieList, setMovieList] = useState([]);
    
  useEffect(() => {
    fetch(`http://localhost:8080/api/movies/upcoming`, {credentials: 'include'})
      .then((res) => res.json())
      .then((data) => setMovieList(data));
  }, []);
  return (
    <div className='text-white p-5 m-5'>
        <h1
        className="mb-5"
        style={{
          width: "50%",
          color: "gold",
          backgroundColor: "black",
        }}
      >
        Upcoming Movies
      </h1>
      <Row xs={1} md={2} className="g-4 ">
      {movieList.map((items, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${
                      items && items.backdrop_path
                    }`} />
            <Card.Body className="bg-black bg-gradient text-white">
              <Card.Title  className="fs-3" style={{
                        color: "#ffc107",
                      }}>{items.title}
                      <span className="fs-5 text-white">{` (${items.release_date})`}</span></Card.Title>
              <Card.Text style={{height:"110px"}}>
              {items.overview}
              </Card.Text>
              <Card.Text className="fs-5" style={{
                        color: "#ffc107",
                      }}>
              Rating: {items.rating}
              <span className="mx-3">Votes: {items.vote_count} </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  )
}

export default UpcomingMovies
