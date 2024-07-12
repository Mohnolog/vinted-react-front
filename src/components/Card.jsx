import { Link } from "react-router-dom";
const Card = ({ offer }) => {
  return (
    <div className="container">
      <div className="user">
        {offer.owner.account.avatar && (
          <img
            className="user-image"
            src={offer.owner.account.avatar.secure_url}
            alt={offer.product_name}
          />
        )}
        <span>{offer.owner.account.username}</span>
      </div>

      <div className="product">
        <Link to={`/offer/${offer._id}`} key={offer._id}>
          <img src={offer.product_image.secure_url} alt={offer.product_name} />
          <p>{offer.product_name}</p>
          <div className="product-price-size-brand">
            <span>{offer.product_price} €</span>
            {/* {<span>{offer.product_details[1]["TAILLE"]}</span>}
            <span>{offer.product_details[0]["MARQUE"]}</span> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
