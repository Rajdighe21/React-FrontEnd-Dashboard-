import { useEffect, useState } from 'react';
import React from 'react'
import { Header } from './Header';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';



export const Login = () => {
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/add');
    }
  }, [])



  const [errormsg, setErrormsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loggin() {
    let items = { email, password };
    let result = await fetch('http://127.0.0.1:8000/api/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },

      body: JSON.stringify(items)
    });

    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate('/');



    let errors = (JSON.parse(localStorage.getItem("user-info")));
    if (errors.id === undefined) {
      localStorage.clear();
      navigate("/login")
      setErrormsg("error");

    }


  }

  return (


    < div >
      <Header />

      <div className="col-md-6 offset-sm-3 border shadow mt-20 rounded">
        <h1>Loggin Form</h1>
        <Form>
          <Form.Group className="m-5" controlId="">
            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Group>
          <Form.Group className="m-5" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />

            {
              !errormsg ? <Form.Text className="text-muted">
                We'll never share your email And Password  with anyone else.
              </Form.Text> :
                <Form.Text className=" text-danger" >
                  Email or Password must be Wrong *.
                </Form.Text>
            }


          </Form.Group>

          <Button variant="primary mb-3" onClick={loggin} >
            Submit
          </Button>
        </Form>
      </div>


    </div >
  )
}
