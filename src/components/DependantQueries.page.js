import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AddPetFood } from "./AddPetFood";

const fetchPetByPetId = (petId) => {
	return axios.get(`http://localhost:4050/pets/${petId}`);
};

const fetchFoodByFoodId = (foodId) => {
	return axios.get(`http://localhost:4050/foods/${foodId}`);
};

export const DependantQueriesPage = () => {

	const { petId } = useParams();

	const { data: petData } = useQuery(["pets", petId], () =>
		fetchPetByPetId(petId)
	);
	// petData = "pets" from db.json

	const foodId = petData?.data?.foodId;

	const { isLoading, isError, error, data, refetch } = useQuery(
		["foods", foodId],
		() => fetchFoodByFoodId(foodId),
		{
			enabled: !!foodId,
		}
	);
	// data = "foods" from db.json

	if (isLoading) {
		return <h3>Loading...</h3>;
	}

	if (isError) {
		return (
			<>
				<h3>{error.message}</h3>
				<AddPetFood foodId={foodId} refetch={refetch}/>
			</>
		);
	}

	return (
		<div>
			<h2>Dependant queries page</h2>

			<h4>List of foods</h4>

			{data?.data?.food.map((el, i) => (
				<div key={i}>
					<h3>{el}</h3>
				</div>
			))}
		</div>
	);
};
