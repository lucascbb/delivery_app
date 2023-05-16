import React from 'react';

class UserCard extends React.Component {
  render() {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const dia = date.getDate().toString().padStart(2, '0');
      const mes = (date.getMonth() + 1).toString().padStart(2, '0');
      const ano = date.getFullYear().toString();
      return `${dia}/${mes}/${ano}`;
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
    } = this.props;

    return (
      <section>
        <div data-testid={ `customer_orders__element-order-id-${orderNum}` }>
          <p>Pedido</p>
          <p>{orderNum}</p>
        </div>
        <div>
          <div>
            <p data-testid={ `customer_orders__element-delivery-status-${orderNum}` }>
              {status.toUpperCase()}
            </p>
            <p data-testid={ `customer_orders__element-order-date-${orderNum}` }>
              {formatDate(saleDate)}
            </p>
            <p data-testid={ `customer_orders__element-card-price-${orderNum}` }>
              {formatterBrl.format(totalPrice)}
            </p>
          </div>
        </div>
      </section>
    );
  }
}

UserCard.propTypes = {}.isRequired;

export default UserCard;
