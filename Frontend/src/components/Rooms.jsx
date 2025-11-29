import { useEffect, useState } from 'react';
import { roomApi } from '../api';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ roomNumber: '', type: 'Single', price: '', status: true });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchRooms(); }, []);

  const fetchRooms = async () => {
    try {
      const res = await roomApi.getAll();
      setRooms(res.data);
    } catch (err) { alert('Failed to fetch rooms'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await roomApi.update(editingId, { ...form, roomId: editingId });
      } else {
        await roomApi.create({ ...form, roomId: 0 });
      }
      setForm({ roomNumber: '', type: 'Single', price: '', status: true });
      setEditingId(null);
      fetchRooms();
    } catch (err) { alert(err.response?.data || 'Operation failed'); }
  };

  const handleEdit = (room) => {
    setForm({ roomNumber: room.roomNumber, type: room.type, price: room.price, status: room.status });
    setEditingId(room.roomId);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this room?')) {
      await roomApi.delete(id);
      fetchRooms();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow h-fit">
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Room' : 'Add New Room'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Room Number</label>
            <input type="number" required className="input-field" value={form.roomNumber} onChange={e => setForm({...form, roomNumber: parseInt(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select className="input-field" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input type="number" step="0.01" required className="input-field" value={form.price} onChange={e => setForm({...form, price: parseFloat(e.target.value)})} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.status} onChange={e => setForm({...form, status: e.target.checked})} />
            <span className="text-sm">Is Available?</span>
          </div>
          <button className="btn-primary w-full">{editingId ? 'Update' : 'Add Room'}</button>
          {editingId && <button type="button" onClick={() => setEditingId(null)} className="btn-secondary w-full mt-2">Cancel</button>}
        </form>
      </div>

      {/* List */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">All Rooms</h2>
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3">No.</th>
              <th className="p-3">Type</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(r => (
              <tr key={r.roomId} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{r.roomNumber}</td>
                <td className="p-3">{r.type}</td>
                <td className="p-3">${r.price}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${r.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {r.status ? 'Available' : 'Booked'}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(r)} className="text-indigo-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(r.roomId)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}