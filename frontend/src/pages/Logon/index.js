import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import herosImage from '../../assets/heroes.png'
import { FiLogIn } from 'react-icons/fi'

export default function Logon() {
  const [id, setId] = useState('')
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await api.post('session', { id })
      console.log(response.data.name)
      localStorage.setItem("ongId", id)
      localStorage.setItem('ongName', response.data.name)

      history.push('/profile')

    } catch (e) {
      alert('Falha no login tente novamente')
      console.error(e)
    }
  }

  return (

    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID" />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>

      </section>
      <img src={herosImage} alt="Heroes" />
    </div>

  );
}
