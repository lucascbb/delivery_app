/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiOutlineAlert } from 'react-icons/ai';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { BsHouseCheck } from 'react-icons/bs';
import { BiDrink } from 'react-icons/bi';
import { requestGet, requestPut } from '../services/request';
import Navbar from '../components/NavBar';
import '../styles/orderDetails.css';
import paperBag from '../images/wine-black.png';

class SaleDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      sale: {},
      status: '',
      disablePreparing: true,
      disableInTransit: true,
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
      disablePreparing: sale.status !== 'Pendente',
      disableInTransit: sale.status !== 'Preparando',
    });
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
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  };

  checkPreparing = async () => {
    const { sale } = this.state;
    const newStatus = 'Preparando';
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
      disableInTransit: sale.status === 'Preparando',
      disablePreparing: true,
    });
    await requestPut(`/seller/${sale.id}`, body);
  };

  checkInTransit = async () => {
    const { sale } = this.state;
    const newStatus = 'Em Trânsito';
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
      disableInTransit: true,
    });
    await requestPut(`/seller/${sale.id}`, body);
  };

  render() {
    const dataTest = 'seller_order_details__element-order-';
    const userString = localStorage.getItem('user');
    const { role } = JSON.parse(userString);
    console.log(role);
    const { sale, status, disablePreparing, disableInTransit } = this.state;
    return (
      sale.products ? (
        <>
          <Navbar />
          <section className="container-OrderDetails">
            <h2>Detalhes do pedido</h2>
            <article>
              <div className="main-OrderDetails">
                <div>
                  <img src={ paperBag } alt="icon paper bag" />
                </div>
                <div>
                  <h3
                    data-testid={ `${dataTest}details-label-order-id` }
                  >
                    PEDIDO
                    {' '}
                    { sale.id }
                  </h3>
                  <p
                    data-testid={ `${dataTest}details-label-seller-name` }
                    className="seller-OrderDetails"
                  >
                    Vendedor(a):
                    {' '}
                    { sale.seller.name }
                  </p>
                  <em
                    data-testid={ `${dataTest}details-label-order-date` }
                    className="date-OrderDetails"
                  >
                    { sale.saleDate }
                  </em>
                  <p
                    data-testid={ `${dataTest}details-label-delivery-status${sale.id}` }
                    className={ `${status}-OrderDetails` }
                  >
                    {status === 'Pendente'
                    && <AiOutlineAlert className="icon1-OrderDetails" />}
                    {status === 'Preparando'
                    && <BiDrink className="icon2-OrderDetails" />}
                    {status === 'Em Trânsito'
                    && <MdOutlineDeliveryDining className="icon3-OrderDetails" />}
                    {status === 'Entregue'
                    && <BsHouseCheck className="icon3-OrderDetails" />}
                    { status }
                  </p>
                  <button
                    data-testid="seller_order_details__button-preparing-check"
                    type="button"
                    onClick={ this.checkPreparing }
                    className="prepareBtn"
                    disabled={
                      disablePreparing
                      || role !== 'seller'
                    }
                  >
                    Preparar pedido
                  </button>
                  <button
                    data-testid="seller_order_details__button-dispatch-check"
                    type="button"
                    onClick={ this.checkInTransit }
                    className="deliveryBtn"
                    disabled={
                      disableInTransit
                      || role !== 'seller'
                    }
                  >
                    Saiu para entrega
                  </button>
                </div>
              </div>
              <div className="details-OrderDetails">
                { sale.products ? sale.products.map((a, index) => (
                  <div key={ index } className="allProducts-OrderDetails">
                    <img src={ a.urlImage } alt="imagem do produto" />
                    <div className="produto-OrderDetails">
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
                        <b>Quantidade: </b>
                        { `${a.SalesProduct.quantity}` }
                      </p>
                      <p
                        data-testid={ `${dataTest}table-sub-total-${index}` }
                      >
                        <b>Preço Unitário: </b>
                        { `R$ ${a.price}` }
                      </p>
                      <p
                        data-testid={ `${dataTest}table-unit-price-${index}` }
                      >
                        <b>Preço total: </b>
                        {`R$ ${(Number(a.SalesProduct.quantity)
                          * Number(a.price)).toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                )) : <p> Loading... </p> }
              </div>
              <p
                data-testid={ `${dataTest}total-price` }
                className="total-OrderDetails"
              >
                Total: R$
                <span>
                  { sale.totalPrice.replace('.', ',') }
                </span>
              </p>

            </article>
          </section>
        </>
      ) : <p> Loading </p>
    );
  }
}
SaleDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
export default connect()(SaleDetails);
