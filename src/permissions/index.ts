import { shield, and } from 'graphql-shield'
import * as rules from './rules.js'

export const permissions = shield({
    Query: {
      loginStore : rules.isAuthenticated,
      login : rules.registerRule,
    },
    Mutation: {
      createStore: and(rules.isAuthenticated, rules.createStoreRule),
      createProduct:  rules.isAuthenticated,
      register:  rules.registerRule,
    }
  })