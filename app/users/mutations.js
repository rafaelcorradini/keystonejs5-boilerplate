module.exports = (keystone, authStrategy) => {
  const authenticateSeller = async (_auth, { email, password }, context) => {
    const { item, success } = await authStrategy.validate({
      email,
      password
    })
    if (!success || item.role !== 'seller') {
      throw new Error('Invalid user')
    }

    const token = await context.startAuthedSession({ item, list: keystone.lists.User })
    return { token, item }
  }

  keystone.extendGraphQLSchema({
    mutations: [
      {
        schema: 'authenticateSeller(email: String!, password: String!): authenticateUserOutput',
        resolver: authenticateSeller
      }
    ]
  })
}
