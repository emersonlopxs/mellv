import React, { useState, useEffect } from 'react';
import api from '../../../api';
import { Container, Sizes, Imagens } from './styles.module.scss';
// import { useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';
// import { animateScroll } from 'react-scroll';

function Add({ setActive }) {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  // const history = useHistory();

  const [product, setProduct] = useState({
    name: '',
    type: 1,
    price: '',
    sizes: [
      {
        pp: false,
        p: false,
        m: false,
        g: false,
        gg: false,
      },
    ],
    description: '',
    images: [''],
  });

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
    // console.log(data);
    try {
      await api.post('/products/create', data).then(() => {
        store.addNotification({
          title: 'Produto Adcionado!',
          message: 'O produto foi adcionado com successo!',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 8000,
            onScreen: true,
          },
        });

        // history.push('/admin');
        // perguntar se quer adcionar mais ou apenas 1
        setActive(0)
      });
    } catch (error) {
      console.log(error);
      store.addNotification({
        title: 'Ooops',
        message: 'Houve um erro ao adcionar o produto',
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 8000,
          onScreen: true,
        },
      });
    }
  }
  return (
    <div className={Container}>
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
          onChange={(e) => setProduct({ ...product, type: e.target.value })}>
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
          {product.images.map((value, i) => (
            <input
              key={i}
              placeholder={`Imagem ${i + 1}`}
              type="text"
              value={value}
              onChange={(e) =>
                setProduct({
                  ...product,
                  images: product.images.map((value, j) => {
                    if (i === j) value = e.target.value;
                    return value;
                  }),
                })
              }
            />
          ))}
          <button
            type="button"
            onClick={() => {
              setProduct((prev) => ({
                ...prev,
                images: [...prev.images, ''],
              }));
            }}>
            +
          </button>
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
export default Add;
