// // src/hooks/useProducts.js
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { productAPI } from '../services/api';

// export const useProducts = () => {
//     return useQuery('products', productAPI.getAllProducts);
// };

// export const useProduct = (id) => {
//     return useQuery(['product', id], () => productAPI.getProductById(id));
// };

// export const useCreateProduct = () => {
//     const queryClient = useQueryClient();
//     return useMutation(productAPI.createProduct, {
//         onSuccess: () => {
//             queryClient.invalidateQueries('products');
//         }
//     });
// };

// export const useUpdateProduct = () => {
//     const queryClient = useQueryClient();
//     return useMutation(
//         ({ id, data }) => productAPI.updateProduct(id, data),
//         {
//             onSuccess: (data, variables) => {
//                 queryClient.invalidateQueries('products');
//                 queryClient.invalidateQueries(['product', variables.id]);
//             }
//         }
//     );
// };

// export const useDeleteProduct = () => {
//     const queryClient = useQueryClient();
//     return useMutation(productAPI.deleteProduct, {
//         onSuccess: () => {
//             queryClient.invalidateQueries('products');
//         }
//     });
// };