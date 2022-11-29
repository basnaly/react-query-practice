import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";

const addPetFood = (food) => {
	return axios.post("http://localhost:4050/foods", food);
};

export const AddPetFood = ({ foodId, refetch }) => {

	const [food, setFood] = useState('');

	const { mutate: petFood } = useMutation(addPetFood);
	
	const handlePetFood = () => {

		const foods = { id: foodId, food: food.split(/,\s+/) };
		petFood(foods);
        refetch()
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Food"
				value={food}
				onChange={(e) => setFood(e.target.value)}
			/>

			<button onClick={handlePetFood}>Add food</button>
		</div>
	);
};
