import { useEffect, useState } from 'react';
import { bookingApi, customerApi, roomApi } from '../api';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ customerId: '', roomId: '', checkInDate: '', checkOutDate: '' });

  useEffect(() => { refreshData(); }, []);

  const refreshData = async () => {
    const [b, c, r] = await Promise.all([bookingApi.getAll(), customerApi.getAll(), roomApi.getAvailable()]);
    setBookings(b.data);
    setCustomers(c.data);
    setRooms(r.data);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await bookingApi.create({ ...form, bookingId: 0, status: true });
      alert('Booking Successful!');
      setForm({ customerId: '', roomId: '', checkInDate: '', checkOutDate: '' });
      refreshData();
    } catch (err) { alert(err.response?.data || 'Booking Failed'); }
  };

  const cancelBooking = async (id) => {
    if (window.confirm("Cancel booking?")) {
      await bookingApi.cancel(id);
      refreshData();
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">New Booking</h2>
        <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <select required className="input-field" value={form.customerId} onChange={e => setForm({...form, customerId: e.target.value})}>
            <option value="">Select Customer</option>
            {customers.map(c => <option key={c.customerId} value={c.customerId}>{c.name}</option>)}
          </select>
          <select required className="input-field" value={form.roomId} onChange={e => setForm({...form, roomId: e.target.value})}>
            <option value="">Select Room</option>
            {rooms.map(r => <option key={r.roomId} value={r.roomId}>#{r.roomNumber} - {r.type}</option>)}
          </select>
          <input type="date" required className="input-field" value={form.checkInDate} onChange={e => setForm({...form, checkInDate: e.target.value})} />
          <input type="date" required className="input-field" value={form.checkOutDate} onChange={e => setForm({...form, checkOutDate: e.target.value})} />
          <button className="btn-primary h-10">Book Room</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Booking History</h2>
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr><th className="p-3">ID</th><th className="p-3">Customer</th><th className="p-3">Room</th><th className="p-3">Status</th><th className="p-3">Action</th></tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.bookingId} className="border-b">
                <td className="p-3">#{b.bookingId}</td>
                <td className="p-3">{b.customer?.name}</td>
                <td className="p-3">Room {b.room?.roomNumber}</td>
                <td className="p-3">{b.status ? <span className="text-green-600 font-bold">Active</span> : <span className="text-red-600">Cancelled</span>}</td>
                <td className="p-3">{b.status && <button onClick={() => cancelBooking(b.bookingId)} className="text-red-600 hover:underline">Cancel</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}