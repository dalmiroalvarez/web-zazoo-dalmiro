import { useState, useEffect, useCallback, useRef } from "react";
import { fetchProducts } from "../api/index";
import ProductList from "../components/ProductList";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
`;

const FilterContainer = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
  }
`;

const StyledSelect = styled.select`
  padding: 8px 12px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin: 20px;
  cursor: pointer;
  outline: none;
  
  &:hover {
    border-color: #666;
  }

  @media (max-width: 768px) {
    width: 90%;
    margin: 20px auto;
    display: block;
  }
`;

const LoadingContainer = styled.div`
  height: 10px;
  margin: 20px 0;
`;

const MessageContainer = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.1rem;
  color: #666;
`;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');
  const loadingRef = useRef(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);

    try {
      const allProducts = await fetchProducts();
      setProducts(allProducts);
      const sortedProducts = sortProducts(allProducts, sortOrder);
      setDisplayedProducts(sortedProducts.slice(0, 8));
      setHasMore(sortedProducts.length > 8);
    } catch (error) {
      console.error("Failed to load products:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [sortOrder]);

  const sortProducts = (productsToSort, order) => {
    const sorted = [...productsToSort];
    switch (order) {
      case 'asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'desc':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setPage(1);
    const sortedProducts = sortProducts(products, event.target.value);
    setDisplayedProducts(sortedProducts.slice(0, 8));
    setHasMore(sortedProducts.length > 8);
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    const currentRef = loadingRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      const sortedProducts = sortProducts(products, sortOrder);
      const startIndex = (page - 1) * 8;
      const endIndex = page * 8;
      
      if (startIndex < sortedProducts.length) {
        const nextProducts = sortedProducts.slice(startIndex, endIndex);
        setDisplayedProducts(prev => [...prev, ...nextProducts]);
        setHasMore(endIndex < sortedProducts.length);
      } else {
        setHasMore(false);
      }
    }
  }, [page, products, sortOrder]);

  return (
    <Container>
      <FilterContainer>
        <StyledSelect 
          value={sortOrder} 
          onChange={handleSortChange}
        >
          <option value="default">Default Order</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </StyledSelect>
      </FilterContainer>

      <ProductList 
        products={displayedProducts} 
      />      
      
      <LoadingContainer ref={loadingRef}>
        {loading && (
          <MessageContainer>
            Loading more products...
          </MessageContainer>
        )}
        {!hasMore && displayedProducts.length > 0 && (
          <MessageContainer>
            No more products to load
          </MessageContainer>
        )}
      </LoadingContainer>
    </Container>
  );
};

export default Home;