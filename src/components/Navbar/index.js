import { ConnectWallet } from "@thirdweb-dev/react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar_wrapper">
      <div className="navbar_contents">
        <h2>AppAvengers NFT MarketPlace</h2>
        <div className="navbar_links">
            <p>Buy</p>
            <p>Sell</p>
        </div>
        <ConnectWallet/>
      </div>
    </div>
  );
}