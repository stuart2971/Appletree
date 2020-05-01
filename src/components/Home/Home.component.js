import React from "react"

import "./Home.css";
import "./styles/vendors/bootstrap.min.css";
import "./styles/vendors/magnific-popup.css";
import "./styles/vendors/owl.carousel.min.css";
import "./styles/vendors/owl.theme.default.min.css";
import "./styles/vendors/themify-icons.css";
import "./styles/scss/style.scss";

import OrderForm from "./vendors/OrderForm/OrderForm.component";
import CardGrid from "./vendors/FoodItemCards/CardGrid.component";
import MenuAccordian from "./vendors/MenuItem/MenuAccordian.component";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <section className="hero-banner">
                    <div className="hero-wrapper">
                        <div className="hero-left">
                            <h1 className="hero-title">Foods the <br /> most precious things</h1>
                            <div className="d-sm-flex flex-wrap">
                                <a className="button button-hero button-shadow" href="#OrderForm">Order Now</a>
                            </div>
                            <ul className="hero-info d-none d-lg-block">
                                <li>
                                    <img src="/images/fas-service-icon.png" />

                                    <h4>Fast Service</h4>
                                </li>
                                <li>
                                    <img src="/images/fresh-food-icon.png" alt="" />
                                    <h4>Fresh Food</h4>
                                </li>
                            </ul>
                        </div>

                        
                        <ul className="social-icons d-none d-lg-block">
                            <li><a href="#"><i className="ti-facebook"></i></a></li>
                            <li><a href="#"><i className="ti-twitter"></i></a></li>
                            <li><a href="#"><i className="ti-instagram"></i></a></li>
                        </ul>
                    </div>
                </section>

                <section className="about section-margin pb-xl-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-xl-6 mb-5 mb-md-0 pb-5 pb-md-0">
                                <div className="img-styleBox">
                                    <div className="styleBox-border">
                                        <img className="styleBox-img1 img-fluid" src="/images/storefront.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 pl-md-5 pl-xl-0 offset-xl-1 col-xl-5">
                                <div className="section-intro mb-lg-4">
                                    <h4 className="intro-title">About Us</h4>
                                    <h2>We speak the good food language</h2>
                                </div>
                                <p>First opened in 2011, Appletree has been serving loyal customers of the neighbourhood and schools.  
                                    Using only freshly bought produce, and hand ground meat, we serve the basis to good food.  Come see the store 
                                    for yourself at 184 Ridout Street South.  
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-margin mb-lg-100">
                    <div className="container">
                        <div className="section-intro mb-75px">
                            <h4 className="intro-title">Featured Food</h4>
                            <h2>Fresh taste and great price</h2>
                        </div>
                        <CardGrid />
                    </div>
                </section>
                <section className="bg-lightGray section-padding">
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-sm">
                                <img className="card-img rounded-0" src="/images/offer-img.jpg" alt="" />
                            </div>
                            <div className="col-sm">
                                <div className="offer-card offer-card-position">
                                    <h3>Burger Combo</h3>
                                    <h2>$8.99</h2>
                                    <a className="button" href="#OrderForm">Order Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-margin">
                    <div className="container">
                        <div className="section-intro mb-75px">
                            <h4 className="intro-title">Food Menu</h4>
                            <h2>Delicious food</h2>
                        </div>
                        <MenuAccordian />
                    </div>
                </section>
                <section className="cta-area text-center">
                    <div className="container">
                        <p>Some Trendy And Popular Courses Offerd</p>
                        <h2>Under replenish give saying thing</h2>
                        <a className="button" href="#OrderForm">Order Now</a>
                    </div>
                </section>
                <section className="section-margin">
                    <div className="container">
                        <div className="section-intro mb-75px">
                            <h4 className="intro-title">Our Chef</h4>
                            <h2>Talent & experience member</h2>
                        </div>

                        <div className="row">
                            <div className="col-sm-6 col-lg-4 mb-4 mb-lg-0">
                                <div className="chef-card">
                                    <img className="card-img rounded-0" src="img/home/chef-1.jpg" alt="" />
                                    <div className="chef-footer">
                                        <h4>Henry Fong</h4>
                                        <p>Executive Chef</p>
                                    </div>

                                    <div className="chef-overlay">
                                        <ul className="social-icons">
                                            <li><a href="#"><i className="ti-facebook"></i></a></li>
                                            <li><a href="#"><i className="ti-twitter-alt"></i></a></li>
                                            <li><a href="#"><i className="ti-skype"></i></a></li>
                                            <li><a href="#"><i className="ti-vimeo-alt"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-4 mb-4 mb-lg-0">
                                <div className="chef-card">
                                    <img className="card-img rounded-0" src="img/home/chef-2.jpg" alt="" />
                                    <div className="chef-footer">
                                        <h4>Christie Sychangco</h4>
                                        <p>Executive Chef</p>
                                    </div>

                                    <div className="chef-overlay">
                                        <ul className="social-icons">
                                            <li><a href="#"><i className="ti-facebook"></i></a></li>
                                            <li><a href="#"><i className="ti-twitter-alt"></i></a></li>
                                            <li><a href="#"><i className="ti-skype"></i></a></li>
                                            <li><a href="#"><i className="ti-vimeo-alt"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <OrderForm />
            </div>
            
        )
    }
}