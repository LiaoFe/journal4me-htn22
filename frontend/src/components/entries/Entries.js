
import React, { useEffect, useState } from 'react';

import "./entries.css";
import Entry from './entry/Entry';
import axios from "axios"
import { Link } from 'react-router-dom';


<<<<<<< HEAD
=======

>>>>>>> c7e0fef88c42889dff5953cb72e233416fa9c986
function Entries() {

    let [data, setData] = useState([])
    const [info, setInfo] = useState()
    const [useModal, setUseModal] = useState(false)


    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/letsgetthisbread'); 
                setData(res.data);
                console.log(res)

            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
      }, [])


    data = data.sort((entryA, entryB) => { 
        return new Date(entryA.date) > new Date(entryB.date) ? -1 : 1;
    })

    const modalToggle = () => { 
        setUseModal(false);
        console.log('clicking')
    }


    return (
        <>
        <div onClick={ modalToggle } className={'modal-background' + ((useModal) ? '_active' : '')}> 
          <div className={'modal-background__modal' + ((useModal) ? '_active' : '')}>
            <div className='modal-title'>
                <span className='modal-title__txt'> { info && info.summary } </span>
            </div>
            <div className='modal-body'>
                <div className='modal-body__txt'> { info && info.speech } </div>
            </div>
          </div>
        </div>
        <div className="container-entries">

        <div className="recording-container">
            <Link to='/'>homepage</Link>
            <Link to='/entries'>entries</Link>
            <Link to='/recordnow'>record now</Link>
            {/* <Link to='/resources'>resources</Link> */}
        </div>
            <div className='container-entries__box'>
                {
                    data.map(obj => {
                        return <Entry key={ Math.floor(Math.random() * 10000) } date={ obj.date } rating={ obj.rating } speech={ obj.speech } summary={ obj.summary } setInfo={ setInfo } setUseModal={ setUseModal }/>
                    }) 
                }
            </div>

        </div>

        </>
    )
}

export default Entries;
