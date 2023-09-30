import {useState} from 'react';
import {
    useCreateDirectListing,
    useContract,
    Web3Button,
  } from "@thirdweb-dev/react";
import Modal from 'react-modal';
import './index.css'

const contractAddress = process.env.REACT_APP_NFT_MARKETPLACE;
const assetContractAddress = process.env.REACT_APP_NFT_COLLECTION;

function PriceModal({isOpen,setIsOpen,nftMetaData}) {
    const [price, setPrice] = useState('');
    const { contract } = useContract(contractAddress, "marketplace-v3");
    const {
        mutateAsync: createDirectListing,
        isLoading,
        error,
      } = useCreateDirectListing(contract);
      console.log("nftdata: ",nftMetaData)
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={()=>setIsOpen(false)}
    contentLabel="Price Modal"
    style={{width:'300px',height:'fit-content'}}
    data={{width:'300px'}}
  >
    <h2>Enter Price</h2>
    <input
      type="number"
      placeholder="Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
    <div className="modal-buttons">
      <button className="button" onClick={()=>setIsOpen(false)}>Cancel</button>
      <button  className="button" onClick={()=>{
        createDirectListing({
            assetContractAddress,
            tokenId:nftMetaData.id,
            pricePerToken:price,
        })
      }}>List</button>
    </div>
  </Modal>
  )
}

export default PriceModal