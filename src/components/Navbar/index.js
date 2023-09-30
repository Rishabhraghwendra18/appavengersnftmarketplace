import { ConnectWallet } from "@thirdweb-dev/react";
import "./Navbar.css";

export default function Navbar({setSelectedPage}) {
  return (
    <div className="navbar_wrapper">
      <div className="navbar_contents">
        <h2 onClick={()=>setSelectedPage("Home")}>AppAvengers NFT MarketPlace</h2>
        <div className="navbar_links">
            <p onClick={()=>setSelectedPage("Buy")}>Buy</p>
            <p onClick={()=>setSelectedPage("Mint")}>Mint</p>
        </div>
        <ConnectWallet/>
      </div>
    </div>
  );
}