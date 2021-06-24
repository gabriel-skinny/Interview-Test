import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import * as Yup from 'yup';
import { Toast, Form, Button } from 'react-bootstrap';

function App() {
  const [nome, setNome] = useState();
  const [enderco, setEnderco] = useState();
  const [telefone, setTelefone] = useState();
  const [email, setEmail] = useState();
  const [dataDeNacismento, setDataDeNacismento] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  
  async function handleSubmit(e) {
    setError(false);
    e.preventDefault();
    
    const data = {
      nome,
      enderco,
      telefone,
      email,
      dataDeNacismento
    }

    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required("Nome é obrigatorio"),
        enderco: Yup.string().required("Endereço obrigatorio"),
        telefone: Yup.number("Apenas numeros podem ser digitados").required("Telefone obrigatorio"),
        email: Yup.string().email("Precisa ser um E-mail valido").required("E-mail é obrigatorio"),
        dataDeNacismento: Yup.date().required("Data de nacismento obrigatoria")
      })
  
      await schema.validate(data)

      console.log(data);

    } catch(err) {
      setError(true);
      setErrorMessage(err.message);
    }
  }

  return (
      <Form className="container">
        {error && (
          <Toast className="toast m-auto border border-danger" onClose={() => setError(false)}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
              <strong className="mr-auto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body>{errorMessage}</Toast.Body>
          </Toast>
        )}
        
        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control 
            size="lg" 
            type="text" 
            placeholder="Digite seu nome" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Endereço</Form.Label>
          <Form.Control 
            size="lg" 
            type="text" 
            placeholder="Digite seu endereço" 
            value={enderco}
            onChange={(e) => setEnderco(e.target.value)} />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Telefone</Form.Label>
          <Form.Control 
            size="lg" 
            type="text"
            placeholder="Digite seu telefone" 
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control 
            size="lg" 
            type="email" 
            placeholder="Digite sua senha" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Data de nascimento</Form.Label>
          <Form.Control 
            size="lg" 
            type="date" 
            placeholder="Digite sua data de nascimento" 
            value={dataDeNacismento}
            onChange={(e) => setDataDeNacismento(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleSubmit} className="mt-5 w-100" size="lg" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
  );
}

export default App;
