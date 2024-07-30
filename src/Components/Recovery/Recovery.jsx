import React, { useState } from 'react';

const Recovery = () => {
  const [form, setForm] = useState({
    customerName: '',
    amountRecovered: '',
    recoveryDate: '',
    loanAmount: ''  // Added loan amount field
  });
  const [recoveries, setRecoveries] = useState([]);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.customerName || !form.amountRecovered || !form.recoveryDate || !form.loanAmount) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');

    // Create a new recovery entry
    const newRecovery = {
      id: Date.now(),
      ...form,
    };

    // Update the recoveries state and clear the form
    setRecoveries([...recoveries, newRecovery]);
    setForm({ customerName: '', amountRecovered: '', recoveryDate: '', loanAmount: '' });
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-100 min-h-screen">
      <section className="bg-white shadow-lg rounded-lg p-4 md:p-8 mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6">Recovery Management</h2>

        {/* Recovery Form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Record New Recovery</h3>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-4">
            <div className="mb-4">
              <label htmlFor="customerName" className="block text-base md:text-lg font-medium text-gray-700 mb-2">Customer Name:</label>
              <input
                id="customerName"
                name="customerName"
                type="text"
                value={form.customerName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amountRecovered" className="block text-base md:text-lg font-medium text-gray-700 mb-2">Amount Recovered (₨):</label>
              <input
                id="amountRecovered"
                name="amountRecovered"
                type="number"
                value={form.amountRecovered}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="recoveryDate" className="block text-base md:text-lg font-medium text-gray-700 mb-2">Recovery Date:</label>
              <input
                id="recoveryDate"
                name="recoveryDate"
                type="date"
                value={form.recoveryDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="loanAmount" className="block text-base md:text-lg font-medium text-gray-700 mb-2">Loan Amount (₨):</label>
              <input
                id="loanAmount"
                name="loanAmount"
                type="number"
                value={form.loanAmount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Record Recovery
          </button>
        </form>

        {/* History Button */}
        <div className="text-center mb-6">
          <button
            onClick={toggleHistory}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
        </div>

        {/* Recoveries List */}
        {showHistory && (
          <section className="bg-white shadow-lg rounded-lg p-4 md:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-4">Recoveries List</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                <thead>
                  <tr>
                    <th className="py-3 px-2 md:px-6 bg-gray-100 text-left text-base md:text-lg font-semibold text-gray-700 border-b">#</th>
                    <th className="py-3 px-2 md:px-6 bg-gray-100 text-left text-base md:text-lg font-semibold text-gray-700 border-b">Customer Name</th>
                    <th className="py-3 px-2 md:px-6 bg-gray-100 text-left text-base md:text-lg font-semibold text-gray-700 border-b">Amount Recovered (₨)</th>
                    <th className="py-3 px-2 md:px-6 bg-gray-100 text-left text-base md:text-lg font-semibold text-gray-700 border-b">Recovery Date</th>
                    <th className="py-3 px-2 md:px-6 bg-gray-100 text-left text-base md:text-lg font-semibold text-gray-700 border-b">Loan Amount (₨)</th>
                  </tr>
                </thead>
                <tbody>
                  {recoveries.map((recovery, index) => (
                    <tr key={recovery.id}>
                      <td className="py-4 px-2 md:px-6 border-b text-sm md:text-base">{index + 1}</td>
                      <td className="py-4 px-2 md:px-6 border-b text-sm md:text-base">{recovery.customerName}</td>
                      <td className="py-4 px-2 md:px-6 border-b text-sm md:text-base">₨{recovery.amountRecovered}</td>
                      <td className="py-4 px-2 md:px-6 border-b text-sm md:text-base">{new Date(recovery.recoveryDate).toLocaleDateString()}</td>
                      <td className="py-4 px-2 md:px-6 border-b text-sm md:text-base">₨{recovery.loanAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Recovery;
