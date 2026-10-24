import React, {useEffect} from "react";
import {fetchAddScores} from "../redux/user/asyncActions";
import {useDispatch} from "react-redux";


const Result = ({matches, total}) => {
	const dispatch = useDispatch()
	const token = localStorage.getItem('token')

	useEffect(() => {
		if (token) {
			dispatch(fetchAddScores({scores: matches}))
		}
	}, [dispatch, matches, token])

	return (
		<div>
			<h3>
				Вы отгадали {matches} из {total} вопросов!
			</h3>
		</div>
	)
}

export default Result
