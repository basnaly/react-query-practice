import axios from "axios"
import { Fragment } from "react"
import { useInfiniteQuery } from "react-query"


const fetchHorseBreeds = ( {pageParam = 1}) => {
    return axios.get(`http://localhost:4050/horseBreeds?_limit=3&_page=${pageParam}`)
}

export const InfiniteQueriesPage = () => {

    const { isLoading, isError, error, data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage }
        = useInfiniteQuery(
            ['horseBreeds'],
            fetchHorseBreeds,
            {
                getNextPageParam: (_lastPage, pages) => {
                    if (pages.length < 4) {
                        return pages.length + 1
                    } else {
                        return undefined
                    }
                }
            }
        )
    
    if (isLoading) {
        return <h3>Loading</h3>
    }

    if (isError) {
        return <h3>{error.message}</h3>
    }

  return ( 
    <div>
        <div>
            {data?.pages.map((group, i) => {
                return (
                    <Fragment key={i}>
                        {
                            group.data.map(el => (
                                <h2 key={el.id}>
                                    {el.id}. {el.name}
                                </h2>
                            ))
                        }
                    </Fragment>
                )
            })}
        </div>

        <div>
            <button disabled={!hasNextPage}
                onClick={fetchNextPage}
            >
                Load more
            </button>
        </div>

        <div>{isFetching && !isFetchingNextPage ? 'Fetching' : null}</div>
    </div>
  )
}

