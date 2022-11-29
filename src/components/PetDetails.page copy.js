import axios from "axios"
import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"


const fetchPetDetails = petId => {
	return axios.get(`http://localhost:4050/pets/${petId}`)
}

export const PetDetailsPage = () => {

	const { petId } = useParams()

	const { isLoading, isError, error, data, isFetching } = useQuery(
		['pets', petId],
		() => fetchPetDetails(petId)
	)

	if (isLoading || isFetching) {
		return <h3>Loading...</h3>
	}

	if (isError) {
		return <h3>{error.message}</h3>
	}

	return (

		<div>

			<h2>Pet details page</h2>

			<div>{data?.data?.name}</div>
			<div>{data?.data?.breed}</div>
			<div>{data?.data?.weight}</div>

			<div>
				<Link to={`/pet-food/${petId}`}>Food</Link>
			</div>

		</div>
	)
}