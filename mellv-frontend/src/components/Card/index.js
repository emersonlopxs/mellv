import React from 'react';
import {
  Container,
  Images,
  Images2,
  Buttons,
  Description,
} from './styles.module.scss';

function Card({
  styleBtn1,
  styleBtn2,
  nameBtn1,
  nameBtn2,
  clickBtn1,
  clickBtn2,
  price,
  primaryImage,
  secundaryImage,
  title,
  p,
  pp,
  m,
  g,
  gg,
}) {
  let styleImage;
  if (secundaryImage) {
    styleImage = Images;
  } else {
    styleImage = Images2;
  }
  return (
    <div className={Container}>
      <div className={styleImage}>
        <img src={primaryImage} alt="Imagem do prduto" />
        <img src={secundaryImage} alt="Imagem do prduto" />
        <div className={Buttons}>
          <button style={styleBtn1} onClick={clickBtn1}>
            {nameBtn1}
          </button>
          <button style={styleBtn2} onClick={clickBtn2}>
            {nameBtn2}
          </button>
        </div>
      </div>

      <div className={Description}>
        <h2>{title}</h2>
        <span>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price)}
        </span>
        <div>
          {pp && <p>PP</p>}
          {p && <p>P</p>}
          {m && <p>M</p>}
          {g && <p>G</p>}
          {gg && <p>GG</p>}
        </div>
      </div>
    </div>
  );
}
export default Card;
