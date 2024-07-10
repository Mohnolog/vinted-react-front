import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const Offer = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <Link to={"/"}>go to Home</Link>
      offer {id}
    </div>
  );
};

export default Offer;
