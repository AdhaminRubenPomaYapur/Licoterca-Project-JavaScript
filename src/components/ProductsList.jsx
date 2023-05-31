import React from "react";

export const ProductList = ( {products} ) => {

    return(
        <div className="container-items">
            {
                products.map(product => {
                    return (
                        <div className="item" key={product.id}>
                            <div className="info-product">
                                <h2>{product.name}</h2>
                                <p className="price">Bs.- {product.price}</p>
                                <button className="btn-add-cart">Añadir al carrito</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}