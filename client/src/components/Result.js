import React from "react";
import {fetchAddScores} from "../redux/user/asyncActions";
import {useDispatch} from "react-redux";


const Result = ({matches, total}) => {
	const dispatch = useDispatch()
	const username = localStorage.getItem('username')

	const addScores = () => {
		dispatch(fetchAddScores({username, scores: matches}))
	}
	addScores()

	return (
		<div>
			<h3>
				Вы отгадали {matches} из {total} вопросов!
			</h3>
		</div>
	)
}

export default Result