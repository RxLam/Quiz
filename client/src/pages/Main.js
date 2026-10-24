import React, {useEffect, useState} from "react";
import Categories from "../components/Categories";
import Search from "../components/Search";
import {fetchGetCategories} from "../redux/categories/asyncActions";
import {useSelector} from "react-redux";
import {selectCategoriesData} from "../redux/categories/selectors";
import {useAppDispatch} from "../redux/store";
import {selectUserData} from "../redux/user/selectors";
import {fetchGetQuestions} from "../redux/questions/asyncActions";
import {fetchGetVariants} from "../redux/variants/asyncActions";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{
	position: 'absolute',
	top:0,
	left:0,
	right:0,
	bottom:0,
	margin:'auto',
	fontSize: 200,
	color: 'black'
}} spin />


const Main = () => {
	const [loading, setLoading] = useState(true)
	const dispatch = useAppDispatch()

	useEffect(() => {
		setTimeout( () => {
			dispatch(fetchGetCategories())
			dispatch(fetchGetQuestions())
			dispatch(fetchGetVariants())
			setLoading(false)
		}, 700)
	}, [])

	const categories = useSelector(selectCategoriesData)
	const userData = useSelector(selectUserData)

	return (
		loading ? <Spin indicator={antIcon} /> :
		<>
			<div style={{marginLeft: '20' + 'px'}}>
				<Search />
			</div>
			{categories.length > 0 ?
				<div>
					<Categories/>
				</div>
				:
				<div style={{textAlign: 'center'}}>
					{userData.status === 'SUCCESS' ?
					<h2>
						Добавьте категории и вопросы через админ панель
					</h2> :
					<h2>
						Зарегестрируйтесь / Войдите и добавьте категории и вопросы через админ панель
					</h2>
					}
				</div>
			}
		</>
	)
}

export default Main