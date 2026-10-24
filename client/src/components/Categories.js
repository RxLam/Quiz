import React from 'react'
import { Card, Typography, ConfigProvider } from 'antd'
import { useNavigate } from "react-router";
import { MAIN_ROUTE } from "../consts";
import { useSelector } from "react-redux";
import { selectFilteredCategories } from "../redux/categories/selectors";

const { Title } = Typography
const { Meta } = Card

const Categories = () => {
	const navigate = useNavigate()
	const filteredCategories = useSelector(selectFilteredCategories)

	const colors = ['#ebae34', '#e8eb34', '#80eb34', '#34eb93', '#34ebe5', '#3446eb']


	return (
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