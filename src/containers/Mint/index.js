import { useState } from "react";
import { useMintNFT, useContract, Web3Button,useAddress } from "@thirdweb-dev/react";
import { NFTStorage, File } from 'nft.storage'
import "./index.css";

const NFT_COLLECTION_ADDRESS = process.env.REACT_APP_NFT_COLLECTION;
const NFT_STORAGE_KEY = process.env.REACT_APP_IPFS;

const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

function Mint() {
  const address = useAddress();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setuploadingImage] = useState(false);
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { mutateAsync: mintNft, isLoading, error } = useMintNFT(contract);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setuploadingImage(true);
    const result = await nftstorage.store({
      image:file,
      name:nftName,
      description:nftDescription,
  });
    setSelectedFile(result.data.image.href);
    setuploadingImage(false);
  };
  return (
    <div>
      <h1>List Your NFTS</h1>
      <div className="mint_nft">
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .pdf" // Specify allowed file types (optional)
        onChange={handleFileChange}
      />
      <input
      type="text"
      placeholder="name"
      onChange={(e)=>{setNftName(e.target.value)}}
      disabled={uploadingImage}
      />
      <input
      type="text"
      placeholder="description"
      onChange={(e)=>{setNftDescription(e.target.value)}}
      disabled={uploadingImage}
      />
        <Web3Button
          contractAddress={NFT_COLLECTION_ADDRESS}
          action={() =>
            mintNft({
              metadata: {
                name: nftName,
                description: nftDescription,
                image: selectedFile, // Accepts any URL or File type
              },
              to: address, // Use useAddress hook to get current wallet address
            })
          }
        >
          Mint NFT
        </Web3Button>
      </div>
    </div>
  );
}

export default Mint;
