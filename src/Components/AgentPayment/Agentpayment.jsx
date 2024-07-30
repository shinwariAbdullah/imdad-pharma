import React, { useState } from "react";

export default function AgentPayment({ onSubmit }) {
  const [shipmentDetails, setShipmentDetails] = useState({
    shipmentNumber: "",
    arrivalDate: "",
    agentName: "",
    paymentAmount: "",
    paymentDate: "",
    paymentStatus: "Pending",
  });

  const [history, setHistory] = useState([]);
  const [deletedHistory, setDeletedHistory] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipmentDetails({ ...shipmentDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(shipmentDetails); // Call the parent component's onSubmit function with the details
    }

    if (editingIndex !== null) {
      // Update existing entry
      const updatedHistory = [...history];
      updatedHistory[editingIndex] = shipmentDetails;
      setHistory(updatedHistory);
      setEditingIndex(null);
    } else {
      // Add new entry
      setHistory([...history, shipmentDetails]);
    }

    // Clear form after submission
    setShipmentDetails({
      shipmentNumber: "",
      arrivalDate: "",
      agentName: "",
      paymentAmount: "",
      paymentDate: "",
      paymentStatus: "Pending",
    });
  };

  const handleEdit = (index) => {
    setShipmentDetails(history[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const [deletedEntry] = history.splice(index, 1);
    setDeletedHistory([...deletedHistory, deletedEntry]);
    setHistory([...history]);
  };

  const handleRecover = (index) => {
    const [recoveredEntry] = deletedHistory.splice(index, 1);
    setHistory([...history, recoveredEntry]);
    setDeletedHistory([...deletedHistory]);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <section className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Clearing Agent Payment Details
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Enter the details of the clearing agent payment for the shipment from
          Dubai to Karachi.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label
                htmlFor="shipmentNumber"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Shipment Number:
              </label>
              <input
                id="shipmentNumber"
                name="shipmentNumber"
                type="text"
                value={shipmentDetails.shipmentNumber}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="arrivalDate"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Arrival Date:
              </label>
              <input
                id="arrivalDate"
                name="arrivalDate"
                type="date"
                value={shipmentDetails.arrivalDate}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="agentName"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Clearing Agent Name:
              </label>
              <input
                id="agentName"
                name="agentName"
                type="text"
                value={shipmentDetails.agentName}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="paymentAmount"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Payment Amount (PKR):
              </label>
              <input
                id="paymentAmount"
                name="paymentAmount"
                type="number"
                value={shipmentDetails.paymentAmount}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="paymentDate"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Payment Date:
              </label>
              <input
                id="paymentDate"
                name="paymentDate"
                type="date"
                value={shipmentDetails.paymentDate}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="paymentStatus"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Payment Status:
              </label>
              <select
                id="paymentStatus"
                name="paymentStatus"
                value={shipmentDetails.paymentStatus}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {editingIndex !== null
              ? "Update Payment Details"
              : "Submit Payment Details"}
          </button>
        </form>

        <button
          onClick={toggleHistory}
          className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-200 mt-6"
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>
        {showHistory && history.length > 0 && (
  <section className="mt-8 border">
    <h3 className="text-2xl font-semibold text-gray-700 mb-4">
      Payment History
    </h3>
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <div className="hidden md:block">
        {/* Desktop/tablet view */}
        <table className="w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 border-b">Entry Number</th>
              <th className="p-4 border-b">Shipment Number</th>
              <th className="p-4 border-b">Arrival Date</th>
              <th className="p-4 border-b">Agent Name</th>
              <th className="p-4 border-b">Payment Amount (PKR)</th>
              <th className="p-4 border-b">Payment Date</th>
              <th className="p-4 border-b">Payment Status</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="p-4 border-b">{index + 1}</td>
                <td className="p-4 border-b">{entry.shipmentNumber}</td>
                <td className="p-4 border-b">{entry.arrivalDate}</td>
                <td className="p-4 border-b">{entry.agentName}</td>
                <td className="p-4 border-b">{entry.paymentAmount}</td>
                <td className="p-4 border-b">{entry.paymentDate}</td>
                <td className="p-4 border-b">{entry.paymentStatus}</td>
                <td className="p-4 border-b">
                  <div className="flex space-x-2 justify-end">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-600 text-white font-semibold py-1 px-3 rounded-lg hover:bg-yellow-700 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-600 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden">
        {/* Mobile view */}
        {history.map((entry, index) => (
          <div key={index} className="mb-4 border rounded-lg bg-gray-50 p-4">
            <div className="flex flex-col">
              <div className="flex justify-between text-gray-700 font-semibold">
                <span>Entry Number:</span>
                <span>{index + 1}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipment Number:</span>
                <span>{entry.shipmentNumber}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Arrival Date:</span>
                <span>{entry.arrivalDate}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Agent Name:</span>
                <span>{entry.agentName}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Payment Amount (PKR):</span>
                <span>{entry.paymentAmount}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Payment Date:</span>
                <span>{entry.paymentDate}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Payment Status:</span>
                <span>{entry.paymentStatus}</span>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-600 text-white font-semibold py-1 px-3 rounded-lg hover:bg-yellow-700 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}

        {showHistory && deletedHistory.length > 0 && (
          <section className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Deleted History
            </h3>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
              <table className="w-full text-left border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 border-b">Entry Number</th>
                    <th className="p-4 border-b">Shipment Number</th>
                    <th className="p-4 border-b">Arrival Date</th>
                    <th className="p-4 border-b">Agent Name</th>
                    <th className="p-4 border-b">Payment Amount (PKR)</th>
                    <th className="p-4 border-b">Payment Date</th>
                    <th className="p-4 border-b">Payment Status</th>
                    <th className="p-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedHistory.map((entry, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="p-4 border-b">{index + 1}</td>
                      <td className="p-4 border-b">{entry.shipmentNumber}</td>
                      <td className="p-4 border-b">{entry.arrivalDate}</td>
                      <td className="p-4 border-b">{entry.agentName}</td>
                      <td className="p-4 border-b">{entry.paymentAmount}</td>
                      <td className="p-4 border-b">{entry.paymentDate}</td>
                      <td className="p-4 border-b">{entry.paymentStatus}</td>
                      <td className="p-4 border-b">
                        <div className="flex space-x-2 justify-end">
                          <button
                            onClick={() => handleRecover(index)}
                            className="bg-green-600 text-white font-semibold py-1 px-3 rounded-lg hover:bg-green-700 transition duration-200"
                          >
                            Recover
                          </button>
                        </div>
                      </td>
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
}
