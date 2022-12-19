export const StoreTypes = `#graphql
    type Store {
        id: String!
        storename: String!
        admin: String
    }

    type Query {
        """ Returns store info """
        loginStore: Store
    }


    type Mutation {
        """ Accepts shopname, username, email and password and returns a JWT """
        createStore(
            storename:String!,
            password: String!,
            admin: String
            ): String
    }
`;
