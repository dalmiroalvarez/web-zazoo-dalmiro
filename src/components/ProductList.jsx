import ProductCard from "./ProductCard";
import "../styles/ProductList.css";

const ProductList = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard 
            key={`${product.id || product.title}-${index}`} 
            product={product} 
        />
    ))}
    </div>
  );
};

export default ProductList;
