/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import CheckoutTable from '../components/CheckoutTable';

import { postHeader, requestGet, requestPost } from '../services/request';
import { setLocalStorage, getLocalStorage } from '../helpers/index';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
      shoppingCartValue: 0.00,
      sellers: [],
      details: {
        userId: '',
        sellerId: '',
        address: '',
        addressNumber: '',
      },
    };
  }

  componentDidMount() {
    this.getShoppingCart();
    this.getUsers();
  }

  getUsers = async () => {
    const thisUser = getLocalStorage('user');
    const { details } = this.state;
    const users = await requestGet('/user');

    const userId = users.find((a) => (
      a.name === thisUser.name
    ));

    this.handleComponent([{
      name: 'sellers',
      value: users.filter((e) => e.role === 'seller' && e.id !== thisUser.id) },
    { name: 'details', value: { ...details, userId: userId.id } }]);
  };

  getShoppingCart = () => {
    const shoppingCart = getLocalStorage('shoppingCart');
    const shoppingCartValue = getLocalStorage('shoppingCartValue');
    if (shoppingCart === null) {
      setLocalStorage([{ name: 'shoppingCart', value: [] },
        { name: 'shoppingCartValue', value: 0 }]);
    } else {
      this.setState({
        shoppingCart,
        shoppingCartValue,
      });
    }
  };

  finish = async () => {
    const { history } = this.props;
    const thisUser = getLocalStorage('user');
    const { shoppingCartValue, details, shoppingCart } = this.state;

    const body = {
      userId: details.userId,
      sellerId: details.sellerId,
      totalPrice: shoppingCartValue,
      deliveryAddress: details.address,
      deliveryNumber: details.addressNumber,
      status: 'Pendente',
    };
    const response = await postHeader('/seller/orders', body, thisUser.token);
    const products = shoppingCart.map((p) => p);

    const secondBody = {
      id: response.id,
      products,
    };

    await requestPost('/sale', secondBody);

    localStorage.removeItem('shoppingCart');
    history.push(`/customer/orders/${response.id}`);
  };

  handleChange = (key, value) => {
    const { details } = this.state;
    this.setState({
      details: { ...details, [key]: value },
    });
  };

  handleComponent = (components) => {
    components.forEach((component) => {
      this.setState({
        [component.name]: component.value,
      });
    });
  };

  render() {
    const { shoppingCartValue, shoppingCart, sellers, details } = this.state;
    return (
      <>
        <NavBar />
        <div className="paiCheckout">
          <h1 className="title-checkout"> FINALIZAR PEDIDO </h1>
          { shoppingCart.length > 0
            ? (
              <CheckoutTable
                shoppingCart={ shoppingCart }
                shoppingCartValue={ shoppingCartValue }
                handleComponent={ this.handleComponent }
              />
            )
            : <p className="noProdu-checkout"> Você não possui produtos no carrinho  </p>}
          <p className="price-checkout">
            Total: R$
            <span
              data-testid="customer_checkout__element-order-total-price"
            >
              {(shoppingCartValue).toFixed(2).replace('.', ',')}
            </span>
          </p>
          <form className="form-checkout">
            <h2 className="title2-checkout"> Detalhes e Endereço para Entrega </h2>
            <div className="inputs-Checkout">
              <label htmlFor="seller">
                <span>Pessoa Vendedora</span>
                <select
                  id="seller"
                  name="seller"
                  data-testid="customer_checkout__select-seller"
                  value={ details.sellerId }
                  onChange={ (e) => this.handleChange(
                    'sellerId',
                    Number(e.target.value),
                  ) }
                >
                  <option value="" disabled>Selecione um vendedor</option>
                  {sellers.map((user) => (
                    <option
                      key={ user.name }
                      value={ user.id }
                    >
                      {user.name}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="address">
                <span>Endereço</span>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={ details.address }
                  onChange={ (e) => this.handleChange('address', e.target.value) }
                  data-testid="customer_checkout__input-address"
                />
              </label>
              <label
                htmlFor="address-number"
              >
                <span>Número</span>
                <input
                  id="address-number"
                  name="address-number"
                  type="number"
                  placeholder="0"
                  value={ details.addressNumber }
                  onChange={ (e) => this.handleChange('addressNumber', e.target.value) }
                  data-testid="customer_checkout__input-address-number"
                />
              </label>
            </div>
            <div className="btn-checkout">
              <button
                type="button"
                disabled={
                  details.address === ''
                || details.addressNumber === ''
                || details.sellerId === ''
                || details.userId === ''
                || shoppingCartValue === 0
                }
                data-testid="customer_checkout__button-submit-order"
                onClick={ () => this.finish() }
              >
                FINALIZAR PEDIDO
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Checkout);
