// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';
import { client } from '../../../utils/client';
import { topicPostsQuery } from '../../../utils/queries';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const { topic } = req.query;
		const topicQuery = topicPostsQuery(topic);

		const videos = await client.fetch(topicQuery);

		res.status(200).json(videos);
	}
}
