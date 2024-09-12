export const productTypeDefs = `
  type Query {
    product(id: Int!): Product
    products(limit: Int, offset: Int): [Product]
  }

  input ProductPaginationInput {
    limit: Int
    offset: Int
  }

  input ProductWhereUniqueInput {
    id: Int
  }

  input ProductUpdateInput {
    name: String
    description: String
    price: Float
  }

  type Mutation {
    createProduct(name: String, description: String, price: Float): Product
    updateProduct(where: ProductWhereUniqueInput!, data: ProductUpdateInput!): Product
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
  }
`;
