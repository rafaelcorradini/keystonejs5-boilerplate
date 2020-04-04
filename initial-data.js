module.exports = async (keystone) => {
  // Count existing users
  const {
    data: {
      _allUsersMeta: { count }
    }
  } = await keystone.executeQuery(
    `
    query {
      _allUsersMeta {
        count
      }
    }
    `
  )

  if (count === 0) {
    const password = 'admin123'
    const email = 'admin@example.com'

    await keystone.executeQuery(
      `
      mutation initialUser($password: String, $email: String) {
        createUser(data: {name: "Admin", email: $email, role: "admin", password: $password}) {
          id
        }
      }
      `,
      {
        variables: {
          password,
          email
        }
      }
    )
  }
}
