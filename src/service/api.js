// Base URL for FakeStore API
const BASE_URL = 'https://fakestoreapi.com';

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

// Helper function to handle errors
const handleError = (error) => {
    console.error('API Error:', error);
    throw error;
};

// API service object
const api = {
    // ==================== PRODUCT APIs ====================
    
    // GET: Fetch all products
    getProducts: async () => {
        try {
            const response = await fetch(`${BASE_URL}/products`);
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // GET: Fetch single product by ID
    getProduct: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/products/${id}`);
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // GET: Fetch products by category
    getProductsByCategory: async (category) => {
        try {
            const response = await fetch(`${BASE_URL}/products/category/${category}`);
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // GET: Fetch all categories
    getCategories: async () => {
        try {
            const response = await fetch(`${BASE_URL}/products/categories`);
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // POST: Create new product
    createProduct: async (productData) => {
        try {
            const response = await fetch(`${BASE_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // PUT: Update existing product
    updateProduct: async (id, productData) => {
        try {
            const response = await fetch(`${BASE_URL}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // DELETE: Delete product
    deleteProduct: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/products/${id}`, {
                method: 'DELETE'
            });
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // ==================== USER APIs ====================
    
    // GET: Fetch all users
    getUsers: async () => {
        try {
            const response = await fetch(`${BASE_URL}/users`);
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // GET: Fetch single user by ID
    getUser: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${id}`);
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // POST: Create new user
    createUser: async (userData) => {
        try {
            const response = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // PUT: Update existing user
    updateUser: async (id, userData) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // DELETE: Delete user
    deleteUser: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${id}`, {
                method: 'DELETE'
            });
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // ==================== CART APIs ====================
    
    // GET: Fetch all carts
    getCarts: async () => {
        try {
            const response = await fetch(`${BASE_URL}/carts`);
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // GET: Fetch single cart by ID
    getCart: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/carts/${id}`);
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // GET: Fetch carts by user ID
    getCartsByUser: async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/carts/user/${userId}`);
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // POST: Create new cart
    createCart: async (cartData) => {
        try {
            const response = await fetch(`${BASE_URL}/carts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartData)
            });
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // PUT: Update existing cart
    updateCart: async (id, cartData) => {
        try {
            const response = await fetch(`${BASE_URL}/carts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartData)
            });
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // DELETE: Delete cart
    deleteCart: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/carts/${id}`, {
                method: 'DELETE'
            });
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // ==================== AUTH APIs ====================
    
    // POST: User login
    login: async (credentials) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            return await handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    }
};

export default api;