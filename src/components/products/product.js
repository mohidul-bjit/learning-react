function Product(props) {
    return (
        <div  className="product__card--container">
            <p>Title: {props.product.title}</p>
            <span>Price: {props.product.price}</span>
        </div>
    )
}

export default Product;