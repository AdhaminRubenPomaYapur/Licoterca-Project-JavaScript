import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import Sidenav from "../components/Sidenav";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';

const urlProducts = 'http://localhost:3000/api/products';
const urlSuppliers = 'http://localhost:3000/api/suppliers';
const urlCatalogs = 'http://localhost:3000/api/catalogs';
const urlInventories = "http://localhost:3000/api/inventories";

export class ProductList extends Component {

state={
    suppliers   :[],
    catalogs    :[],
    productsCat :[],
    supplier    :'',
    catalog     :'',
    productCat  :''
}

    peticionGetSuppliers =() => {
        axios.get(urlSuppliers).then(response => {
            this.setState({suppliers: response.data.suppliers});
          }).catch(error => console.log(error.message));
    }


   componentDidMount(){
    this.peticionGetSuppliers();
   }

    

    
  

  handleSupplierChange = async (event) => {
    event.persist();
    await this.setState({supplier: event.target.value})
    this.peticionGetCatalogsBySuppliers();
  };



  peticionGetCatalogsBySuppliers = () => {
    
    axios.get(urlCatalogs+`/${this.state.supplier}`).then(response => {
        this.setState({catalogs: response.data.catalogs});
    }).catch(error => console.log(error.message));
}

  handleCategoryChange = async (event) => {
    event.persist();
    await this.setState({catalog: event.target.value});
    this.cargarProductoCat();
  };

  cargarProductoCat = ()  =>{
     this.state.catalogs.forEach(catalog => {
        if(catalog.id === this.state.catalog) {
            this.setState({productsCat: catalog.products})
        }
    });
    console.log(this.state.productsCat);
  }

  onAddProduct = (carProduct) => {
    // const product = {
    //   id: carProduct.id,
    //   name: carProduct.name,
    //   amount: 1,
    //   price: carProduct.price
    // };

    // if (carProducts.find(item => item.id === carProduct.id)) {
    //   const products = carProducts.map(item => (item.id === carProduct.id) ? { ...item, amount: item.amount + 1 } : item);
    //   setCarProducts(products);
    //   return;
    // }

    // setCarProducts([...carProducts, product]);
  };

render() {
    return (
        <div>
            <div className="container-items">
            <select onChange={this.handleSupplierChange}>
            <option value="nada">Seleccione un Proveedor</option>
            {this.state.suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>{`${supplier.name} ${supplier.lastname}`}</option>
            ))}
          </select>
    
          {
            this.state.catalogs.length > 0?(
                <select onChange={this.handleCategoryChange}>
                    <option value="nada">Seleccione un Catalogo</option>
                {
                this.state.catalogs.map(catalog => (
                  <option key={catalog.id} value={catalog.id}>{catalog.type}</option>
                  ))
                }
              </select>
            ):(<></>)
           
          }
            </div>
         
         <div className="container-items">
         {
            this.state.productsCat.length > 0?(
          this.state.productsCat.map(product => (
            <div className="item" key={product.id}>
              <div className="info-product">
                <h2>{product.name}</h2>
                <p className="price">Bs.- {product.price}</p>
                <button onClick={() => this.onAddProduct(product)} className="btn-add-cart">Añadir al carrito</button>
              </div>
            </div>
          ))
          
          ):(<></>)
          }
         </div>
    
         


        </div>
      );
}
  
}