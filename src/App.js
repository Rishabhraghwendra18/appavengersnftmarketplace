import {useState} from 'react'
import Navbar from "./components/Navbar";
import UserNFTS from "./containers/UserNFTS";
import Buy from './containers/Buy';
import Mint from './containers/Mint';
import "./Home.css";

export default function Home() {
  const [selectedPage, setSelectedPage] = useState("Home")
  return (
    <main className="main">
      <Navbar setSelectedPage={setSelectedPage}/>
      <div className="home_wrapper">
        {selectedPage === "Home" && <UserNFTS/>}
        {selectedPage === "Buy" && <Buy/>}
        {selectedPage === "Mint" && <Mint/>}
      </div>
    </main>
  );
}
