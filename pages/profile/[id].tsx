import axios from 'axios';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoVerified } from 'react-icons/go';
import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';

interface IProps {
	data: {
		user: IUser;
		userVideos: Video[];
		userLikes: Video[];
	};
}

const Profile: NextPage<IProps> = ({ data }) => {
	const { user, userLikes, userVideos } = data;
	const [active, setActive] = useState(true);
	const [videoList, setVideoList] = useState<Video[]>([]);
	const videos = active ? 'border-b-3 border-black' : 'text-gray-400';
	const liked = !active ? 'border-b-2 border-black' : 'text-gray-400';

	useEffect(() => {
		if (active) {
			setVideoList(userVideos);
		} else {
			setVideoList(userLikes);
		}
	}, [active, userLikes, userVideos]);

	return (
		<div className='w-full'>
			<div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
				<div className='w-16 h-16 md:w-32 md:h-32'>
					<Image
						src={user.image}
						alt='pic'
						width={120}
						height={120}
						className='rounded-full'
						layout='responsive'
					/>
				</div>
				<div className='flex flex-col justify-center'>
					<p className='flex gap-1 items-center justify-center text-md md:text-2xl tracking-wider text-primary font-bold lowercase'>
						{user.userName.replaceAll(' ', '')}
						<GoVerified className='text-blue-400' />
					</p>
					<p className='capitalize md:text-xl text-xs text-gray-400'>
						{user.userName}
					</p>
				</div>
			</div>
			<div>
				<div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
					<p
						className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
						onClick={() => setActive(true)}>
						Videos
					</p>
					<p
						className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
						onClick={() => setActive(false)}>
						Liked
					</p>
				</div>
				<div className='flex gap-6 flex-wrap md:justify-start'>
					{videoList?.length > 0 ? (
						videoList.map((post: Video, idx: number) => (
							<VideoCard post={post} key={idx} />
						))
					) : (
						<NoResults text={`No ${active ? '' : 'liked'} videos yet`} />
					)}
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({
	params: { id },
}: {
	params: { id: string };
}) => {
	const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
	return {
		props: {
			data: res.data,
		},
	};
};

export default Profile;
