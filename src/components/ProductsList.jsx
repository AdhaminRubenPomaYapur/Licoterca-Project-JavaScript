import React, {useEffect, useState} from "react";
import axios from "axios";

const urlProducts = 'http://localhost:3000/api/products';

export const ProductList = ( {carProducts, setCarProducts} ) => {

    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        axios.get(urlProducts).then(response => {
            setAllProducts(response.data.products);
        }).catch(error => console.log(error.message))
    })

    const onAddProduct = (carProduct) => {

        const product = {
            id     : carProduct.id,
            name   : carProduct.name,
            amount : 1,
            price  : carProduct.price
        }

        if( carProducts.find(item => item.id === carProduct.id) ) {
            const products = carProducts.map(item => (item.id === carProduct.id) ? {...item, amount: item.amount + 1} : item);
            setCarProducts([...products]);
            return;
        }

        setCarProducts([...carProducts, product])
    }

    return(
        <div className="container-items">
            {
                allProducts.map(product => {
                    return (
                        <div className="item" key={product.id}>
                            <figure>
                                <img 
                                    src="https://www.cervezasalhambra.com/themes/alhambra/assets/img/home/roja-banner-home-slider-mb.jpg"
                                    alt={product.name}
                                />
                            </figure>
                            <div className="info-product">
                                <h2>{product.name}</h2>
                                <p className="price">Bs.- {product.price}</p>
                                <button onClick={() => onAddProduct(product)} className="btn-add-cart">Añadir al carrito</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}