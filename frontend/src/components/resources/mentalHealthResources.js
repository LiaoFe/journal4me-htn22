//import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
//import background from './MHResourcesBG.jpg';
import './resources.css';

function MHResourcesPage() {
    

    return (
        <div className="container-resources">
        <div className="header">
            <Link to='/'>homepage</Link>
            <Link to='/entries'>entries</Link>
            <Link to='/recordnow'>record now</Link>
            <Link to='/resources'>resources</Link>

        </div>
      
        <ul id="list">
           <a href="https://kidshelpphone.ca/" target="blank">  <li>https://kidshelpphone.ca/</li> </a> 
           <br></br>
           <li><a href="https://www.regionofwaterloo.ca/en/health-and-wellness/mental-wellness.aspx
" target="blank"> https://www.regionofwaterloo.ca/en/health-and-wellness/mental-wellness.aspx
</a></li>
<br></br>
<li>  <a href="https://www.mentalhealth.gov/" target="blank">https://www.mentalhealth.gov/ </a> </li>
<br></br>
<li>  victims helpline: 416-314-2447 </li>
        </ul>

      {/*   <div className="waves">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
            </svg>
        </div>  */}

    </div>
    )
}

export default MHResourcesPage;
