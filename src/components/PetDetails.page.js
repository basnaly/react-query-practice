import axios from "axios"
import { useQuery, useQueryClient } from "react-query"
import { Link, useParams } from "react-router-dom"

const fetchPetDetails = ({ queryKey }) => {
	const petId = queryKey[1]
	return axios.get(`http://localhost:4050/pets/${petId}`)
}

export const PetDetailsPage = () => {

	const queryClient = useQueryClient()

	const { petId } = useParams()

	const { isLoading, isError, error, data } = useQuery(
		['pets', petId], fetchPetDetails, {
			initialData: () => {
				const pet = queryClient
				.getQueryData('pets')
				?.data.find(el => el.id === parseInt(petId))

				if (pet) {
					return {
						data: pet
					}
				} else {
					return undefined
				}
			}
		}
	)

	if (isLoading) {
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