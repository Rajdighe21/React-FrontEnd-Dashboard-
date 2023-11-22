import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const UpdateProduct = (props) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [model_no, setModel] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const param = useParams();
  const url = "http://127.0.0.1:8000/api/getdata/" + param.id;

  const fetchInfo = async () => {

    let result = await fetch(url);
    result = await result.json()
    setData(result)
    setName(result.name);
    setModel(result.model_no);
    setFile(result.file);
    setDescription(result.description);
    setPrice(result.price);

  }

  useEffect(() => {
    fetchInfo();
  }, [])


  async function UpdateData(id) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("model", model_no);
    formData.append("file", file);
    formData.append("description", description);
    formData.append("price", price);

    let result = await fetch("http://127.0.0.1:8000/api/update/" + id + "?_method=put", {
      method: "POST",
      body: formData
    });

    alert("Data Has Been Saved !");
    navigate('/');
  }

  return (
    <div>
      <Header />



      <header>
        <h1>Update Products</h1>
      </header>
      <div className="col-md-6 offset-sm-3 border shadow mt-20">


        <Form>
          <img src={"http://127.0.0.1:8000/" + data.image} className='updateImg ' alt='Loading...' />

          <Form.Group className="m-5" controlId="">
            <Form.Control type="text" defaultValue={data.name} placeholder="Product Name" onChange={(e) => { setName(e.target.value) }} />
          </Form.Group>

          <Form.Group className="m-5" controlId="formBasicLastname">
            <Form.Control type="text" defaultValue={data.model_no} placeholder="Model Number" onChange={(e) => { setModel(e.target.value) }} />
          </Form.Group>

          <Form.Group className="m-5" controlId="formBasicEmail">
            <small className='-m10' > Select Product Image *</small>
            <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
          </Form.Group>

          <Form.Group className="m-5" controlId="formBasicLastname">
            <Form.Control type="text" defaultValue={data.price} placeholder="₹ Price " onChange={(e) => { setPrice(e.target.value) }} />
          </Form.Group>

          <textarea rows={3} placeholder='Product Description' defaultValue={data.description} onChange={(e) => { setDescription(e.target.value) }} ></textarea><br />

          <Button variant="primary mb-3" onClick={() => { UpdateData(data.id) }}>
            Submit
          </Button>
        </Form>


      </div>
    </div>
  )
}
