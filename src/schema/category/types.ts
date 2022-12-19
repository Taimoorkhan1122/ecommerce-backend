export const CategoryTypes = `#graphql
    type Category {
        id: String!
        title: String!
        description: String
    }

    type Query {
        """ Returns category with provided ID """
        category(cId: String!): Category
        """ Returns list of categories with provided store ID """
        categories(cId: String!): [Category]
    }


    type Mutation {
        """ Creates a new category """
        createCategory(
            title: String!,
            description: String,
            ): Category

        """ update a category with given ID, and data """
        updateCategory(
            cId: String!, 
            title: String,
            description: String,
            )
            : Product

        """ Creates a new product """
        deleteCategory(cId: String!): String
    }
`;
