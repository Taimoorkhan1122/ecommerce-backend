import { StoreMutation, StoreQuery, StoreTypes } from './store/index.js';
import { UserMutation, UserQuery, UserTypes} from './user/index.js';
import { ProductreMutation, ProductTypes } from './product/index.js';
import { CategoryMutation, CategoryTypes } from './category/index.js';

export const typeDefs = `#graphql
    type Query
    type Mutation 

    ${StoreTypes}
    ${UserTypes}
    ${ProductTypes}
    ${CategoryTypes}
`;

export const resolvers = {
    Query: {
        ...StoreQuery,
        ...UserQuery 
    },
    Mutation: {
        ...StoreMutation,
        ...UserMutation,
        ...ProductreMutation,
        ...CategoryMutation
    },
};
