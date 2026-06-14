import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Resume from './components/Resume';
import Home from './Home';
import { ThemeProvider } from './theme/ThemeContext';

function App() {
	return (
		<ThemeProvider>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/resume' element={<Resume />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
