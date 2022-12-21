export const ProductTypes = `#graphql
    type Product {
        id: String!
        title: String!
        description: String
        price: Float!
        category: String!
        quantity: Int!
        userId: String!
        image: String
        # storename: String!

    }

    type Query {
        """ Returns product with provided ID """
        product(pId: String!): Product
        """ Returns list of products for the user """
        products: [Product]

        """Returns list of publically products for the all user """
        homeProducts: [Product]
    }


    type Mutation {
        """ Creates a new product """
        createProduct(
            title: String!,
            description: String,
            price: Float!,
            category: String!,
            quantity: Int!,
            image: String
            ): ID

        """ Updates a product with given ID """
        updateProduct(
            pId: String!, 
            title: String,
            description: String,
            price: Float,
            category: String,
            image: String
            quantity: Int)
            : Int

        """ Delete a new product with corresponding ID """
        deleteProduct(pId: String!): String!
    }
`;
