import { useEffect, useState } from 'react';
import { customerApi } from '../api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => { fetchCustomers(); }, []);

  const fetchCustomers = async () => {
    const res = await customerApi.getAll();
    setCustomers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customerApi.create({ ...form, customerId: 0 });
      setForm({ name: '', email: '', phone: '' });
      fetchCustomers();
    } catch (err) { alert(err.response?.data || 'Error'); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-lg shadow h-fit">
        <h2 className="text-xl font-bold mb-4">Add Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Name" required className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input placeholder="Email" type="email" required className="input-field" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <input placeholder="Phone (10 digits)" pattern="\d{10}" required className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          <button className="btn-primary w-full">Save Customer</button>
        </form>
      </div>

      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Customers</h2>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Phone</th></tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.customerId} className="border-b hover:bg-gray-50">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}