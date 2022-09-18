import React, {useEffect, useState} from 'react';
import "./entries.css";
import './entry/Entry';
import Entry from './entry/Entry';
import {Button, Container, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <Container fluid className="container-entries" style={{
            backgroundColor: 'blue',
            width: '100px',
            height: '100px'
          }}>
            <Row>
                <Col>
                <Button variant="secondary" className="btn-primary" fluid>SHEEESH</Button>
                 <Button variant="secondary" className="btn-primary">SHEEESH</Button>
                </Col>
            </Row>
         </Container>
    )
}

export default Entries;
