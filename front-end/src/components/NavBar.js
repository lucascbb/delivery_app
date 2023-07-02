import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaWineBottle } from 'react-icons/fa';
import { HiShoppingCart } from 'react-icons/hi';
import { TbLogout } from 'react-icons/tb';
import '../styles/navBar.css';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      role: '',
    };
  }

  componentDidMount() {
    const { role } = JSON.parse(localStorage.getItem('user'));
    this.setState({ role });
  }

  render() {
    const { role } = this.state;

    return (
      <nav>
        <div className="paiLinks-nav">
          <div className="nav-link">
            <Link
              to="/customer/products"
              data-testid="customer_products__element-navbar-link-products"
              className="linkProdutos"
            >
              <FaWineBottle className="iconProdutos" />
              <p>Produtos</p>
            </Link>
            {role === 'seller'
              ? (
                <Link
                  to="/seller/orders"
                  className="linkPedidos"
                >
                  <HiShoppingCart className="iconProdutos" />
                  <p
                    data-testid="customer_products__element-navbar-link-orders"
                  >
                    Pedidos
                  </p>
                </Link>
              ) : null}
            {role === 'customer'
              ? (
                <Link
                  to="/customer/orders"
                  data-testid="customer_products__element-navbar-link-orders"
                  className="linkPedidos"
                >
                  <HiShoppingCart className="iconProdutos" />
                  <p>
                    Pedidos
                  </p>
                </Link>
              ) : null}
            {role === 'administrator'
              ? (
                <Link
                  to="/admin/manage"
                  data-testid="customer_products__element-navbar-link-orders"
                  className="linkAdmin"
                >
                  <p>
                    Admin Page
                  </p>
                </Link>
              ) : null}
          </div>
        </div>
        <div className="paiName-nav">
          <p
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { JSON.parse((localStorage.getItem('user'))).name }
          </p>
        </div>
        <div className="paiSair-nav">
          <Link
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => localStorage.clear() }
            to="/login"
            className="linkSair"
          >
            <TbLogout className="iconSairProdutos" />
            <p>Sair</p>
          </Link>
        </div>
      </nav>
    );
  }
}

export default connect()(NavBar);
