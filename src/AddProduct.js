import React, { useState } from 'react'
import { Header } from './Header'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export const AddProduct = () => {

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();


  async function addproduct() {

    let item = { name, model, file, description, price };
    const formData = new FormData();
    formData.append("name", name);
    formData.append("model", model);
    formData.append("file", file);
    formData.append("description", description);
    formData.append("price", price);

    let result = await fetch("http://127.0.0.1:8000/api/addproduct", {
      method: "POST",
      body: formData
    });

    alert("Data Has Been Saved !");
    navigate('/');
  }


  return (
    <div>
      <Header />

      <div className="col-md-6 offset-sm-3 border shadow mt-20">
        <h1>Add Products</h1>
        <Form>

          <Form.Group className="m-5" controlId="">
            <Form.Control type="text" placeholder="Product Name"  onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="m-5" controlId="formBasicLastname">
            <Form.Control type="text" placeholder="Model Number" onChange={(e) => setModel(e.target.value)} />
          </Form.Group>

          <Form.Group className="m-5" controlId="formBasicEmail">
            <small className='-m10'> Select Product Image *</small>
            <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
          </Form.Group>

          <Form.Group className="m-5" controlId="formBasicLastname">
            <Form.Control type="text" placeholder="₹ Price " onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>

          <textarea rows={3} placeholder='Product Description' onChange={(e) => setDescription(e.target.value)}></textarea><br />

          <Button variant="primary mb-3" onClick={addproduct}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
