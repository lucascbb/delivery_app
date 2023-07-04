import React from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import paperBag from '../images/wine.png';

class UserCard extends React.Component {
  render() {
    const formatDate = (dateString) => {
      const dateFormat = new Date(dateString);
      const ten = 10;
      const day = dateFormat.getDate() < ten
        ? (`0${dateFormat.getDate()}`) : dateFormat.getDate();
      const month = (dateFormat.getMonth() + 1).toString().padStart(2, '0');
      const year = dateFormat.getFullYear();
      const hours = dateFormat.getHours().toString().padStart(2, '0');
      const minutes = dateFormat.getMinutes().toString().padStart(2, '0');
      return `${day}/${month}/${year} às ${hours}:${minutes}`;
    };

    const formatterBrl = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const {
      orderNum,
      status,
      saleDate,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
    } = this.props;

    return (
      <section className="container-order-card">
        <div
          data-testid={ `customer_orders__element-order-id-${orderNum}` }
          className="order-num"
        >
          <div>
            <img src={ paperBag } alt="" />
            <p>
              Pedido
              {' '}
              {orderNum}
            </p>
          </div>
          <MdOutlineArrowForwardIos className="icon-OrderCard" />
        </div>
        <div className="order-details">
          <div className={ `${status}-lineCard` } />
          <div>
            <p
              data-testid={ `customer_orders__element-delivery-status-${orderNum}` }
              className={ `${status}-orderCard` }
            >
              {status}
            </p>
            <p
              data-testid={ `customer_orders__element-order-date-${orderNum}` }
              className="date-OrderCard"
            >
              {formatDate(saleDate)}
            </p>
          </div>
          <div>
            <p
              data-testid={ `seller_orders__element-card-price-${orderNum}` }
            >
              <span>Total:</span>
              {' '}
              {formatterBrl.format(totalPrice)}
            </p>
            <p
              data-testid={ `seller_orders__element-card-address-${orderNum}` }
            >
              <span>Endereço:</span>
              {' '}
              {deliveryAddress}
            </p>
            <p
              data-testid={ `seller_orders__element-card-address-${orderNum}` }
            >
              <span>Número:</span>
              {' '}
              {deliveryNumber}
            </p>
          </div>
        </div>
      </section>
    );
  }
}

UserCard.propTypes = {}.isRequired;

export default UserCard;
