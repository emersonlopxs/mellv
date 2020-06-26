import React, { useState, useEffect } from 'react';

import {
  Container,
  Item,
  Images,
  Image,
  Options,
  PayPal,
  Info,
  InputGroup,
  Avaliation,
  InpoutGroup,
  CheckboxGroup,
  HorizontalShowcase,
  Description,
  FormContainer,
  Coments,
  Stars,
  Section,
  Sizes,
} from './styles.module.scss';
import Segment from '../Segment';
import PayPalLogo from '../../assets/images/PayPal.svg';
import api from '../../api';
import RelatedProducts from '../RelatedProducts';
import { AiFillStar } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';

function Product({ match }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    window.scroll(0, 200);
  }, []);
  useEffect(() => {
    async function getRelatedProducts() {
      try {
        await api.get('/products').then((response) => {
          setRelatedProducts(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getRelatedProducts();
  }, []);

  const product = {
    name: JSON.parse(localStorage.getItem('Product'))[match.params.id].name,
    type: JSON.parse(localStorage.getItem('Product'))[match.params.id].type,
    price: JSON.parse(localStorage.getItem('Product'))[match.params.id].price,
    sizes: [
      JSON.parse(
        JSON.parse(localStorage.getItem('Product'))[match.params.id].sizes
      ),
    ],
    description: JSON.parse(localStorage.getItem('Product'))[match.params.id]
      .description,
    images: JSON.parse(localStorage.getItem('Product'))[match.params.id].images,
  };
  const [bigImage, setBigImage] = useState(product.images[0]);

  const [purchase, setPurchase] = useState({
    amount: 1,
    avaliation: '',
    stars: 0,
    name: '',
    email: '',
    saveData: false,
    size: '',
  });

  function handleSubmit() {
    console.log('Eviar');
  }

  function zoomIn() {}

  return (
    <>
      <div className={Container}>
        <Segment name={product.name} />
        <div className={Section}>
          <div className={Item}>
            <div className={Images}>
              {product.images.map((item) => (
                <img
                  key={product.images.indexOf(item)}
                  src={item}
                  alt="Imagem do produto"
                  onClick={() => setBigImage(item)}
                />
              ))}
            </div>
            <div className={Image} onMouseOver={zoomIn}>
              <img src={bigImage} alt="Imagem do produto" />
            </div>
          </div>

          <div className={Options}>
            <h1>{product.name}</h1>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(product.price)}
            </p>
            {product.sizes.map((item) => (
              <select
                key={0}
                className={Sizes}
                value={purchase.size}
                onChange={(e) =>
                  setPurchase({ ...purchase, size: e.target.value })
                }>
                <option value="">Selecione um tamanho</option>
                {item.pp && <option value="pp">PP</option>}
                {item.p && <option value="p">P</option>}
                {item.m && <option value="m">M</option>}
                {item.g && <option value="g">G</option>}
                {item.gg && <option value="gg">GG</option>}
              </select>
            ))}
            <div className={InputGroup}>
              <input
                type="number"
                min="1"
                value={purchase.amount}
                onChange={(e) =>
                  setPurchase({ ...purchase, amount: e.target.value })
                }
              />
              <button>COMPRAR</button>
            </div>
            <div className={PayPal}>
              <button>
                <img src={PayPalLogo} alt="PayPal Logo" />
                <p>Compara agora</p>
              </button>
            </div>
            <div className={Info}>
              <p>REF: 00000003</p>
              <p>Categoria</p>
            </div>
          </div>
        </div>
      </div>

      <div className={Description}>
        <h2>Descrição</h2>
        <p>{product.description}</p>
      </div>

      <div className={Avaliation}>
        <div className={Coments}>
          <h2>Avaliaçôes</h2>
          <div>
            <div>
              <BsFillPersonFill size={32} />
              <p>Lucas Filipe</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
              deserunt nisi, deleniti quae natus itaque eius corporis, veritatis
              temporibus repellendus voluptatum fugit magni numquam, nulla harum
              ullam corrupti. Totam, incidunt.
            </p>
          </div>
          <div>
            <div>
              <BsFillPersonFill size={32} />
              <p>Lucas Filipe</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
              deserunt nisi, deleniti quae natus itaque eius corporis, veritatis
              temporibus repellendus voluptatum fugit magni numquam, nulla harum
              ullam corrupti. Totam, incidunt.
            </p>
          </div>
          <div>
            <div>
              <BsFillPersonFill size={32} />
              <p>Lucas Filipe</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
              deserunt nisi, deleniti quae natus itaque eius corporis, veritatis
              temporibus repellendus voluptatum fugit magni numquam, nulla harum
              ullam corrupti. Totam, incidunt.
            </p>
          </div>
        </div>
        <form className={FormContainer} onSubmit={handleSubmit}>
          <p>
            O seu endereço de e-mail não será publicado. Campos obrigatórios são
            marcados com <strong>*</strong>
          </p>
          <div className={Stars}>
            Sua avaliação
            <div>
              <AiFillStar
                size={20}
                style={{
                  color: `${
                    purchase.stars === 1 ||
                    purchase.stars === 2 ||
                    purchase.stars === 3 ||
                    purchase.stars === 4 ||
                    purchase.stars === 5
                      ? '#000'
                      : ' #757780'
                  }`,
                }}
                onClick={() => setPurchase({ ...purchase, stars: 1 })}
              />
              <AiFillStar
                size={20}
                style={{
                  color: `${
                    purchase.stars === 2 ||
                    purchase.stars === 3 ||
                    purchase.stars === 4 ||
                    purchase.stars === 5
                      ? '#000'
                      : ' #757780'
                  }`,
                }}
                onClick={() => setPurchase({ ...purchase, stars: 2 })}
              />
              <AiFillStar
                size={20}
                style={{
                  color: `${
                    purchase.stars === 3 ||
                    purchase.stars === 4 ||
                    purchase.stars === 5
                      ? '#000'
                      : ' #757780'
                  }`,
                }}
                onClick={() => setPurchase({ ...purchase, stars: 3 })}
              />
              <AiFillStar
                size={20}
                style={{
                  color: `${
                    purchase.stars === 4 || purchase.stars === 5
                      ? '#000'
                      : ' #757780'
                  }`,
                }}
                onClick={() => setPurchase({ ...purchase, stars: 4 })}
              />
              <AiFillStar
                size={20}
                style={{
                  color: `${purchase.stars === 5 ? '#000' : ' #757780'}`,
                }}
                onClick={() => setPurchase({ ...purchase, stars: 5 })}
              />
            </div>
          </div>
          <p>
            Sua avaliação sobre o produto <strong>*</strong>
          </p>
          <textarea
            type="text"
            onChange={(e) =>
              setPurchase({ ...purchase, avaliation: e.target.value })
            }
            value={purchase.avaliation}
          />
          <div className={InpoutGroup}>
            <div>
              <label>
                Nome<strong>*</strong>
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setPurchase({ ...purchase, name: e.target.value })
                }
                value={purchase.name}
              />
            </div>
            <div>
              <label>
                E-mail<strong>*</strong>
              </label>
              <input
                type="email"
                onChange={(e) =>
                  setPurchase({ ...purchase, email: e.target.value })
                }
                value={purchase.email}
              />
            </div>
          </div>
          <div className={CheckboxGroup}>
            <input
              type="checkbox"
              checked={purchase.saveData}
              onChange={(e) =>
                setPurchase({ ...purchase, saveData: !purchase.saveData })
              }
            />
            <p>
              Salvar meus dados neste navegador para a próxima vez que eu
              comentar.
            </p>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>

      <div className={HorizontalShowcase}>
        {relatedProducts.map((item) => (
          <RelatedProducts
            key={item.id}
            // to={() => handleitem(item)}
            primaryImage={item.images[0]}
            secundaryImage={item.images[1]}
            title={item.name}
            price={item.price}
            styleBtn2={{ background: 'green' }}
            nameBtn1={'Ver Produto'}
            nameBtn2={'Compra Rápida'}
            // pp={JSON.parse(product.sizes).pp}
            // p={JSON.parse(product.sizes).p}
            // m={JSON.parse(product.sizes).m}
            // g={JSON.parse(product.sizes).g}
            // gg={JSON.parse(product.sizes).gg}
            // clickBtn1={() => handleProduct(product)}
            // clickBtn2={() => {
            //   console.log('Compra Rápida');
            // }}
          />
        ))}
      </div>
    </>
  );
}
export default Product;
