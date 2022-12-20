import { GraphQLError } from "graphql";
import { Op } from "sequelize";
import { connect } from "../../dbconfig.js";
import { ProductCategory } from "../../models/index.js";
import { Context } from "../../index.js";

export const CategoryMutation = {
    createCategory: async (parent, args, ctx: Context, info) => {
        const { title, description } = args;
        const userId = ctx.id;
        try {
            await connect();

            let category: any = await ProductCategory.findOne({
                where: {
                    [Op.and]: [{ title }, { description }, { UserId: userId }],
                },
            });

            // if user exist return response
            if (category) return new GraphQLError("category already exist");
            // create new user

            console.log("...........", ctx.id);

            category = await ProductCategory.create({
                title,
                description,
                UserId: userId,
            });

            console.log("Product ----> ", category);

            return {
                id: category.id,
                title: category.title,
                description: category.description,
            };
        } catch (error) {
            console.log("error: ", error);
            return new GraphQLError(error);
        }
    },
};
