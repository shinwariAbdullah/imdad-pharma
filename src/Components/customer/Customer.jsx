import React, { useState, useEffect } from 'react';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    sales: 0,
    purchases: 0
  });
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    // Fetch customers data from local storage or API
    const savedData = JSON.parse(localStorage.getItem('customerData')) || { customers: [] };
    setCustomers(savedData.customers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      // Update existing customer
      const updatedCustomers = customers.map(customer =>
        customer.id === form.id ? { ...form } : customer
      );
      setCustomers(updatedCustomers);
    } else {
      // Add new customer
      const newCustomer = { id: Date.now(), ...form };
      setCustomers([...customers, newCustomer]);
    }

    localStorage.setItem('customerData', JSON.stringify({ customers: [...customers] }));
    
    // Clear the form
    setForm({ id: null, name: '', email: '', phone: '', address: '', sales: 0, purchases: 0 });
  };

  const handleEdit = (customer) => {
    setForm({ ...customer });
  };

  const handleViewDetails = (customer) => {
    setCustomerDetails(customer);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Customer Management</h2>

        {/* Customer Form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-bold mb-4">{form.id ? 'Edit Customer' : 'Add New Customer'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name:</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">Phone:</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">Address:</label>
              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="sales" className="block text-lg font-medium text-gray-700 mb-2">Sales:</label>
              <input
                id="sales"
                name="sales"
                type="number"
                value={form.sales}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="purchases" className="block text-lg font-medium text-gray-700 mb-2">Purchases:</label>
              <input
                id="purchases"
                name="purchases"
                type="number"
                value={form.purchases}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {form.id ? 'Update Customer' : 'Add Customer'}
          </button>
        </form>

        {/* Customers Table */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-extrabold text-gray-800 mb-4">Customers List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="hidden md:table-row">
                  <th className="py-3 px-6 bg-gray-100 text-left text-lg font-semibold text-gray-700 border-b">#</th>
                  <th className="py-3 px-6 bg-gray-100 text-left text-lg font-semibold text-gray-700 border-b">Name</th>
                  <th className="py-3 px-6 bg-gray-100 text-left text-lg font-semibold text-gray-700 border-b">Email</th>
                  <th className="py-3 px-6 bg-gray-100 text-left text-lg font-semibold text-gray-700 border-b">Phone</th>
                  <th className="py-3 px-6 bg-gray-100 text-left text-lg font-semibold text-gray-700 border-b">Address</th>
                  <th className="py-3 px-6 bg-gray-100 text-left text-lg font-semibold text-gray-700 border-b">Sales</th>
                  <th className="py-3 px-6 bg-gray-100 text-left text-lg font-semibold text-gray-700 border-b">Purchases</th>
                  <th className="py-3 px-6 bg-gray-100 text-left text-lg font-semibold text-gray-700 border-b">Actions</th>
                </tr>
                <tr className="md:hidden">
                  <th className="py-3 px-6 bg-gray-100 text-left text-lg font-semibold text-gray-700 border-b">Details</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <React.Fragment key={customer.id}>
                    <tr className="md:table-row flex flex-col md:flex-row border-b border-gray-300">
                      <td className="py-4 px-6 border-b md:border-b-0 md:border-r md:w-1/12">{index + 1}</td>
                      <td className="py-4 px-6 border-b md:border-b-0 md:border-r md:w-1/6">{customer.name}</td>
                      <td className="py-4 px-6 border-b md:border-b-0 md:border-r md:w-1/6">{customer.email}</td>
                      <td className="py-4 px-6 border-b md:border-b-0 md:border-r md:w-1/6">{customer.phone}</td>
                      <td className="py-4 px-6 border-b md:border-b-0 md:border-r md:w-1/6">{customer.address}</td>
                      <td className="py-4 px-6 border-b md:border-b-0 md:border-r md:w-1/6">{customer.sales}</td>
                      <td className="py-4 px-6 border-b md:border-b-0 md:border-r md:w-1/6">{customer.purchases}</td>
                      <td className="py-4 px-6 border-b md:border-b-0 md:border-r md:w-1/6">
                        <button
                          onClick={() => handleEdit(customer)}
                          className="text-blue-500 hover:text-blue-700 font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleViewDetails(customer)}
                          className="ml-4 text-green-500 hover:text-green-700 font-semibold"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                    {/* Mobile details view */}
                    <tr className="md:hidden">
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <div><strong>Name:</strong> {customer.name}</div>
                          <div><strong>Email:</strong> {customer.email}</div>
                          <div><strong>Phone:</strong> {customer.phone}</div>
                          <div><strong>Address:</strong> {customer.address}</div>
                          <div><strong>Sales:</strong> {customer.sales}</div>
                          <div><strong>Purchases:</strong> {customer.purchases}</div>
                          <div className="mt-2">
                            <button
                              onClick={() => handleEdit(customer)}
                              className="text-blue-500 hover:text-blue-700 font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleViewDetails(customer)}
                              className="ml-4 text-green-500 hover:text-green-700 font-semibold"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Customer Details Modal */}
        {customerDetails && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h3 className="text-2xl font-bold mb-4">Customer Details</h3>
              <div className="mb-4">
                <p><strong>Name:</strong> {customerDetails.name}</p>
                <p><strong>Email:</strong> {customerDetails.email}</p>
                <p><strong>Phone:</strong> {customerDetails.phone}</p>
                <p><strong>Address:</strong> {customerDetails.address}</p>
                <p><strong>Sales:</strong> {customerDetails.sales}</p>
                <p><strong>Purchases:</strong> {customerDetails.purchases}</p>
              </div>
              <button
                onClick={() => setCustomerDetails(null)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Customer;
