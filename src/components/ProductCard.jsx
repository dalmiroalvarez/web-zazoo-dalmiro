import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
  height: 400px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: scale(0.99);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1200px) {
    max-width: 350px;
    height: 380px;
    margin: 15px;
  }

  @media (max-width: 768px) {
    max-width: 300px;
    height: 350px;
    margin: 10px auto;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    height: 320px;
    margin: 10px 0;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 65%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    height: 60%;
    padding: 10px;
  }
`;

const ProductImage = styled.img`
  width: 85%;
  height: 85%;
  object-fit: contain;
  transition: transform 0.4s ease;
  
  ${ImageWrapper}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 80%;
    height: 80%;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.h3`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Raleway', sans-serif;
  margin: 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 1em;
  width: 100%;
  text-align: center;
  border-radius: 5px;

  @media (max-width: 1200px) {
    font-size: 0.95em;
    padding: 8px;
  }

  @media (max-width: 768px) {
    font-size: 0.9em;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.85em;
    padding: 6px;
  }
`;

const ProductCard = ({ product }) => {
  const truncatedTitle = product.title.length > 20 ? `${product.title.slice(0, 20)} ...` : product.title;

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
      <CardContainer>
        <ImageWrapper>
          <ProductImage 
            src={product.image} 
            alt={product.title} 
          />
        </ImageWrapper>
        <Title>
          {truncatedTitle}
        </Title>
      </CardContainer>
    </Link>
  );
};

export default ProductCard;