import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function Category(props) {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        // setPopularMovies(data.results.slice(0, 5));
        fetch(`http://localhost:8080/api/movies?category=${props.category}`, {credentials: 'include'})
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setMovieList(data);
          });
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
    Movies
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
                  <Card.Text className="fs-5"> <span style={{
                    color: "#ffc107",
                  }}>Genre:</span> 
          {` ${items.genre.join(", ")}`}
          </Card.Text>
          <Card.Text style={{height:"110px"}}>
          {items.overview}
          </Card.Text>
          <Card.Text className="fs-5" style={{
                    color: "#ffc107",
                  }}>
          Rating: {items.rating}
          <span className="mx-3">Votes: {items.vote_count} </span>
          <span className="mx-3">Popularity: {items.popularity} </span>

          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
</div>
  )
}

export default Category;
