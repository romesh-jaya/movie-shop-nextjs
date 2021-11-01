import { Handler } from '@netlify/functions'
const fetch = require('node-fetch')

// Note: this function acts to hide the HASURA_ADMIN_SECRET from the FE

type Error = {
  statusCode: number
  message: string
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
}

const handler: Handler = async event => {
  if (!process.env.GRAPHQL_ENDPOINT && !process.env.HASURA_ADMIN_SECRET) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error:
          'GRAPHQL_ENDPOINT and HASURA_ADMIN_SECRET must be defined in env variables',
      }),
    }
  }

  if (event.httpMethod === 'OPTIONS') {
    // To enable CORS
    return {
      statusCode: 200,
      headers,
      body: '',
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
      headers,
      body: JSON.stringify(data),
    }
  } catch (err) {
    const error = err as Error
    return {
      statusCode: error.statusCode || 500,
      headers,
      body: JSON.stringify({
        error: error.message,
      }),
    }
  }
}

export { handler }
