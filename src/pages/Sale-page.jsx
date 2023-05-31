import { Box } from "@mui/material";
import { Component, useEffect, useState } from "react";
import Sidenav from "../components/Sidenav";
import axios from "axios";
import { Header } from "../components/Header";
import { ProductList } from "../components/ProductsList";


const urlProducts = 'http://localhost:3000/api/products';

function SalePage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(urlProducts).then(response => {
            setProducts(response.data.products);
        }).catch(error => console.log(error.message))
    })

    return(
        <>
            <Box sx={{display: 'flex'}}>
                <Sidenav/>
                <Box component="main" sx={{flexFlow: 1, p: 3}}>
                    <Header />
                    <ProductList products={products}/>
                    
                </Box>
            </Box>
        </>
    )
    
}

export default SalePage