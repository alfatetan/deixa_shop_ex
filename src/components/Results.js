import {Card, Rate} from 'antd';
import { Link } from 'react-router-dom';
import "./Results.css";
import {stuff} from "../stuff.js";

function Results({category, rating, priceMin, priceMax}) {

 const purchaseCategory = stuff[category].filter(x => x.rating >= rating).filter(x => x.price > priceMin).filter(x => x.price <= priceMax);
    console.log(purchaseCategory);
  return (
    <>
  {purchaseCategory.map((e,i) => {
    return (
      <Card>
      <div style={{ display: "flex" }}>
        <img src={e.image} alt={i} width="300px"></img>
        <div>
          <p className="title">
            {e.name}
          </p>
          <Rate value={e.rating} disabled={true}></Rate>
          <h2 className='pricestyle'> ${e.price}</h2>
          <p>
            Door to door delivery
          </p>
          <Link to="/product" state={e} className="login">
          Know more
        </Link>
        </div>
      </div>
    </Card>
    );
  })}
  </>
  )
}

export default Results