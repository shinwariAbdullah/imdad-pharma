import React, { useState, useEffect } from 'react';

export default function PurchasingInChina() {
    const [amountInPKR, setAmountInPKR] = useState(100000); // Default amount in PKR
    const [conversionRate, setConversionRate] = useState(283); // Default rate: 1 USD = 283 PKR
    const [history, setHistory] = useState([]); // State to store history
    const [showHistory, setShowHistory] = useState(false); // State to toggle history visibility

    // Convert PKR to USD
    const amountInUSD = (amountInPKR / conversionRate).toFixed(2);

    // Handler to update PKR amount
    const handlePKRChange = (event) => {
        setAmountInPKR(event.target.value);
    };

    // Handler to reset the amount
    const handleReset = () => {
        setAmountInPKR(100000);
    };

    // Handler to save current PKR amount to history
    const handleSave = () => {
        const newEntry = {
            pkr: amountInPKR,
            usd: amountInUSD,
            date: new Date().toLocaleDateString()
        };
        setHistory([...history, newEntry]);
    };

    // Fetch conversion rate from an API
    useEffect(() => {
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
            .then(response => response.json())
            .then(data => setConversionRate(data.rates.PKR))
            .catch(error => console.error('Error fetching exchange rate:', error));
    }, []);

    // Toggle the history visibility
    const toggleHistory = () => {
        setShowHistory(!showHistory);
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <section className="mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Purchasing in China</h2>
                <p className="text-lg text-gray-600 mb-6">
                    For Imdad Pharma, understanding the currency conversion rates between Pakistani Rupee (PKR) and US Dollar (USD) is crucial for accurate budgeting and financial planning.
                </p>

                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Conversion Details</h3>
                    <p className="text-lg text-gray-600 mb-4">
                        <strong>Current Conversion Rate:</strong> 1 USD = {conversionRate} PKR
                    </p>
                    <div className="mb-6">
                        <label htmlFor="pkrAmount" className="block text-lg font-medium text-gray-700 mb-2">
                            Enter Amount in PKR:
                        </label>
                        <input
                            id="pkrAmount"
                            type="number"
                            value={amountInPKR}
                            onChange={handlePKRChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <p className="text-lg text-gray-600 mb-4">
                        <strong>Equivalent Amount:</strong>
                        <br />
                        <strong>{amountInPKR.toLocaleString()} PKR</strong> is approximately <strong>${amountInUSD}</strong> USD.
                    </p>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleReset}
                            className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-200"
                        >
                            Reset Amount
                        </button>
                    </div>
                </div>

                <section className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Purchasing Strategy</h3>
                    <p className="text-lg text-gray-600 mb-4">
                        When making purchases, ensure to regularly check for the most up-to-date exchange rates to optimize financial outcomes. Consider working with a financial advisor or using real-time currency conversion tools to make informed decisions.
                    </p>
                </section>

                <section className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Purchase History</h3>
                    <button
                        onClick={toggleHistory}
                        className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200 mb-4"
                    >
                        {showHistory ? "Hide History" : "Show History"}
                    </button>
                    {showHistory && (
                        history.length === 0 ? (
                            <p className="text-lg text-gray-600">No purchase history available.</p>
                        ) : (
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="p-2 border-b text-sm sm:text-base">Entry Number</th>
                                                <th className="p-2 border-b text-sm sm:text-base">Date</th>
                                                <th className="p-2 border-b text-sm sm:text-base">Amount (PKR)</th>
                                                <th className="p-2 border-b text-sm sm:text-base">Amount (USD)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.map((entry, index) => (
                                                <tr key={index}>
                                                    <td className="p-2 border-b text-sm sm:text-base">{index + 1}</td>
                                                    <td className="p-2 border-b text-sm sm:text-base">{entry.date}</td>
                                                    <td className="p-2 border-b text-sm sm:text-base">{entry.pkr.toLocaleString()}</td>
                                                    <td className="p-2 border-b text-sm sm:text-base">${entry.usd}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    )}
                </section>
            </section>
        </div>
    );
}
