// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';
import { client } from '../../../utils/client';
import { searchPostsQuery } from '../../../utils/queries';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const { searchTag } = req.query;
		const videosQuery = searchPostsQuery(searchTag);

		const videos = await client.fetch(videosQuery);

		res.status(200).json(videos);
	}
}
