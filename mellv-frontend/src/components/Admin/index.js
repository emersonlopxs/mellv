import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router';
import { StyleAdmin, ShowCase, Header } from './styles.module.scss';
import api from '../../api';
import Add from './AddProduct';
import Edit from './EditProduct';
import TrackOrder from './TrackOrder';
import Card from '../Card';

function Admin({ match }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [products, setProducts] = useState([]);
  const history = useHistory();
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
  }, [products]);

  async function deleteProduct(confirm, id) {
    if (confirm) {
      try {
        api.delete(`/products/delete/${id}`).then((response) => {
          alert('Produto deletado');
          console.log(response);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={StyleAdmin}>
      <div className={Header}>
        <h1>Admin Panel</h1>
        <button
          onClick={() => {
            history.push(`${match.path}/product/add`);
          }}
        >
          +
        </button>
      </div>
      <div className={ShowCase}>
        {products.map((product) => (
          <Card
            key={product.id}
            to="#"
            primaryImage={product.images[0]}
            secundaryImage={product.images[1]}
            title={product.name}
            price={product.price}
            styleBtn2={{ background: 'red' }}
            nameBtn1={'Editar'}
            nameBtn2={'Deletar'}
            clickBtn1={() => {
              // setValue(product);
              localStorage.setItem('ProductEdit', JSON.stringify(product));
              history.push(`${match.path}/product/edit/${product.id}`);
            }}
            clickBtn2={() => {
              deleteProduct(
                window.confirm(`Deseja deletar o produto ${product.name}`),
                product.id
              );
            }}

            // pp={JSON.parse(product.sizes).pp}
            // p={JSON.parse(product.sizes).p}
            // m={JSON.parse(product.sizes).m}
            // g={JSON.parse(product.sizes).g}
            // gg={JSON.parse(product.sizes).gg}
          />

          // <div className={Card} key={product.id}>
          //   <img src={product.images[0]} alt="Imagem do prduto" />
          //   <h2>{product.name}</h2>
          //   <h3>{product.description}</h3>
          //   <p>R$ {product.price}</p>
          //   <div>
          //     {JSON.parse(product.sizes).pp && <p>PP</p>}
          //     {JSON.parse(product.sizes).p && <p>P</p>}
          //     {JSON.parse(product.sizes).m && <p>M</p>}
          //     {JSON.parse(product.sizes).g && <p>G</p>}
          //     {JSON.parse(product.sizes).gg && <p>GG</p>}
          //   </div>
          //   <div>
          //     <button
          //       onClick={() => {
          //         deleteProduct(
          //           window.confirm(`Deseja deletar o produto ${product.name}`),
          //           product.id
          //         );
          //       }}
          //     >
          //       Excluir
          //     </button>
          //     <button
          //       onClick={() => {
          //         setValue(product);
          //         history.push(`${match.path}/product/edit/${product.id}`);
          //       }}
          //     >
          //       Editar
          //     </button>
          //   </div>
          // </div>
        ))}
      </div>

      <Switch>
        <Route path={`${match.path}/product/edit/:id`} component={Edit} />
        <Route path={`${match.path}/product/add`} component={Add} />
        <Route
          path={`${match.path}/product/trackorder`}
          component={TrackOrder}
        />
      </Switch>
    </div>
  );
}

export default Admin;
