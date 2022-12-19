import { MerchantQuery, MerchantMutation, merchantTypes } from './merchant/index.js';

export const typeDefs = `#graphql
    type Query
    type Mutation 

    ${merchantTypes}
`;

export const resolvers = {
    Query: {
        ...MerchantQuery
    },
    Mutation: {
        ...MerchantMutation
    },
};
