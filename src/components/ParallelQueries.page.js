import axios from "axios"
import { useQuery } from "react-query"


const fetchPets = () => {
    return axios.get('http://localhost:4050/pets')
}

const fetchFoods = () => {
    return axios.get('http://localhost:4050/foods')
}

export const ParallelQueriesPage = () => {

    const { data: pets } = useQuery('pets', fetchPets)
    const { data: foods } = useQuery('foods', fetchFoods)

    console.log(pets)
    console.log(foods)

    return (

        <div>
            <h2>ParallelQueriesPage</h2>

            <h3>Pets' names:</h3>
            {
                pets?.data?.map(el => (
                    <div key={el.id}>
                        <h4>{el.name}</h4>
                    </div>
                ))
            }

            <h3>Foods' names:</h3>
            {
                foods?.data?.map(el => (
                    <div key={el.id}>
                        <h4>{el.food.map((name, i) => (
                            <div key={i}>
                                <h4>{name}</h4>
                            </div>
                        ))}</h4>
                    </div>
                ))
            }
        </div>
    )
}