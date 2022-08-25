import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GoVerified } from 'react-icons/go';
import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import useStore from '../../store';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';

const Search = ({ videos }: { videos: Video[] }) => {
	const [isAccounts, setIsAccounts] = useState(true);
	const router = useRouter();
	const { allUsers } = useStore();

	const { searchTag }: any = router.query;
	const searchedAccounts = allUsers.filter((user: IUser) =>
		user?.userName?.toLowerCase().includes(searchTag.toLowerCase())
	);
	const accounts = isAccounts ? 'border-b-3 border-black' : 'text-gray-400';
	const posts = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

	return (
		<div className='w-full'>
			<div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
				<p
					className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
					onClick={() => setIsAccounts(true)}>
					People
				</p>
				<p
					className={`text-xl font-semibold cursor-pointer mt-2 ${posts}`}
					onClick={() => setIsAccounts(false)}>
					Posts
				</p>
			</div>
			{isAccounts ? (
				<div className='md:mt-16'>
					{searchedAccounts.length > 0 ? (
						searchedAccounts.map((user: IUser, idx: number) => (
							<Link href={`/profile/${user._id}`} key={idx}>
								<div className='flex p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200 gap-3'>
									<div>
										<Image
											src={user.image}
											alt='pic'
											width={50}
											height={50}
											className='rounded-full'
										/>
									</div>
									<div className='hidden xl:block'>
										<p className='flex gap-1 items-center text-md text-primary font-bold lowercase'>
											{user.userName.replaceAll(' ', '')}
											<GoVerified className='text-blue-400' />
										</p>
										<p className='capitalize text-xs text-gray-400'>
											{user.userName}
										</p>
									</div>
								</div>
							</Link>
						))
					) : (
						<NoResults text={`No result found for ${searchTag}`} />
					)}
				</div>
			) : (
				<div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
					{videos.length > 0 ? (
						videos.map((video: Video, idx: number) => (
							<VideoCard post={video} key={idx} />
						))
					) : (
						<NoResults text={`No result found for ${searchTag}`} />
					)}
				</div>
			)}
		</div>
	);
};

export const getServerSideProps = async ({
	params: { searchTag },
}: {
	params: { searchTag: string };
}) => {
	const res = await axios.get(`${BASE_URL}/api/search/${searchTag}`);

	return {
		props: {
			videos: res.data,
		},
	};
};

export default Search;
