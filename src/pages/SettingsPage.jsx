import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

// --- DUMMY DATA ---
// In a real app, this would be fetched from a '/api/settings' endpoint.
const initialSettings = {
  parcelCharge: 10.00,
  notificationNumbers: [
    '9876543210', // Example number
  ],
};

const dummyMetrics = {
    todaySales: 7550.50,
    todayOrders: 125,
    monthlySales: 185750.00,
};

const SettingsPage = ({ onLogout, navigateTo, currentPage }) => {
  const [parcelCharge, setParcelCharge] = useState(initialSettings.parcelCharge);
  const [notificationNumbers, setNotificationNumbers] = useState(initialSettings.notificationNumbers);
  const [newNumber, setNewNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /*
  // --- API INTEGRATION: FETCH SETTINGS ---
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // const token = localStorage.getItem('authToken');
        // const response = await fetch('/api/settings', { headers: { 'Authorization': `Bearer ${token}` } });
        // if (!response.ok) throw new Error('Failed to fetch settings.');
        // const data = await response.json();
        // setParcelCharge(data.parcelCharge);
        // setNotificationNumbers(data.notificationNumbers);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);
  */

  const handleSaveParcelCharge = async () => {
    setIsLoading(true);
    /*
    // --- API INTEGRATION: UPDATE PARCEL CHARGE ---
    try {
      // const token = localStorage.getItem('authToken');
      // await fetch('/api/settings/parcel-charge', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      //   body: JSON.stringify({ parcelCharge: parseFloat(parcelCharge) }),
      // });
      // alert('Parcel charge updated successfully!');
    } catch (error) {
      console.error("Error updating parcel charge:", error);
    } finally {
      setIsLoading(false);
    }
    */
    console.log("Saving new parcel charge:", parcelCharge);
    setTimeout(() => {
      setIsLoading(false);
      alert('Parcel charge saved!');
    }, 1000);
  };

  const handleAddNumber = async () => {
    if (!newNumber || !/^\d{10}$/.test(newNumber)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }
    if (notificationNumbers.includes(newNumber)) {
        alert("This number has already been added.");
        return;
    }
    // --- CHANGED FROM 2 to 3 ---
    if (notificationNumbers.length >= 3) {
        alert("You can only have a maximum of three notification numbers. Please remove one to add a new one.");
        return;
    }
    const updatedNumbers = [...notificationNumbers, newNumber];
    /*
    // --- API INTEGRATION: UPDATE PHONE NUMBERS ---
    try {
        // const token = localStorage.getItem('authToken');
        // await fetch('/api/settings/notification-numbers', {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        //   body: JSON.stringify({ notificationNumbers: updatedNumbers }),
        // });
        setNotificationNumbers(updatedNumbers);
        setNewNumber('');
    } catch (error) {
        console.error("Error adding number:", error);
    }
    */
    setNotificationNumbers(updatedNumbers);
    setNewNumber('');
  };

  const handleRemoveNumber = async (numberToRemove) => {
    const updatedNumbers = notificationNumbers.filter(num => num !== numberToRemove);
    /*
    // --- API INTEGRATION: UPDATE PHONE NUMBERS ---
    try {
        // const token = localStorage.getItem('authToken');
        // await fetch('/api/settings/notification-numbers', {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        //   body: JSON.stringify({ notificationNumbers: updatedNumbers }),
        // });
        setNotificationNumbers(updatedNumbers);
    } catch (error) {
        console.error("Error removing number:", error);
    }
    */
    setNotificationNumbers(updatedNumbers);
  };

  return (
    <Layout 
        metrics={dummyMetrics} 
        onLogout={onLogout}
        navigateTo={navigateTo}
        currentPage={currentPage}
    >
      <div className="space-y-8">
        {/* --- Pricing Settings Card --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pricing Settings</h2>
          <div className="max-w-md">
            <label htmlFor="parcelCharge" className="block text-sm font-medium text-gray-700">
              Parcel Charge (₹)
            </label>
            <p className="text-xs text-gray-500 mb-2">This amount will be added to all orders marked as 'Parcel'.</p>
            <div className="mt-1 flex items-center space-x-3">
              <input
                type="number"
                id="parcelCharge"
                value={parcelCharge}
                onChange={(e) => setParcelCharge(e.target.value)}
                className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                step="0.50"
                min="0"
              />
              <button
                onClick={handleSaveParcelCharge}
                disabled={isLoading}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        {/* --- Notification Settings Card --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Notification Numbers</h2>
          <div className="max-w-md mb-4">
            <label htmlFor="newNumber" className="block text-sm font-medium text-gray-700">Add New Mobile Number</label>
            <div className="mt-1 flex items-center space-x-3">
              <input
                type="tel"
                id="newNumber"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
                placeholder="Enter 10-digit number"
                className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <button
                onClick={handleAddNumber}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {/* --- CHANGED FROM 2 to 3 --- */}
            <h3 className="text-md font-medium text-gray-600">Registered Numbers (Max: 3):</h3>
            {notificationNumbers.length > 0 ? (
              notificationNumbers.map(num => (
                <div key={num} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <span className="font-mono text-gray-800">{num}</span>
                  <button
                    onClick={() => handleRemoveNumber(num)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No numbers have been added yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
