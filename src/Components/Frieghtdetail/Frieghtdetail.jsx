import React, { useState, useEffect } from 'react';

export default function FreightDetail() {
  const [details, setDetails] = useState({
    shipmentNumber: '',
    originCity: '',
    destinationCity: '',
    departureDate: '',
    arrivalDate: '',
    carrierName: '',
    freightCostPKR: '',
    customsFeePKR: '',
    status: 'In Transit',
    containerNumber: '',
    contactNumber: '',
    atoms: '',
    journey: '',
    driverPaymentPKR: '',
  });

  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('freightDetails'));
    if (savedData) {
      setDetails(savedData.currentDetails || details);
      setHistory(savedData.history || []);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newHistory = [...history, { ...details, id: Date.now() }];
    setHistory(newHistory);

    localStorage.setItem('freightDetails', JSON.stringify({ currentDetails: details, history: newHistory }));
    
    console.log('Freight Details Submitted:', details);

    setDetails({
      shipmentNumber: '',
      originCity: '',
      destinationCity: '',
      departureDate: '',
      arrivalDate: '',
      carrierName: '',
      freightCostPKR: '',
      customsFeePKR: '',
      status: 'In Transit',
      containerNumber: '',
      contactNumber: '',
      atoms: '',
      journey: '',
      driverPaymentPKR: '',
    })
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <section className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Domestic Freight Details
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Enter the details of the domestic freight shipment from Karachi to Lahore.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="shipmentNumber" className="block text-lg font-medium text-gray-700 mb-2">
                Shipment Number:
              </label>
              <input
                id="shipmentNumber"
                name="shipmentNumber"
                type="text"
                value={details.shipmentNumber}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="originCity" className="block text-lg font-medium text-gray-700 mb-2">
                Origin City:
              </label>
              <input
                id="originCity"
                name="originCity"
                type="text"
                value={details.originCity}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Karachi"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="destinationCity" className="block text-lg font-medium text-gray-700 mb-2">
                Destination City:
              </label>
              <input
                id="destinationCity"
                name="destinationCity"
                type="text"
                value={details.destinationCity}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Lahore"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="departureDate" className="block text-lg font-medium text-gray-700 mb-2">
                Departure Date:
              </label>
              <input
                id="departureDate"
                name="departureDate"
                type="date"
                value={details.departureDate}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="arrivalDate" className="block text-lg font-medium text-gray-700 mb-2">
                Arrival Date:
              </label>
              <input
                id="arrivalDate"
                name="arrivalDate"
                type="date"
                value={details.arrivalDate}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="carrierName" className="block text-lg font-medium text-gray-700 mb-2">
                Carrier Name:
              </label>
              <input
                id="carrierName"
                name="carrierName"
                type="text"
                value={details.carrierName}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="freightCostPKR" className="block text-lg font-medium text-gray-700 mb-2">
                Freight Cost (PKR):
              </label>
              <input
                id="freightCostPKR"
                name="freightCostPKR"
                type="number"
                value={details.freightCostPKR}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="customsFeePKR" className="block text-lg font-medium text-gray-700 mb-2">
                Customs Fee (PKR):
              </label>
              <input
                id="customsFeePKR"
                name="customsFeePKR"
                type="number"
                value={details.customsFeePKR}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="containerNumber" className="block text-lg font-medium text-gray-700 mb-2">
                Container Number:
              </label>
              <input
                id="containerNumber"
                name="containerNumber"
                type="text"
                value={details.containerNumber}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contactNumber" className="block text-lg font-medium text-gray-700 mb-2">
                Contact Number:
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="text"
                value={details.contactNumber}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="atoms" className="block text-lg font-medium text-gray-700 mb-2">
                Atoms:
              </label>
              <input
                id="atoms"
                name="atoms"
                type="text"
                value={details.atoms}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="journey" className="block text-lg font-medium text-gray-700 mb-2">
                Journey:
              </label>
              <input
                id="journey"
                name="journey"
                type="text"
                value={details.journey}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Karachi to Lahore"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="driverPaymentPKR" className="block text-lg font-medium text-gray-700 mb-2">
                Driver Payment (PKR):
              </label>
              <input
                id="driverPaymentPKR"
                name="driverPaymentPKR"
                type="number"
                value={details.driverPaymentPKR}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={toggleHistory}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {showHistory ? 'Hide' : 'Show'} History
            </button>
          </div>
        </form>
      </section>
      {showHistory && (
        <section className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto mt-8">
          <h3 className="text-2xl font-extrabold text-gray-800 mb-4">Freight Details History</h3>
          <ul className="space-y-4">
            {history.map((entry, index) => (
              <li key={entry.id} className="border border-gray-300 p-4 rounded-lg shadow-sm">
                <h4 className="text-xl font-bold mb-2">Entry #{index + 1}</h4>
                <p><span className="font-semibold">Shipment Number:</span> {entry.shipmentNumber}</p>
                <p><span className="font-semibold">Origin City:</span> {entry.originCity}</p>
                <p><span className="font-semibold">Destination City:</span> {entry.destinationCity}</p>
                <p><span className="font-semibold">Departure Date:</span> {entry.departureDate}</p>
                <p><span className="font-semibold">Arrival Date:</span> {entry.arrivalDate}</p>
                <p><span className="font-semibold">Carrier Name:</span> {entry.carrierName}</p>
                <p><span className="font-semibold">Freight Cost (PKR):</span> {entry.freightCostPKR}</p>
                <p><span className="font-semibold">Customs Fee (PKR):</span> {entry.customsFeePKR}</p>
                <p><span className="font-semibold">Container Number:</span> {entry.containerNumber}</p>
                <p><span className="font-semibold">Contact Number:</span> {entry.contactNumber}</p>
                <p><span className="font-semibold">Atoms:</span> {entry.atoms}</p>
                <p><span className="font-semibold">Journey:</span> {entry.journey}</p>
                <p><span className="font-semibold">Driver Payment (PKR):</span> {entry.driverPaymentPKR}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
