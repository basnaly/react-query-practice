import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/Home.page";
import { PetsPage } from "./components/Pets.page";
import { PetDetailsPage } from "./components/PetDetails.page";
import { DependantQueriesPage } from "./components/DependantQueries.page";
import { InfiniteQueriesPage } from "./components/InfiniteQueries.page";
import { PaginatedQueriesPage } from "./components/PaginatedQueries.page";
import { ParallelQueriesPage } from "./components/ParallelQueries.page";
import { DynamicParallelPage } from "./components/DynamicParallel.page";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<div className="App">
					<nav>
						<ul>
							<li>
								<Link to="/home">HomePage</Link>
							</li>
							<li>
								<Link to="/pets">PetsPage</Link>
							</li>
							<li>
								<Link to="/horses/inf">HorsesPage InfiniteQueries</Link>
							</li>
							<li>
								<Link to="/horses/pag">HorsesPage PaginatedQueries</Link>
							</li>
							<li>
								<Link to="/parallel">ParallelQueriesPage</Link>
							</li>
							<li>
								<Link to="/dynamic">DynamicParallel QueriesPage</Link>
							</li>
						</ul>
						<Routes>
							<Route path="/dynamic" element={<DynamicParallelPage petIds={[1, 2, 3]} /> } />
							<Route path="/parallel" element={<ParallelQueriesPage />} />
							<Route path="/horses/pag" element={<PaginatedQueriesPage />} />
							<Route path="/horses/inf" element={<InfiniteQueriesPage />} />
							<Route path="/pet-food/:petId" element={<DependantQueriesPage />} />
							<Route path="/home" element={<HomePage />} />
							<Route path="/pets" element={<PetsPage />} />
							<Route path="/pet-details/:petId" element={<PetDetailsPage />} />
						</Routes>
					</nav>
				</div>
			</BrowserRouter>
			<ReactQueryDevtools initialIs Open={false} position="bottom-right" />
		</QueryClientProvider>
	);
}

export default App;
