import React from "react";
import Categories from "../components/Categories";
import Search from "../components/Search";


const Main = () => {

	return (
		<>
			<div style={{marginLeft: '20' + 'px'}}>
				<Search />
			</div>
			<div>
				<Categories/>
			</div>
		</>
	)
}

export default Main