import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchHorseBreedsPag = (pageNumber) => {
	return axios.get(
		`http://localhost:4050/horseBreeds?_limit=2&_page=${pageNumber}`
	);
};

export const PaginatedQueriesPage = () => {

	const [pageNumber, setPageNumber] = useState(1);

	const { isLoading, isError, error, data, isFetching } = useQuery(
		["horseBreeds", pageNumber],
		() => fetchHorseBreedsPag(pageNumber),
		{
			keepPreviousData: true,
		}
	);

	if (isLoading) {
		return <h3>Loading...</h3>;
	}

	if (isError) {
		return <h3>{error.message}</h3>;
	}

	return (
		<div>
			<div>
				{data?.data?.map((el) => (
					<div key={el.id}>
						<h2>
							{el.id}. {el.name}
						</h2>
					</div>
				))}
			</div>

            <div>
                <button disabled={pageNumber === 1}
                    onClick={() => setPageNumber(page => page - 1)}
                >
                    Prev page
                </button>

                <button disabled={pageNumber === 5}
                    onClick={() => setPageNumber(page => page + 1)}
                >
                    Next page
                </button>
            </div>
            {isFetching && 'Loading'}
		</div>
	);
};
