import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component';

import Card from './components/Card';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}>
      <CircularProgress />
    </div>
  );
}

const LoadableHome = Loadable({
  loader: () => import('./components/Home'),
  loading: Loader,
});
const LoadableAdmin = Loadable({
  loader: () => import('./components/Admin'),
  loading: Loader,
});
const LoadableProduct = Loadable({
  loader: () => import('./components/Product'),
  loading: Loader,
});
const LoadableAuth = Loadable({
  loader: () => import('./components/Auth'),
  loading: Loader,
});
const LoadableContact = Loadable({
  loader: () => import('./components/Contact'),
  loading: Loader,
});
const LoadableAbout = Loadable({
  loader: () => import('./components/About'),
  loading: Loader,
});
const LoadableCart = Loadable({
  loader: () => import('./components/Cart'),
  loading: Loader,
});
const LoadableMyAccount = Loadable({
  loader: () => import('./components/MyAccount'),
  loading: Loader,
});

function Camaleao() {
  return (
    <>
      <Navbar />
      <ReactNotification />
      <Switch>
        <Route exact path="/" component={LoadableHome} />
        <Route path="/auth" component={LoadableAuth} />
        <Route path="/my-account" component={LoadableMyAccount} />
        <Route path="/contact" component={LoadableContact} />
        <Route path="/about-us" component={LoadableAbout} />
        <Route path="/cart" component={LoadableCart} />
        <Route path="/product/:id" component={LoadableProduct} />
        <Route path="/admin" component={LoadableAdmin} />
        <Route path="/card" component={Card} />
      </Switch>
      <Footer />
    </>
  );
}

export default Camaleao;
