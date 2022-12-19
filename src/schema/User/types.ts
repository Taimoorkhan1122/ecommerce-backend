export const UserTypes = `#graphql
    type User {
        id: String!
        username: String!
        email: String!
        firstname: String!
        lastname: String!
        isMerchant: Boolean
     }

    type Query {
        """ Accepts  email and returns provided fields """
        login(email: String!, password: String!): User
    }

    type Mutation {
        """ Accepts  username, first and last name, email and password and returns a token """
        register(
            username: String!,
            firstname: String!,
            lastname: String!,
            email: String!,
            password: String!,
            ): String

        """ Accepts user's UUID """
        deleteUser(id: String!): String
    }
`;
