import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchPets = () => {
	return axios.get("http://localhost:4050/pets");
};

const addPetData = (pet) => {
	return axios.post("http://localhost:4050/pets", pet);
};

export const usePetsData = () => {
	return useQuery("pets", fetchPets);
};

export const useAddPetData = () => {
	const queryClient = useQueryClient();
	return useMutation(addPetData, {
		// onSuccess: (data) => {
		// queryClient.invalidateQueries('pets') Query Invalidation N22
		// queryClient.setQueryData('pets', (oldQueryData) => {
		//     return {
		//         ...oldQueryData,
		//         data: [...oldQueryData.data, data.data]
		//     }
		// })
		// }

		onMutate: (newPet) => {
			queryClient.cancelQueries("pets");
			const previousPetsData = queryClient.getQueryData("pets");
			queryClient.setQueryData("pets", (oldQueryData) => {
				return {
					...oldQueryData,
					data: [
                        { id: oldQueryData?.data?.length + 1, 
                        ...newPet
                        }
                    ],
				};
			});
            return {
                previousPetsData
            }
		},

		onError: (_error, _pet, context) => {
            queryClient.setQueryData("pets", context.previousPetsData)
        },

		onSettled: () => {
            queryClient.invalidateQueries('pets')
        },
	});
};
