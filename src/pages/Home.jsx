// import data from "../assets/offers.json";
import Card from "../components/Card";

const Home = ({ data }) => {
  // console.log("offers>>>>", data);
  return (
    <div className="wrapper">
      {data.offers.map((offer) => {
        // console.log(offer);

        return <Card key={offer._id} offer={offer} />;
      })}
    </div>
  );
};

export default Home;
