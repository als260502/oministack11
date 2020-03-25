import React, { useEffect, useState } from 'react';
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

export default function Profile() {
  const [incidents, setIncidents] = useState([])

  const ongName = localStorage.getItem("ongName")
  const ongId = localStorage.getItem("ongId")

  const history = useHistory()

  useEffect(() => {
    api.get('profile', {
      headers:
      {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data)
    })

  }, [ongId])

  async function handleDeleteIncident(id) {

    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))

    } catch (error) {
      alert('Erro ao deletar incident')
      console.log(error)

    }
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />

        <span>Bem vinda, {ongName}</span>

        <Link className="button" to='/incidents/new'> Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrador</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(incident.id)} >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
