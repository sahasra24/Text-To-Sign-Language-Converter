import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './Components/Carousel';
// import LoopIcon from '@mui/icons-material/Loop';
import { dic } from './dictionary';
import { useLocation } from 'react-router-dom';
import Community from './Components/Community';
import axios from 'axios';

// icons
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function App() {
	const [textarea, setTextarea] = useState();
	const [signs, setSigns] = useState([]);
	const [missingWords, setMissingWords] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);
	// const [dictionary, setDictionary] = useState([]);

	const navigate = useNavigate();
	const location = useLocation();

	// console.log(location.state);
	location.state = location.state[0].toUpperCase() + location.state.slice(1);

	const communities = ['Default', 'GITAM', 'GAYATRI']


	// useEffect(() => {
	// 	const community = communities[activeIndex].toLowerCase();
	// 	axios.get(`/${community}/getDictionary`)
	// 		.then(docs => {
	// 			setDictionary(docs.data);
	// 		})
	// }, [activeIndex])

	const handleInput = (e) => {
		const { name, value } = e.target;
		setTextarea(value);
	}

	const handleSubmit = async () => {
		var words = textarea.split(' ')
		const community = communities[activeIndex].toLowerCase();
		console.log(community);
		if(community == 'default') {
			let ms = []
			for (let x of words) {
				x = x.toLowerCase();
				await axios.get(`/getWords/${x}`)
					.then(docs => {
						console.log(docs);
						if(docs.data == null) {
								console.log(x);
								// setMissingWords(prev => [...prev, x])
								ms.push(x)
						} else {
								setSigns(prev => [...prev, docs.data.image])
						}
					})
			}
			setMissingWords(prev => [...prev, ...ms])
		} else {

			let ms = []
			for (let x of words) {
				x = x.toLowerCase();
				await axios.get(`/${community}/${x}/checkWord`)
					.then(docs => {
						if(docs.data.length == 0) {
								console.log(x);
								// setMissingWords(prev => [...prev, x])
								ms.push(x)
						} else {
								setSigns(prev => [...prev, docs.data[0].key + '-' + community + '.png'])
						}
					})
			}
			setMissingWords(prev => [...prev, ...ms])
		}
	}

	const handleLogout = () => {
		navigate('/')
	}

	const handleIndex = (index) => {
		setActiveIndex(index)
	}

	return (
		<React.Fragment>

			<div class="collapse" id="navbarToggleExternalContent">
				<div class="bg-dark p-4">
					{/* <h5 class="text-white h4">Collapsed content</h5> */}
					<div className='d-flex justify-content-center align-items-center'>
						{/* <h6 className='text-white ml-2' style={{cursor: 'pointer'}}>Sign-to-Text</h6> */}
						<button className='btn btn-outline-white m-2' onClick={handleLogout}>Logout</button>
					</div>
				</div>
			</div>
			<nav class="navbar navbar-dark bg-dark">
				<div class="container-fluid">
					<h1 className='text-white titleText'>Hello {location.state}</h1>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>

				</div>
			</nav>

			<div className='container-fluid p-4'>
				<div className='row'>
					<div className='col-4'>
						<div>
							<h3 className="titleText">Popular Communities</h3>
							<p className="titleText">Select a Community</p>
							<div className='communities'>
								{
									communities.map((community, index) => {
										return index == activeIndex ? <Community name={community} key={index} index={index} active={true} updateIndex={handleIndex}/> : <Community name={community} key={index} index={index} active={false} updateIndex={handleIndex}/>
									})
								}
							</div>
						</div>
					</div>
					<div className='col-8' style={{border: '1px solid gray', padding: '2%'}}>
						<div className='d-flex justify-content-around align-items-center mb-5'>
							<div>
								<h1 className="titleText">Text to Hand-Sign</h1>
								<h6>Make your conversation more effective and quick with your loved ones.</h6>
							</div>
						</div>
						<Carousel signs={signs} missingWords={missingWords} community={communities[activeIndex].toLowerCase()}/>
						<div className='d-flex justify-content-around  mt-4'>
							<textarea className='form-control' placeholder='Enter your text here' name='textarea' value={textarea} onChange={handleInput}></textarea>
							<button className='btn btn-outline-dark ml-4' onClick={handleSubmit}>Convert</button>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default App;
