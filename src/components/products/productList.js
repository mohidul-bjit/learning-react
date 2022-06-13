import React from 'react';
import {useState, useEffect} from 'react'
import Product from './product';


function ProductList() {
    const [products, setProducts] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const [lastPage, setLastPage] = useState()


    useEffect( () => {
        const url = `https://dummyjson.com/products?limit=20&skip=${(currPage-1)*20}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setProducts(json.products);
                setLastPage(Math.ceil(json.total/20))
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, [currPage])


    const productList = products?.map(product => <Product key={product.id} product={product}/>)

    const goNextPage = () => setCurrPage(currPage+1);
    const goPreviousPage = () => setCurrPage(currPage-1)

    return (
        <div className='product__list--container'>
            {productList}
            <div>
                <button type="button" disabled={currPage === 1} onClick={goPreviousPage}>Previous Page</button>
                <button type="button" disabled={currPage === lastPage} onClick={goNextPage}>Next Page</button>
            </div>
        </div>
    )
}

export default ProductList