import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {
  Button,
  Container,
  Dropdown,
  FormControl,
  Navbar,
} from "react-bootstrap";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";
const Header = () => {
  const {
    state: { cart },
    dispatch,
    filterState : {searchQuery},
    filterDispatch

  } = CartState();
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a product"
            className="m-auto"
            value = {searchQuery}
            onChange = {(e)=>filterDispatch({
              type:"FILTER_BY_SEARCH",
              payload:e.target.value
            })}
          />
        </Navbar.Text>
        <Dropdown alignright>
          <Dropdown.Toggle variant="success">
            <FaShoppingCart />
            {cart.length}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ minWidth: 250 }}>
            {cart.length > 0 ? (
              <>
                {cart.map((prod) => (
                  <span className="cartitem" key={prod.id}>
                    <img
                      src={prod.image}
                      className="cartItemImg"
                      alt={prod.name}
                    />
                    <div className="cartItemDetail">
                      <span>{prod.name}</span>
                      <span>₹ {prod.price.split(".")[0]}</span>
                    </div>
                    <AiFillDelete
                      fontSize="20px"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod,
                        })
                      }
                    />
                  </span>
                ))}
                <Link to="/cart">
                  <Button style={{ width: "95%", margin: "0 10px" }}>
                    Go To Cart
                  </Button>
                </Link>
              </>
            ) : (
              <span style={{ padding: 10 }}>Cart is Empty!</span>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default Header;
