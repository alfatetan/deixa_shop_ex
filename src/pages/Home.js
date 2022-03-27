import React from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./Home.css";
import { Carousel, Card } from 'antd';
import Carousel1 from "../images/carousel1.png";
import Carousel2 from "../images/carousel2.png";
import Carousel3 from "../images/carousel3.png";
import Dino from "../images/dino.png";
import Lyrics from "../images/lyrics.png";
import Videos from "../images/videos.png";
import Pictures from "../images/pictures.png";
import GIFs from "../images/gifs.png";
import Models3D from "../images/3dmodels.png";
import Audios from "../images/audios.png"
import Books from "../images/books.png"

const carousel = [Carousel1, Carousel2, Carousel3];
const catCard = [Videos, Pictures, Models3D, Audios, GIFs, Books];
const Home = () => {

return(
  <>
  <div className="container">
    <Header/>
    <Carousel autoplay className="carousel">
    {carousel.map((e) => {
        return <img src={e} className="carousel-img" alt="carousel"></img>;
    })}
    </Carousel>
    <div className="cards">  
      <Card className="card">
        <h1>Choose Videos</h1>
        <img src={Videos} alt="Videos Category" className="card-content"></img>
        <br />
        <Link to="/categories" state={"Videos"} className="link">
          Shop Now
        </Link>
      </Card>
      <Card className="card">
        <h1>Dino 3D</h1>
        <img src={Dino} alt="Dino" className="card-content"></img>
        <br />
        <Link to="/" className="link">
          View Product
        </Link>
      </Card>
      <Card className="card">
        <h1>William Shakespeare's Lyrics</h1>
        <img src={Lyrics} alt="William Shakespeare's Lyrics" className="card-content"></img>
        <br />
        <Link to="/" className="link">
          View Product
        </Link>
      </Card>
      <Card className="card">
        <h1>Shop By Category</h1>
        <div className="card-content">
          {catCard.map((e) => {
            return (
              <img
                src={e}
                alt="category"
                className="card-category"
                onClick={() => console.log("beauty")}
              ></img>
            );
          })}
          <br />
          <Link to="/" className="link">
            Shop All
          </Link>
        </div>
      </Card>
    </div>
  </div>
  </>
)
}

export default Home;
