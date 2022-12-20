export const UserTypes = `#graphql
    type User {
        id: String!
        username: String!
        email: String!
        firstname: String!
        lastname: String!
        isMerchant: Boolean
        token: String!
     }

     type Query {
         """ Returns user's store  with provided ID """
         userStore(sId: String!): Store

         """ Returns all stores for current user"""
         userStores: [Store]
     }

    type Mutation {
        """ Accepts  username, first and last name, email and password and returns a token """
        register(
            username: String!,
            firstname: String!,
            lastname: String!,
            email: String!,
            password: String!,
            isMerchant: Boolean
            ): String

        """ Accepts  email and returns provided fields """
        login(email: String!, password: String!): User
        
        """ Accepts user's UUID """
        deleteUser(id: String!): String
    }
`;
