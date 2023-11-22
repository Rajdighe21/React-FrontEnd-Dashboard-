import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Header } from './Header';
import { useNavigate } from 'react-router-dom';


export const Register = () => {

    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/add');
        }
    },[])

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

   

    async function Singup() {
        let items = { name, lastname, email, password };
        let result = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(items)
        });

        result = await result.json();
        console.log(result);
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate('/add');
    }

    return (



        <div>
                   <Header />

            <div className="col-md-6 offset-sm-3 border shadow mt-20">
                <h1>Register Form</h1>
                <Form>

                    <Form.Group className="m-5" controlId="">
                        <Form.Control value={name} type="text" placeholder="Enter First Name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="m-5" controlId="formBasicLastname">
                        <Form.Control value={lastname} type="text" placeholder="Enter Last Name" onChange={(e) => setLastname(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="m-5" controlId="formBasicEmail">
                        <Form.Control value={email} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="m-5" controlId="formBasicPassword">
                        <Form.Control value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email And Password  with anyone else.
                        </Form.Text>
                    </Form.Group>


                    <Button variant="primary mb-3" onClick={Singup}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}
