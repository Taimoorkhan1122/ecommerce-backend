export const merchantTypes = `#graphql
    type Merchant {
        id: String!
        shopname: String!,
        username: String!,
        email: String!
    }

    type Query {
        """ Accepts  email and returns provided fields """
        login: Merchant
    }


    type Mutation {
        """ Accepts shopname, username, email and password and returns a JWT """
        register(
            shopname:String!,
            username:String!, 
            email: String!, 
            password: String!
            ): String
    }
`;
