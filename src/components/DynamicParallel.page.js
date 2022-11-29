import axios from "axios"
import { useQueries } from "react-query"

const fetchPet = petId => {
    return axios(`http://localhost:4050/pets/${petId}`)
}

export const DynamicParallelPage = ({ petIds }) => {

    const queryResult = useQueries(
        petIds.map(id => {
            return {
                queryKey: ['pets', id],
                queryFn: () => fetchPet(id)
            }
        })
    )
    console.log({queryResult})

    return (
        <div>
            <h2>Dynamic parallel page</h2>
            <h3>Pet names:</h3>
            {
                queryResult.map(el => (
                    <div key={el?.data?.data?.id}>
                        <h3>{el?.data?.data?.name}</h3>
                    </div>
                ))
            }
        </div>
    )
}