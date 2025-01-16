import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../api/index";
import ProductList from "../components/ProductList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const loadProducts = useCallback(async () => {
        try {
        const newProducts = await fetchProducts(4, page);
        setProducts((prev) => [...prev, ...newProducts]);
        } catch (error) {
        console.error("Failed to load products:", error);
        }
    }, [page]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return ( 
    <ProductList 
      products={products}     
    />
)};

export default Home;
