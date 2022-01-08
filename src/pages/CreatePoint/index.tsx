import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Go back
        </Link>
      </header>
      <form>
        <h1>
          Collection point <br /> registration
        </h1>
        <fieldset>
          <legend>
            <h2>Info</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Entity name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select address on map</span>
          </legend>
          <MapContainer center={[-12.9913412, -38.5165131]} zoom={15}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-12.9913412, -38.5165131]} />
          </MapContainer>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">State (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Select an UF</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city">
                <option value="0">Select a city</option>
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Collection items</h2>
            <span>Select one or more items below</span>
          </legend>
          <ul className="items-grid">
            {items.map(item => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Register collection point</button>
      </form>
    </div>
  );
};

export default CreatePoint;
