import { shield, and } from 'graphql-shield'
import * as rules from './rules.js'

export const permissions = shield({
    Query: {
      loginStore : rules.isAuthenticated,
      product : rules.isAuthenticated,
      products : rules.isAuthenticated,
      category : rules.isAuthenticated,
      categories : rules.isAuthenticated,
      userStore : rules.isAuthenticated,
    },
    Mutation: {
      createStore: and(rules.isAuthenticated, rules.createStoreRule),
      createProduct:  rules.isAuthenticated,
      updateProduct:  rules.isAuthenticated,
      createCategory:  rules.isAuthenticated,
      register:  rules.registerRule,
      login : rules.registerRule,
    }
  })