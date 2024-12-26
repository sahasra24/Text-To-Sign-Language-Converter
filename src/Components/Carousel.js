import React, { useState } from "react";
import HandSign from "./HandSign";
import { useNavigate } from "react-router-dom";
import Add from "./Add";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

function Carousel(props) {
	const signs = props.signs;
	const missingWords = props.missingWords;
	const community = props.community;
	const [like, setLike] = useState(false);

	const navigate = useNavigate();

	const addLike = (sign) => {
		setLike(!like);
	  let word = sign.split('-')[0];
		axios.get(`/addLike/${community}/${word}`)
	}

	if (missingWords.length == 0) {
		return (
			<React.Fragment>
				<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
					<div className="carousel-inner">
						{
							signs && signs.map((sign, index) => {
								if (index == 0) {
									return (
										<div className="carousel-item active">
											<div className="d-flex justify-content-center">
												<div className="d-flex carousel-content align-items-end">
													<img className="d-block img-fluid carousel-img m-auto" src={'uploads/' + sign} alt="First Slide 1" />
													<div className='likeButton' onClick={() => {addLike(sign)}}>
														{
															like ? <FavoriteIcon fontSize='large' /> : <FavoriteBorderIcon fontSize='large' />
														}
													</div>
												</div>
											</div>
										</div>
									)
								} else {
									return (
										<HandSign key={index} image={sign} index={index} />
									)
								}
							})
						}

					</div>
					<a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="sr-only">Previous</span>
					</a>
					<a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="sr-only">Next</span>
					</a>
				</div>
			</React.Fragment>
		)
	}
	else {
		// navigate(path, {state:  {name: 'ajay', age:20}  })
		navigate('/add', { state: {missingWords: missingWords, Community: community} });
	}
}

export default Carousel;
