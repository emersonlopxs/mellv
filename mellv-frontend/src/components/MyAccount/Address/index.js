import React, { useEffect, useState } from 'react';
import {
  Container,
  AddressSection,
  AddressGroup,
  AddressContent,
  EditBtn,
  AddressData,
} from './styles.module.scss';
import api from '../../../api';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

function Address({ setSectionName, setActive }) {
  const [myAddress, seMyAddress] = useState([]);
  useEffect(() => {
    setSectionName('Endereços');
    getAddress();
    setActive(3);
  }, [setActive, setSectionName]);

  async function getAddress() {
    try {
      await api
        .get('/address', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        })
        .then((response) => seMyAddress(response.data));
    } catch (error) {
      console.log('error ->', error.status);
    }
  }
  return (
    <>
      <div className={Container}>
        <p>
          Os endereços a seguir serão usados na página de finalizar pedido como
          endereços padrões, mas é possível modificá-los durante a finalização
          do pedido.
        </p>
        <div className={AddressGroup}>
          <div className={AddressSection}>
            <div className={AddressContent}>
              <h3>Endereço de faturamento</h3>
              <Link to="/my-account/address/edit-revenues" className={EditBtn}>
                <FaEdit />
              </Link>
            </div>
            {myAddress.map((item) => (
              <div className={AddressData} key={item.id}>
                <p>{item.street}</p>
                <p>{item.district}</p>
                <p>{item.number}</p>
                <p>{item.complement}</p>
                <p>{item.cep}</p>
              </div>
            ))}
          </div>

          <div className={AddressSection}>
            <div className={AddressContent}>
              <h3>Endereço de entrega</h3>
              <Link to="/address" className={EditBtn}>
                <FaEdit />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Address;
