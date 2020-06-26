import React, { useState, useEffect } from 'react';
import { Container } from './styles.module.scss';
import Segment from '../Segment';

export default function Contact() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  useEffect(() => {
    console.log(values);
  }, [values]);

  function _handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className={Container}>
      <Segment name="Contato" />
      <h2>Contato</h2>

      <section>
        <div>
          <label htmlFor="eEmail">Seu nome</label>
          <input
            type="text"
            required
            name="name"
            value={values.name}
            placeholder="Seu nome"
            onChange={(e) => _handleChange(e)}
          />

          <label htmlFor="ePassword">seu email</label>
          <input
            type="email"
            required
            name="email"
            value={values.email}
            placeholder="Seu e-mail"
            onChange={(e) => _handleChange(e)}
          />

          <label htmlFor="ePassword">Assunto</label>
          <input
            type="text"
            required
            name="subject"
            value={values.subject}
            placeholder="Assunto"
            onChange={(e) => _handleChange(e)}
          />

          <label htmlFor="ePassword">Sua mensagem</label>
          <textarea
            onChange={(e) => _handleChange(e)}
            name="message"
            id=""
            cols="150"
            rows="15"
            placeholder="Escreva aqui..."
          ></textarea>

          <button style={{ marginTop: 15 }}>Enviar</button>
        </div>
      </section>
    </div>
  );
}
