import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { useAddPetData } from '../hooks/usePetsData'

const fetchPets = () => {
	return axios.get(`http://localhost:4050/pets`)
}

export const PetsPage = () => {

	const [name, setName] = useState('')
	const [breed, setBreed] = useState('')
	const [weight, setWeight] = useState()
	const [foodId, setFoodId] = useState('')

	const { isLoading, isError, error, data, isFetching, refetch } = useQuery(
			'pets',
			fetchPets
		)

	const { mutate: addPet } = useAddPetData()

	const handleAddPet = () => {
		console.log({name, breed, weight, foodId})

		const pet = { name, breed, weight, foodId }
		addPet(pet)
	}

	if (isLoading || isFetching) {
		return <h3>Loading...</h3>
	}

	if (isError) {
		return <h3>{error.message}</h3>
	}

	return (

		<div>
			<h2>Pets page data</h2>

			<div>
				<input
					type='text'
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<input
					type='text'
					placeholder="Breed"
					value={breed}
					onChange={(e) => setBreed(e.target.value)}
				/>

				<input
					type='number'
					placeholder="Weight"
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
				/>

				<input
					type='text'
					placeholder="FoodId"
					value={foodId}
					onChange={(e) => setFoodId(e.target.value)}
				/>

				<button onClick={handleAddPet}>Add Pet</button>
			</div>

			<button onClick={refetch}>Refetch data</button>

			{data?.data.map(el => (
				<h3 key={el.id}>
					<Link to={`/pet-details/${el.id}`}>{el.name}</Link>
				</h3>
			))}
		</div>
	)
}