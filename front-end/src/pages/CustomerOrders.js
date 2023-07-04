import React from 'react';
import PropTypes from 'prop-types';
import { TbShoppingCartOff } from 'react-icons/tb';
import Navbar from '../components/NavBar';
import UserCard from '../components/UserCard';
import { requestGet } from '../services/request';
import '../styles/orders.css';

class CustomerOrders extends React.Component {
  constructor() {
    super();
    this.state = {
      ordersArray: [],
    };
  }

  async componentDidMount() {
    const bd = await requestGet('seller/orders');

    const { id } = JSON.parse(localStorage.getItem('user'));

    const arrayCustomer = bd.filter((e) => e.userId === id);

    this.setState({
      ordersArray: arrayCustomer,
    });
  }

  handleClickOrder(orderId) {
    const { history } = this.props;
    history.push(`/customer/orders/${orderId}`);
  }

  render() {
    const { ordersArray } = this.state;
    return (
      <>
        <Navbar />
        <section className="main-sellerOrder">
          {ordersArray.length > 0 ? (
            ordersArray.map((order, i) => (
              <button
                type="button"
                key={ i }
                onClick={ () => {
                  this.handleClickOrder(order.id);
                } }
                className="btn-sellerOrder"
              >
                <UserCard
                  key={ i }
                  orderNum={ order.id }
                  status={ order.status }
                  saleDate={ order.saleDate }
                  totalPrice={ order.totalPrice }
                  deliveryAddress={ order.deliveryAddress }
                  deliveryNumber={ order.deliveryNumber }
                />
              </button>
            ))
          ) : (
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

CustomerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default CustomerOrders;
