import React from 'react'
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart'; 
import { useAuth } from '../context/auth';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    // remove item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    const totalItem = () => {
        try {
            let total = 0;
            cart.map((item) => {
                total += item.price;
            });

            return total.toExponential("vi-VN", {
                style: "currency",
                currency: "VND"
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2'>
                            {cart?.length > 1
                                ? `You have ${cart.length} items in cart ${
                                    auth.token ? "" : "Please login to checkout"
                                }`  
                                : "Your cart is empty"}
                        </h1>
                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-7 p-0 m-0'>
                            {cart?.map(p => (
                                <div className='row cart flex-row' key={p._id}>
                                    <div className='col-md-4'>
                                        <img 
                                            className='card-img-top'
                                            width="100%"
                                            height={'130xp'}
                                            alt={p.name}
                                            src={`/api/v1/product/product-image/${p._id}`}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price: {p.price}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => removeCartItem(p._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='col-md-5'>
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <h4>Toatal: {totalItem()}</h4>
                        </div>
                    </div>
                </div>
            </div>
            
        </Layout>
    )
}

export default CartPage