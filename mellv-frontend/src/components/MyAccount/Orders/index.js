import React, { useEffect } from 'react';
import { Container } from './styles.module.scss';
import CustomizedTable from '../../Utils/Table';
// import api from '../../../api';

function Orders({ setSectionName, setActive }) {
  useEffect(() => {
    setSectionName('Pedidos');
    setActive(2);
  }, [setSectionName, setActive]);
  const data = [{ data: ['teste', 'teste'] }];
  return (
    <>
      <div className={Container}>
        <CustomizedTable rows={data} />
      </div>
    </>
  );
}

export default Orders;
