import React, { useState, useEffect } from 'react';
import api from '../../../api';
import { Container, Sizes, Imagens, AddContainer } from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import Card from '../../Card';

function Edit({ match }) {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  const [product, setProduct] = useState({
    name: JSON.parse(localStorage.getItem('ProductEdit')).name,
    type: JSON.parse(localStorage.getItem('ProductEdit')).type,
    price: JSON.parse(localStorage.getItem('ProductEdit')).price,
    sizes: [JSON.parse(JSON.parse(localStorage.getItem('ProductEdit')).sizes)],
    description: JSON.parse(localStorage.getItem('ProductEdit')).description,
    images: JSON.parse(localStorage.getItem('ProductEdit')).images,
  });

  const history = useHistory();

  async function handleCreate(e) {
    e.preventDefault();
    const data = {
      name: product.name,
      type: parseInt(product.type),
      price: product.price,
      sizes: product.sizes,
      description: product.description,
      images: product.images,
    };
    try {
      await api.put(`/products/update/${match.params.id}`, data).then(() => {
        alert('Produto editado');
        history.push('/admin');
      });
    } catch (error) {
      console.log(error);
    }
  }
  // console.log('Params ->', match.params.id);

  return (
    <div className={AddContainer}>
      <div className={Container}>
        <Card
          to="#"
          primaryImage={product.images[0]}
          secundaryImage={product.images[1]}
          title={product.name}
          price={product.price}
          styleBtn2={{ background: 'red' }}
          nameBtn1={'Editar'}
          nameBtn2={'Deletar'}
        />
        <form onSubmit={handleCreate}>
          <label>Nome</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />

          <label>Tipo</label>
          <select
            value={product.type}
            onChange={(e) => setProduct({ ...product, type: e.target.value })}
          >
            <option value={1}>Tipo 1</option>
            <option value={2}>Tipo 2</option>
          </select>
          <label>Preço</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />

          <label>Tamanhos</label>
          <div className={Sizes}>
            <label>PP</label>
            <input
              type="checkbox"
              checked={product.sizes[0].pp}
              onChange={() => {
                setProduct((e) => ({
                  ...e,
                  sizes: [{ ...e.sizes[0], pp: !product.sizes[0].pp }],
                }));
              }}
            />
            <label>P</label>
            <input
              type="checkbox"
              checked={product.sizes[0].p}
              onChange={() => {
                setProduct((e) => ({
                  ...e,
                  sizes: [{ ...e.sizes[0], p: !product.sizes[0].p }],
                }));
              }}
            />
            <label>M</label>
            <input
              type="checkbox"
              checked={product.sizes[0].m}
              onChange={() => {
                setProduct((e) => ({
                  ...e,
                  sizes: [{ ...e.sizes[0], m: !product.sizes[0].m }],
                }));
              }}
            />
            <label>G</label>
            <input
              type="checkbox"
              checked={product.sizes[0].g}
              onChange={() => {
                setProduct((e) => ({
                  ...e,
                  sizes: [{ ...e.sizes[0], g: !product.sizes[0].g }],
                }));
              }}
            />
            <label>GG</label>
            <input
              type="checkbox"
              checked={product.sizes[0].gg}
              onChange={() => {
                setProduct((e) => ({
                  ...e,
                  sizes: [{ ...e.sizes[0], gg: !product.sizes[0].gg }],
                }));
              }}
            />
          </div>
          <label>Descrição</label>
          <input
            type="text"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />

          <label>Imagens</label>
          <div className={Imagens}>
            <input
              placeholder="Imagem 1"
              type="text"
              value={product.images}
              onChange={(e) => {
                setProduct({ ...product, images: [e.target.value] });
              }}
            />
          </div>

          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
export default Edit;
