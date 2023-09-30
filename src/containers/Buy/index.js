import {
  useValidDirectListings,
  useContract,
  useBuyNow,
  useAddress
} from "@thirdweb-dev/react";
import { ListingType } from "@thirdweb-dev/sdk";
import CustomCard from "../../components/CustomCard";
import "./index.css";

const marketplace = process.env.REACT_APP_NFT_MARKETPLACE;

function Buy() {
    const address = useAddress();
  const { contract } = useContract(marketplace, "marketplace-v3");
  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(contract);
  const { mutateAsync: buyNow, isLoading, error } = useBuyNow(contract);
  return (
    <div>
      <h1>Buy Listed NFTS</h1>
      {loadingDirectListing ? (
        <p>Loading listed NFTs</p>
      ) : (
        <div className="card-grid">
          {directListing?.map((listing, index) => (
            <CustomCard
              key={index}
              isBuyButtonVisible={true}
              src={listing.asset.image}
              name={listing.asset.name}
              description={listing.asset.description}
              price={listing.currencyValuePerToken.displayValue}
              symbol={listing.currencyValuePerToken.symbol}
              onClick={async () => {
                await contract.directListings.buyFromListing(listing.asset.id,1,address)
                // buyNow({
                //   id: listing.asset.id,
                //   type: ListingType.Direct,
                //   buyAmount: 1,
                // });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Buy;
