import axios from "axios";

const url = "https://fakestoreapi.com/products";

export const fetchProducts = async (limit = 4, page = 1) => {
  try {
    const response = await axios.get(`${url}?limit=${limit}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};
