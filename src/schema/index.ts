import { StoreMutation, StoreQuery, StoreTypes } from './store/index.js';
import { UserMutation, UserQuery, UserTypes} from './user/index.js';

export const typeDefs = `#graphql
    type Query
    type Mutation 

    ${StoreTypes}
    ${UserTypes}
`;

export const resolvers = {
    Query: {
        ...StoreQuery,
        ...UserQuery 
    },
    Mutation: {
        ...StoreMutation,
        ...UserMutation,
    },
};
