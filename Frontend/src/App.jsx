import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Rooms from './components/Rooms';
import Customers from './components/Customers';
import Bookings from './components/Bookings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
        {/* Sidebar */}
        <nav className="bg-slate-800 text-white w-full md:w-64 shrink-0">
          <div className="p-6 text-2xl font-bold border-b border-slate-700">HotelAdmin</div>
          <ul className="flex md:flex-col p-4 gap-2">
            <li><Link to="/" className="block p-3 rounded hover:bg-slate-700 transition">Dashboard</Link></li>
            <li><Link to="/rooms" className="block p-3 rounded hover:bg-slate-700 transition">Rooms</Link></li>
            <li><Link to="/customers" className="block p-3 rounded hover:bg-slate-700 transition">Customers</Link></li>
            <li><Link to="/bookings" className="block p-3 rounded hover:bg-slate-700 transition">Bookings</Link></li>
          </ul>
        </nav>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;