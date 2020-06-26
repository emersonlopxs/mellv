import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import { Name } from "../../Store";
import { Container, Vazio } from "./styles.module.scss";

export default function Cart() {
  const [cart] = useState([]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div className={Container}>
      <h2>Carrinho</h2>

      <section>
        {cart.length === 0 ? (
          <p className={Vazio}>Seu Carrinho está vazio.</p>
        ) : (
          "carrinho"
        )}
      </section>

      <Link to="/">Retornar para a loja</Link>
    </div>
  );
}
