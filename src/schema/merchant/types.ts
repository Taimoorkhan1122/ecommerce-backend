export const merchantTypes = `#graphql
    type Merchant {
        id: String!
        shopname: String!,
        username: String!,
        email: String!
    }

    type Query {
        merchant(email: String): Merchant
    }

    type Mutation {
        addMerchant(
            shopname:String!,
            username:String!, 
            email: String!, 
            password: String!
            ): Merchant
    }
`;
