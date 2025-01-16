import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  position: relative;
  max-width: 320px;
  height: 400px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(0.99);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 70%;
`;

const ProductImage = styled.img`
  margin-top: 2em;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.1);
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

  @media (max-width: 920px) { 
    font-size: 0.9em;
  }

  @media (max-width: 1080px) { 
    font-size: 0.9em;
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
