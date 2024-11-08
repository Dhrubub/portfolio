import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Resume from './components/Resume';
import Home from './Home'; // Path to your Hero component or default page

function App() {
	return (
		<Router>
			<Routes>
				{/* Default page route */}
				<Route path='/' element={<Home />} />

				{/* Define the route for /resume */}
				<Route path='/resume' element={<Resume />} />

				{/* Other routes can go here */}
			</Routes>
		</Router>
	);
}

export default App;
