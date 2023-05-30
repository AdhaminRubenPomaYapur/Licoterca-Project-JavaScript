import './Products.css';
import { AddToCartIcon } from './Icons';

export function Products ( {products} ) {
    console.log(products);
    return (
        <main className='products'>
            <ul>
                {
                    products.map(product => (
                        <li key={product.id}>
                            <div>
                                <strong>{product.name}</strong> - ${product.price}
                            </div>
                            <div>
                                <button>
                                    <AddToCartIcon />
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}