import React from "react";
import AdminForm from "../components/Forms/AdminForm";
import CategoriesList from "../components/CategoriesList";
import Search from "../components/Search";


const Admin = () => {

	return (
		<div style={{'display':'flex'}}>
			<div className="AdminForm">
				<Search/>
				<AdminForm />
			</div>
			<div className="QuestionsTree">
				<CategoriesList/>
			</div>
		</div>
	)
}

export default Admin