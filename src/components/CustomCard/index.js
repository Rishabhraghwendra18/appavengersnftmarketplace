import "./index.css";

export default function CustomCard({
  isBuyButtonVisible,
  src,
  name,
  description,
  price,
  symbol,
  showprice,
  onClick,
}) {
  
  return (
    <div className="card">
      <img src={src} alt={name} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
        {price ? <p className="card-price">{symbol} {price}</p>:<p>Not listed</p> }
      </div>
      <div className="card-buttons">
        {isBuyButtonVisible ? (
          <button className="buy-button" onClick={onClick}>Buy</button>
        ) : (
          <button className="sell-button" onClick={onClick}>List</button>
        )}
      </div>
    </div>
  );
}
