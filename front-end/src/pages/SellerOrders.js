import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TbShoppingCartOff } from 'react-icons/tb';
import Navbar from '../components/NavBar';
import OrderCard from '../components/SellerOrders/OrderCard';
import { requestGet } from '../services/request';

class SellerOrders extends Component {
  constructor() {
    super();

    this.state = {
      ordersArray: [],
    };
  }

  async componentDidMount() {
    const response = await requestGet('seller/orders');

    const { id } = JSON.parse(localStorage.getItem('user'));
    const arraySeller = response.filter((e) => e.sellerId === id);

    this.setState({
      ordersArray: arraySeller,
    });
  }

  handleClickOrder(orderId) {
    const { history } = this.props;
    history.push(`/seller/orders/${orderId}`);
  }

  render() {
    const { ordersArray } = this.state;

    return (
      <>
        <Navbar />
        <section className="main-sellerOrder">
          { ordersArray.length > 0 ? ordersArray.map((order, key) => (
            <button
              type="button"
              key={ key }
              className="btn-sellerOrder"
              onClick={ () => this.handleClickOrder(order.id) }
            >
              <OrderCard
                key={ key }
                orderNum={ order.id }
                status={ order.status }
                saleDate={ order.saleDate }
                totalPrice={ order.totalPrice }
                deliveryAddress={ order.deliveryAddress }
                deliveryNumber={ order.deliveryNumber }
              />
            </button>
          ))
            : (
              <article className="noProduct-sellerOrder">
                <TbShoppingCartOff className="icon-sellerOrder" />
                <h3>Sem pedidos ainda</h3>
              </article>
            )}
        </section>
      </>
    );
  }
}

SellerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(SellerOrders);
