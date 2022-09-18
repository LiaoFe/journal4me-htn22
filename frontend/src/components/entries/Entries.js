import React, {useEffect, useState} from 'react';
import "./entries.css";
import './entry/Entry';
import Entry from './entry/Entry';


import axios from "axios";


function Entries() {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/letsgetthisbread'); 
                console.log(res)
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
      }, [])

    return (
        <div className="container-entries">
            <Entry />
            {data}
        </div>
    )
}

export default Entries;
