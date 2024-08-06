// import data from "../assets/offers.json";
import Card from "../components/Card";

const Home = ({ data, isLoading }) => {
  // console.log("offers>>>>", data);
  return isLoading ? (
    <main>
      <p>Loading...</p>
    </main>
  ) : (
    <div className="wrapper">
      {data.offers.map((offer) => {
        return <Card key={offer._id} offer={offer} />;
      })}
    </div>
  );
};

export default Home;
