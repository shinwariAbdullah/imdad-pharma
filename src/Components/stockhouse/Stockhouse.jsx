import React, { useState, useEffect } from 'react';

const Stockhouse = () => {
  const [stock, setStock] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: '',
    quantity: '',
    unit: '',
    date: ''
  });
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('stockData')) || { stock: [], history: [] };
    setStock(savedData.stock);
    setHistory(savedData.history);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id) {
      const updatedStock = stock.map(entry => entry.id === form.id ? { ...form } : entry);
      const updatedHistory = history.map(entry => entry.id === form.id ? { ...form } : entry);
      setStock(updatedStock);
      setHistory(updatedHistory);
      localStorage.setItem('stockData', JSON.stringify({ stock: updatedStock, history: updatedHistory }));
    } else {
      const newEntry = { id: Date.now(), ...form };
      const newStock = [...stock, newEntry];
      const newHistory = [...history, newEntry];
      setStock(newStock);
      setHistory(newHistory);
      localStorage.setItem('stockData', JSON.stringify({ stock: newStock, history: newHistory }));
    }

    setForm({ id: null, name: '', quantity: '', unit: '', date: '' });
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const filteredHistory = history.filter(entry => filterDate ? entry.date === filterDate : true);

  const handleEdit = (entry) => {
    setForm({ ...entry });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-100 min-h-screen">
      <section className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4">
          Imdad Pharma - Stock in Warehouse
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Here you can add new stock entries and view the current stock and history of stock entries.
        </p>

        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">
            {form.id ? 'Edit Stock Entry' : 'Add New Stock Entry'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                Product Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                Quantity:
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="unit" className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                Unit:
              </label>
              <input
                id="unit"
                name="unit"
                type="text"
                value={form.unit}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                Entry Date:
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {form.id ? 'Update Stock' : 'Add Stock'}
          </button>
        </form>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={toggleHistory}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {showHistory ? 'Hide' : 'Show'} History
          </button>
          {showHistory && (
            <input
              type="date"
              value={filterDate}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Filter by date"
            />
          )}
        </div>
      </section>

      {/* Current Stock Table */}
      <section className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-8 max-w-4xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-4">Current Stock in Warehouse</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr>
                <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">#</th>
                <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Product Name</th>
                <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Quantity</th>
                <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Unit</th>
                <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Date</th>
                <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((entry, index) => (
                <tr key={entry.id}>
                  <td className="py-4 px-2 sm:px-6 border-b text-sm sm:text-base">{index + 1}</td>
                  <td className="py-4 px-2 sm:px-6 border-b text-sm sm:text-base">{entry.name}</td>
                  <td className="py-4 px-2 sm:px-6 border-b text-sm sm:text-base">{entry.quantity}</td>
                  <td className="py-4 px-2 sm:px-6 border-b text-sm sm:text-base">{entry.unit}</td>
                  <td className="py-4 px-2 sm:px-6 border-b text-sm sm:text-base">{entry.date}</td>
                  <td className="py-4 px-2 sm:px-6 border-b">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Stock Entry History Table */}
      {showHistory && (
        <section className="bg-white shadow-lg rounded-lg p-4 sm:p-6 max-w-4xl mx-auto mt-8">
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-4">Stock Entry History</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr>
                  <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">#</th>
                  <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Product Name</th>
                  <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Quantity</th>
                  <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Unit</th>
                  <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((entry, index) => (
                  <tr key={entry.id} className="block md:table-row">
                    <td className="py-4 px-2 sm:px-6 border-b text-sm sm:text-base md:table-cell">{index + 1}</td>
                    <td className="py-4 px-2 sm:px-6 border-b text-sm sm:text-base md:table-cell">{entry.name}</td>
                    <td className="py-4 px-2 sm:px-6 border-b text-sm sm:text-base md:table-cell">{entry.quantity}</td>
                    <td className="py-4 px-2 sm:px-6 border-b text-sm sm:text-base md:table-cell">{entry.unit}</td>
                    <td className="py-4 px-2 sm:px-6 border-b text-sm sm:text-base md:table-cell">{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default Stockhouse;
