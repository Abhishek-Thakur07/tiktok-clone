import React, { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import useStore from '../store';

interface IProps {
	likes: any[];
	handleLike: () => void;
	handleDislike: () => void;
}
const LikeButton = ({ likes, handleDislike, handleLike }: IProps) => {
	const { userProfile }: any = useStore();
	const [liked, setLiked] = useState(false);
	const filterLikes = likes?.filter((like) => like?._ref === userProfile?._id);

	useEffect(() => {
		if (filterLikes?.length > 0) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [likes]);

	return (
		<div className='flex gap-6'>
			<div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
				{liked ? (
					<div
						className='bg-primary rounded-full p-2 md:p-4 text-[#f51997]'
						onClick={handleDislike}>
						<MdFavorite className='text-lg md:text-2xl' />
					</div>
				) : (
					<div
						className='bg-primary rounded-full p-2 md:p-4'
						onClick={handleLike}>
						<MdFavorite className='text-lg md:text-2xl' />
					</div>
				)}
				<p className='text-md font-semibold'>{likes?.length}</p>
			</div>
		</div>
	);
};

export default LikeButton;
