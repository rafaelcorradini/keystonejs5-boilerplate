const userHasRole = (roles = ['admin']) => ({ authentication: { item: user } }) => Boolean(user && roles.includes(user.role))
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false
  }
  return { id: user.id }
}
const userHasRoleOrOwner = (roles = ['admin']) => (auth) => {
  const hasRole = userHasRole(roles)(auth)
  const isOwner = userOwnsItem(auth)
  return hasRole || isOwner
}
module.exports = { userHasRole, userOwnsItem, userHasRoleOrOwner }
