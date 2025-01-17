import ProductCard from "./ProductCard";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.1rem;
  color: #666;
`;

const ProductList = ({ products, loading }) => {
  return (
    <Container>
      <Grid>
        {products.map((product, index) => (
          <ProductCard 
            key={`${product.id || product.title}-${index}`} 
            product={product} 
          />
        ))}
      </Grid>
      {loading && (
        <LoadingMessage>Loading more products...</LoadingMessage>
      )}
    </Container>
  );
};

export default ProductList;