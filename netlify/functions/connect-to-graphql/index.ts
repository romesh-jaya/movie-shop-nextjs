import { Handler } from '@netlify/functions'
const fetch = require('node-fetch')

// Note: this function acts to hide the HASURA_ADMIN_SECRET from the FE

const handler: Handler = async event => {
  if (!process.env.GRAPHQL_ENDPOINT && !process.env.HASURA_ADMIN_SECRET) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error:
          'GRAPHQL_ENDPOINT and HASURA_ADMIN_SECRET must be defined in env variables',
      }),
    }
  }

  try {
    const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
        'x-hasura-role': 'user',
      },
      body: event.body,
    })
    const data = await response.json()
    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    }
  }
}

export { handler }
