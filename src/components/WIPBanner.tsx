import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from '../style';

const WIPBanner = () => {
	const [show, setShow] = useState(true);

	return (
		<div className={`${styles.flexStart}`}>
			<div className={`${styles.boxWidth}`}>
				<div className={`fixed sm:px-16 xl:pl-0 px-6 z-10`}>
					<div
						className={`flex flex-row relative w-full top-[80px] 
            bg-yellow-400 rounded-lg duration-300 border-[1px] border-black ${
				show ? 'opacity-80' : 'opacity-0'
			}`}
					>
						<div className='my-auto mx-4 text-[14px]'>
							This site is still a work in progress!
						</div>
						<FontAwesomeIcon
							className='py-3 px-2 border-l-[1px] border-l-black w-[20px] h-[20px] cursor-pointer'
							icon={faCheck}
							onClick={() => setShow(false)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WIPBanner;
