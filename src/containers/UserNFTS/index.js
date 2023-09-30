import {useState} from 'react';
import CustomCard from '../../components/CustomCard'
import PriceModal from '../../components/PriceModal';
import { useOwnedNFTs, useContract, useAddress } from "@thirdweb-dev/react";
import "./index.css"

const contractAddress = process.env.REACT_APP_NFT_COLLECTION;

function UserNFTS() {
    const address = useAddress();
    const { contract } = useContract(contractAddress);
    const { data, isLoading, error } = useOwnedNFTs(contract, address);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedNFT, setSelectedNFT] = useState();
  return (
    <div className='usernfts_wrapper'>
        <h1>Your NFTS</h1>
        {isLoading?<p>Loading Your NFTS</p>:
        (<div className='card-grid'>
            {data?.length == 0 ?<p>You don't own any NFTs</p>:(
                <>
            {data?.map((nft,index)=>(
                <CustomCard src={nft.metadata.image} name={nft.metadata.name} description={nft.metadata.description} key={index} nftId={nft.metadata.id} showprice={false} onClick={()=>{
                    setIsOpen(true)
                    setSelectedNFT(nft.metadata)
                }}/>
            ))}
                </>
            )}
        </div>)
        }
    <PriceModal setIsOpen={setIsOpen} isOpen={isOpen} nftMetaData={selectedNFT}/>
    </div>
  )
}

export default UserNFTS;