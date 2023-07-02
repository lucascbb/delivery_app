import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestGet, requestPut } from '../services/request';
import Navbar from '../components/NavBar';
// import { sale } from '../../../back-end/src/database/controller';

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      sale: {},
      status: '',
      button: false,
    };
  }

  componentDidMount() {
    this.getSale();
  }

  getSale = async () => {
    const { location: { pathname } } = this.props;
    const last = pathname.split('/');
    const saleId = last[last.length - 1];

    const sale = await requestGet(`/seller/${saleId}`);

    const newDate = this.formatDate(sale.saleDate);
    this.setState({
      sale: { ...sale, saleDate: (await newDate).toString() },
      status: sale.status,
      button: sale.status !== 'Em Trânsito',
    });
    if (sale.products.length === 0) {
      window.location.reload();
    }
  };

  formatDate = async (date) => {
    const dateFormat = new Date(date);
    const ten = 10;
    const day = dateFormat.getDate() < ten
      ? (`0${dateFormat.getDate()}`) : dateFormat.getDate();
    const month = (dateFormat.getMonth() + 1).toString().padStart(2, '0');
    const year = dateFormat.getFullYear();
    const hours = dateFormat.getHours().toString().padStart(2, '0');
    const minutes = dateFormat.getMinutes().toString().padStart(2, '0');
    const seconds = dateFormat.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  checkSale = async () => {
    const { sale } = this.state;
    const newStatus = 'Entregue';
    const body = {
      userId: sale.user.id,
      sellerId: sale.seller.id,
      totalPrice: sale.totalPrice,
      deliveryAddress: sale.deliveryAddress,
      deliveryNumber: sale.deliveryNumber,
      status: newStatus,
    };
    this.setState({
      status: newStatus,
      button: true,
    });
    await requestPut(`/seller/${sale.id}`, body);
  };

  render() {
    const dataTest = 'customer_order_details__element-order-';
    const { sale, status, button } = this.state;
    return (
      sale.products ? (
        <>
          <Navbar />
          <h1>Detalhe do pedido</h1>
          <div>
            <div>
              <p
                data-testid={ `${dataTest}details-label-order-id` }
              >
                { `Pedido: ${sale.id}` }
              </p>
              <p
                data-testid={ `${dataTest}details-label-seller-name` }
              >
                { `Vendedor: ${sale.seller.name}` }
              </p>
              <p
                data-testid={ `${dataTest}details-label-order-date` }
              >
                { `${sale.saleDate}` }
              </p>
              <p
                data-testid={ `${dataTest}details-label-delivery-status${sale.id}` }
              >
                { status }
              </p>
              <p>
                { `Endereço: ${sale.deliveryAddress}, ${sale.deliveryNumber}` }
              </p>
              <button
                data-testid="customer_order_details__button-delivery-check"
                type="button"
                onClick={ this.checkSale }
                disabled={ button }
              >
                Marcar como entregue
              </button>
            </div>
            { sale.products ? sale.products.map((a, index) => (
              <div key={ index }>
                <p
                  data-testid={ `${dataTest}table-item-number-${index}` }
                >
                  { `${index + 1} -` }
                </p>
                <p
                  data-testid={ `${dataTest}table-name-${index}` }
                >
                  { a.name }
                </p>
                <p
                  data-testid={ `${dataTest}table-quantity-${index}` }
                >
                  { `Quantidade: ${a.SalesProduct.quantity}` }
                </p>
                <p
                  data-testid={ `${dataTest}table-sub-total-${index}` }
                >
                  { `Preço unitário: ${a.price}` }
                </p>
                <p
                  data-testid={ `${dataTest}table-unit-price-${index}` }
                >
                  {
                    `Preço total: ${(Number(a.SalesProduct.quantity)
                      * Number(a.price)).toFixed(2)}`
                  }
                </p>
              </div>
            )) : <p> Loading </p> }
            <p
              data-testid={ `${dataTest}total-price` }
            >
              Valor Total do pedido: R$
              <span>
                { sale.totalPrice.replace('.', ',') }
              </span>
            </p>
          </div>
        </>
      ) : <p> Loading </p>
    );
  }
}
Orders.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
export default connect()(Orders);
