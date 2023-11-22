import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { Link } from 'react-router-dom';

export const ProdductsList = () => {
    const [search, setSearch] = useState()
    const [len, setLen] = useState(0);
    const url = "http://127.0.0.1:8000/api/lists";
    const [data, setData] = useState([]);

    const fetchInfo = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => setData(d))
    }


    async function searchBar(key) {

        if (key.length === 0) {
            window.location.reload(false);

        } else {
            let result = await fetch("http://127.0.0.1:8000/api/search/" + key)
            result = await result.json();
            setData(result);
            setLen(key.length)
        }
    }

    async function deleteProduct(id) {
        console.log(id);
        let result = await fetch("http://127.0.0.1:8000/api/del/" + id, {
            method: "DELETE"
        });
        result = await result.json();
        fetchInfo();

    };

    useEffect(() => {
        if (len < 1) {
            fetchInfo();
        }
    }, []);




    return (

        <  >

            <Header />

            <div className='body'>


                <header>
                    <h1>Smartphone Product List</h1>
                </header>

                <div className="search-container">
                    <input type="text" className="search-input" placeholder="Search..." onChange={(e) => { searchBar(e.target.value) }} />
                    <div className="search-icon">&#128269;</div>
                </div>

                <div className="product-container">
                    {
                        data.map((i, index) => (
                            <div className="product-card" key={index}>
                                <input type='hidden' />
                                <img className="product-image" style={{ width: '100%', height: '200px', objectFit: 'cover' }} src={"http://127.0.0.1:8000/" + i.image} alt="iPhone" />
                                <div className="product-name">{i.name}</div>
                                <div className="product-name">{i.model_no}</div>
                                <div className="product-price">₹ {i.price}</div>
                                <div className="button-container">
                                    <Link to={'update/' + i.id}><button className="edit-button" >Update</button></Link>
                                    <button className="delete-button" onClick={() => { deleteProduct(i.id) }}>Delete</button>
                                </div>
                            </div>

                        ))
                    }
                </div>




            </div>
        </ >
    )
}