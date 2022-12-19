export const ProductTypes = `#graphql
    type Product {
        id: String!
        title: String!
        description: String
        price: Float!
        category: String!
        quantity: Int!
        storename: String!

    }

    type Query {
        """ Returns product with provided ID """
        product(pId: String!): Product
        """ Returns list of products with provided store ID """
        products(sId: String!): [Product]
    }


    type Mutation {
        """ Creates a new product """
        createProduct(
            title: String!,
            description: String,
            price: Float!,
            category: String!,
            quantity: Int!,
            ): Product

        """ Updates a product with given ID """
        updateProduct(
            pId: String!, 
            title: String,
            description: String,
            price: Float,
            category: String,
            quantity: Int)
            : Product

        """ Creates a new product """
        deleteProduct(pId: String!): String
    }
`;
