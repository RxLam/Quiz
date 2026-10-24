import React, { useEffect, useState } from 'react'
import { Card, Spin, Typography, ConfigProvider } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router";
import { MAIN_ROUTE } from "../consts";
import { useSelector } from "react-redux";
import { selectFilteredCategories } from "../redux/categories/selectors";
import { useAppDispatch } from "../redux/store";
import { fetchGetCategories } from "../redux/categories/asyncActions";
import { fetchGetQuestions } from "../redux/questions/asyncActions";
import { fetchGetVariants } from "../redux/variants/asyncActions";

const { Title } = Typography
const { Meta } = Card
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

const Categories = () => {
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const filteredCategories = useSelector(selectFilteredCategories)

	const colors = ['#ebae34', '#e8eb34', '#80eb34', '#34eb93', '#34ebe5', '#3446eb']

	useEffect(() => {
		// таймер поставил для теста
		setTimeout( () => {
			dispatch(fetchGetCategories())
			dispatch(fetchGetQuestions())
			dispatch(fetchGetVariants())
			setLoading(false)
		}, 700)
	}, [])


	return (
		loading ? <Spin indicator={antIcon} /> :
			filteredCategories?.map(card => {
				return <ConfigProvider
							theme={{
								token: {
									// Alias Token
									colorBgContainer: `${colors[card.id-1] || 'green'} `,
									borderRadius: 7,
								}
							}}
						>
							<Card
								className='cards'
								key={card.id}
								hoverable
								onClick={() => navigate(MAIN_ROUTE + card.id)}
								title={<Title level={2}>{card.name}</Title>}
							>
								<Meta title={card.name} className='meta'/>
							</Card>
				</ConfigProvider>
		})
	)
}

export default Categories