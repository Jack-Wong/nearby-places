import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import queryString from 'query-string';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;
  if (method === 'GET') {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${queryString.stringify(query)}`)
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.status).send(error);
    }
  } else {
    // handle any other HTTP method
  }
}
