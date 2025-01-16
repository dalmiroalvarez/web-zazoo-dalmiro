import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api/index";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  margin: 0;
  padding: 0;
  flex-direction: column;
`;

const BackButton = styled.button`
  padding: 8px 15px;
  font-size: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 10;

  &:hover {
    background-color: #2980b9;
  }

  &::after {
    content: '<';
  }

  @media (min-width: 1024px) {
    &::after {
      content: 'Back to Products';
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ColumnProductDetails = styled.div`
  flex: 1;
  padding: 50px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  color: #333;
  line-height: 1.6;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }

  p {
    margin-bottom: 20px;
  }

  h1 {
    margin-bottom: 15px;
  }
`;

const ColumnImageProduct = styled.div`
  flex: 1;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductDescription = styled.p`
  font-size: 1.2rem;
  color: #555;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #e74c3c;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ProductCategory = styled.p`
  font-size: 1.2rem;
  color: #555;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) return <p>Please Wait...</p>;

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)} />
      <ContentWrapper>
        <ColumnProductDetails>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>Price: ${product.price}</ProductPrice>
          <ProductCategory>Category: {product.category}</ProductCategory>
        </ColumnProductDetails>
        <ColumnImageProduct>
          <ProductImage src={product.image} alt={product.title} />
        </ColumnImageProduct>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ProductPage;