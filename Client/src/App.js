import React from "react";
import { BrowserRouter as BRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Adithya/Header";
import Footer from "./components/Adithya/Footer";
import HomeScreen from "./screens/Adithya/HomeScreen";
import RegistrationScreen from "./screens/Adithya/RegistrationScreen";
import LoginScreen from "./screens/Adithya/LoginScreen";
import AdminLoginScreen from "./screens/Adithya/AdminLoginScreen";
import CustomerProfileScreen from "./screens/Adithya/CustomerProfileScreen";
import SellerProfileScreen from "./screens/Deshani/SellerProfileScreen";
import AdminProfileScreen from "./screens/Adithya/AdminProfileScreen";
import ProductListingScreen from "./screens/Adithya/ProductListingScreen";
import SingleProductPage from "./components/Randika/SingleProduct";
import CartPage from "./components/Randika/Cart";

const App = () => {
  return (
    <BRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
        </Switch>
        <Switch>
          <Route exact path="/registration" component={RegistrationScreen} />
        </Switch>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
        </Switch>
        <Switch>
          <Route exact path="/admin/login" component={AdminLoginScreen} />
        </Switch>
        <Switch>
          <Route
            exact
            path="/profile/customer"
            component={CustomerProfileScreen}
          />
        </Switch>
        <Switch>
          <Route exact path="/profile/seller" component={SellerProfileScreen} />
        </Switch>
        <Switch>
          <Route exact path="/profile/admin" component={AdminProfileScreen} />
        </Switch>
        <Switch>
          <Route exact path="/products" component={ProductListingScreen} />
        </Switch>
        <Switch>
          <Route
            exact
            path="/products/single/:id"
            component={SingleProductPage}
          />
        </Switch>
        <Switch>
          <Route exact path="/cart" component={CartPage} />
        </Switch>
      </main>
      <Footer />
    </BRouter>
  );
};

export default App;
