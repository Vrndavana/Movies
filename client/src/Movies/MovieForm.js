import React, { useState, useEffect } from 'react'; // Pt. 1 Import React, UseParams, Axios - All three are initially disconnected
import { useParams } from 'react-router-dom';
import axios from 'axios';


const initialItem={ // Pt.2 Make some initial state... or Items 
    id:'',
    title:'',
    director:'',
    metascore:'',
    stars:''
};


// Start - const MovieForm = () => { return(<div>)} export default MovieForm - Step.1
const MovieForm = (props) => { // Pt.3 - Step.1 Make MovieForm 


    // USESTATE - USEEFFECT - INITIALITEM --- USEPARAMS
    const [movieData, setMovieData] = useState(initialItem); // UseState & UseEffect Import, InitialItem  is now utilized
    const {id} = useParams(); //<- UseParams  UseParams Import is now utilized
    //______________________


    // EFFECT
	useEffect(() => {
		const itemToUpdate = props.movies.find(movie => `${movie.id}` === id)

        if (itemToUpdate) {
            setMovieData(itemToUpdate)
        }
    }, [props.movies, id]);
	const changeHandler = e => {
        e.persist();
		setMovieData ({ ...movieData, [e.target.name]: e.target.value}) 
    };
    //_____________________________________________________
 

    // Handle Submit
	const handleSubmit = e => {
		e.preventDefault();
		// make a PUT request to edit the item
		axios.put(`http://localhost:5000/api/movies/${movieData.id}`, movieData)
			.then( res => {
                props.getMovieList(res.data);
				props.history.push(`/`);
			})
            .catch( err => console.log(err));
            setMovieData({
                id: '',
                title: '',
                director: '',
                metascore: '',
                stars: []
            })
    };
    //________________________



    // RETURN
	return (
		<div className="Umov">
			<h2 className='updatemovie'>Update Movie</h2>
			
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name='title'
					onChange={changeHandler}
					placeholder="Title"
					value={movieData.title}
				/>
				<div className="baseline" />

				<input
					type="text"
					name="director"
					onChange={changeHandler}
					placeholder="Director"
					value={movieData.director}
				/>
				<div className="baseline" />

				<input
					type="text"
					name="metascore"
					onChange={changeHandler}
					placeholder="Metascore"
					value={movieData.metascore}
				/>
				<div className="baseline" />

				<input
					type="text"
					name="stars"
					onChange={changeHandler}
					placeholder="Stars"
					value={movieData.stars}
				/>
				<div className="baseline" />

				<button className="md-button form-button">Update</button>
			</form>
		</div>
	);
   //______________________

};

export default MovieForm;


// Your form for updatin the movies is now completely built out,
// but you need to go to movies to add a button that syncs the update form to movie 