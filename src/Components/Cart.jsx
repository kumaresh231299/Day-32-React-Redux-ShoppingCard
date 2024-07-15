import React from 'react'
import { Button, Card, CardGroup, Carousel, Image, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { decrementProducts, incrementProducts, removeProducts } from '../Redux/Slice/CartSlice';

function Cart() {
    const data = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();

    const totalPrice = data.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    const totalQuantity = data.reduce((total, item) => total + (item.quantity || 1), 0);

    return (
        <div style={{ overflowX: "hidden" }}>
            {/* Navbar */}
            <Navbar expand="lg" fixed='top' className="bg-body-tertiary shadow">
                <Image className='logo' src='https://staging.svgrepo.com/show/259408/shopping-cart.svg' />
                <Navbar.Brand className='navbarTitle m-2  fs-2 '>Shopping Card</Navbar.Brand>
            </Navbar>

            {/* Top Card View of price details */}
            <Card>
                <div className='mt-5'>
                    <CardGroup className='p-3 bg-light shadow gap-3'
                        style={{ position: "fixed", top: 90, width:"100%", flexDirection:"row", zIndex: 10 }}>
                        <Card className='text-center bg-danger rounded text-white '>
                            <Card.Body>
                                <Card.Title>Delivery</Card.Title>
                                <Card.Text>Free</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className='text-center bg-success rounded text-white '>
                            <Card.Body>
                                <Card.Title>Total Quantity</Card.Title>
                                <Card.Text>{totalQuantity}</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className='text-center bg-info rounded '>
                            <Card.Body>
                                <Card.Title>SubTotal</Card.Title>
                                <Card.Text>${totalPrice.toFixed(2)}</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className='text-center bg-warning rounded '>
                            <Card.Body>
                                <Card.Title>Total</Card.Title>
                                <Card.Text>${totalPrice.toFixed(2)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </div>
                
                {/* Product count */}
                <div className='productCount' style={{ marginTop: "180px" }}>
                    {data.length ? (<h3 className='mx-3 my-3'>Total product({data.length})</h3>) :
                        (<span className='text-center'>Currently no products availble<span className='fs-5'>😟</span></span>)}
                </div>

                {/* All Product details */}
                <div className='heroSession'
                    style={{ zIndex: 2 }}>
                    {data.map((element, index) => {
                        return (
                            <Card key={index} className='mb-3'>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        {/* Carousel images */}
                                        <Carousel data-bs-theme="dark" >
                                            {element.images.map((ele, i) => (
                                                <Carousel.Item key={i} interval={1000} >
                                                    <img
                                                        className='d-block w-100 m-1'
                                                        src={ele} alt={`Slide ${i + 1}`}
                                                        style={{ height: "400px", objectFit: "contain" }}
                                                    />
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                    </div>
                                    {/* Product description */}
                                    <div className='col-md-5'>
                                        <Card.Body>
                                            <Card.Title>{element.title}</Card.Title>
                                            <Card.Subtitle className='mb-2 text-muted fw-bold'>Details & Core </Card.Subtitle>
                                            <Card.Text className='fw-bold' style={{ color: "darkgray" }}>{element.description}</Card.Text>
                                        </Card.Body>
                                    </div>
                                    {/* price & Quantity */}
                                    <div className='col-md-2 d-flex flex-column align-items-center m-4'>
                                        <h4>${element.price * (element.quantity || 1)}</h4>
                                        <div className='d-flex align-items-center gap-2 m-4'>
                                            <Button variant='outline-secondary' onClick={() => dispatch(decrementProducts(element.id))}>-</Button>
                                            <Card.Text>{element.quantity || 1}</Card.Text>
                                            <Button variant='outline-secondary' onClick={() => dispatch(incrementProducts(element.id))}>+</Button>
                                        </div>
                                        <Button variant='danger' onClick={() => dispatch(removeProducts(element.id))}>Remove</Button>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </Card>
        </div>
    );
}

export default Cart

