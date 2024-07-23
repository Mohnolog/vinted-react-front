import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default function Offer() {
  // Recupération du params pour l'utiliser dans la requête est récupérer les dernières informations à jour de l'offre
  const { id } = useParams();

  const [offerInfos, setOfferInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Destructuration de l'objet retourné par la requête pour accéder directement à la clé 'data'
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/offer/${id}`
        );

        // console.log("offer page - data>>", data);

        setOfferInfos(data);
      } catch (error) {
        console.log("Offer page - catch >", error.response);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <main>Loading...</main>
  ) : (
    <main className="offerPage">
      <div>
        {offerInfos.product_pictures.length === 0 ? (
          <img
            src={offerInfos.product_image.secure_url}
            alt={offerInfos.product_name}
          />
        ) : (
          <img
            className="offer-picture"
            src={offerInfos.product_pictures[0].secure_url}
            alt={offerInfos.product_name}
          />
        )}
      </div>

      <div>
        <p>{offerInfos.product_price} €</p>

        <div>
          {offerInfos.product_details.map((detail, index) => {
            // 'details' est un objet mais tous les objets de 'product_details' n'ont pas le même nom de clé donc grâce à 'Object.keys' on obtient un tableau avec tous les noms de clé
            const keyNamesTab = Object.keys(detail);
            return (
              <div key={index}>
                {keyNamesTab.map((keyName, index) => {
                  // Ensuite on map sur ce tableau pour accéder à chaque nom de clé et on l'affiche suivie de la valeur de la clé
                  return (
                    <div key={index}>
                      {keyName} : {detail[keyName]}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <p>{offerInfos.product_name}</p>
        <p>{offerInfos.owner.account.username}</p>
        <Link to={"/payment"}>Acheter</Link>
      </div>
    </main>
  );
}
