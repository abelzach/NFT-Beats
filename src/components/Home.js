import React from "react";
import Particles from 'react-particles-js';
import "./Home.css";
import logo from '../logo.png'
import pic from '../pic.jpg';

export default function Home() {
  return (
    <div>
    <div className="card-container"> 
    <div>
    <Particles
    params={{
	    "particles": {
	        "number": {
	            "value": 20
	        },
	        "size": {
	            "value": 3
	        }
	    },
	    "interactivity": {
	        "detect_on": "canvas",
                "events": {
                
                "bubble": {
                    "distance": 600,
                    "size": 60,
                    "duration": 0.1,
                    "opacity": 1
                  },
                  "repulse": {
                    "distance": 500,
                    "duration": 0.5
                  }
	             }
                }
                
	}} />
    </div>
    </div>
     <br/>
    <div className="home">
    <img src={logo} alt="Logo" width="600"/>;
        <div className="heading-container"> 
        
            <div className="heading-1">
            <center>
                <h1> Music in your reach</h1>
            </center>
            <h2>Convert your music into NFT</h2>
            <h3>Create, Buy, Sell and Earn with your music NFTs.</h3>

             </div>
             &emsp;&emsp;<Particles />
        </div>
        
        <div className="card-container"> 
        <div>
        
           
        <Particles
    params={{
	    "particles": {
	        "number": {
	            "value": 40
	        },
	        "size": {
	            "value": 6
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": false,
	                "mode": "repulse"
	            }
	        }
	    }
	}} />
    
    

        </div>
        
        </div>
        <div className="cc">
            <br/><br/>
        <h3>What is NFT Beat</h3>
        <h4>
        NFT Beat is creating a new idea of patronage at a time when earning music royalties is a circuitous
        </h4><h4>
         route and live touring is still down for the count due to the pandemic. 
        </h4><h4>
        Transactions using NFTs allow audiences to participate in auctions for unique content from the artists they love.
        </h4>  
        </div>
      </div>
      <img src={pic} align="right"  width="300" height="300"/>
      </div>
      
  );
}