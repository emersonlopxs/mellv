import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Loader } from '../../Camaleao';
import { Grid } from './styles.module.scss';
import Card from '../Card';
import api from '../../api';

function Showcase() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      try {
        await api
          .get('/products')
          .then((response) => setProducts(response.data));
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  function handleProduct(item) {
    if (!localStorage.getItem('Product')) {
      localStorage.setItem('Product', JSON.stringify({}));
    }

    let save = JSON.parse(localStorage.getItem('Product'));
    save = { ...save, [item.id]: item };
    localStorage.setItem('Product', JSON.stringify(save));
    history.push(`product/${item.id}`);
  }

  if (products.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <div className={Grid}>
        {products.map((product) => (
          <Card
            key={product.id}
            primaryImage={product.images[0]}
            secundaryImage={product.images[1]}
            title={product.name}
            price={product.price}
            styleBtn2={{ background: 'green' }}
            nameBtn1={'Ver Produto'}
            nameBtn2={'Compra Rápida'}
            // pp={JSON.parse(product.sizes).pp}
            // p={JSON.parse(product.sizes).p}
            // m={JSON.parse(product.sizes).m}
            // g={JSON.parse(product.sizes).g}
            // gg={JSON.parse(product.sizes).gg}
            clickBtn1={() => handleProduct(product)}
            clickBtn2={() => {
              console.log('Compra Rápida');
            }}
          />
        ))}
      </div>
    </>
  );
}
export default Showcase;
