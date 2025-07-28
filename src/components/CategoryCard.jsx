import React from 'react';

// --- Helper function to check if the category is currently active ---
const isCategoryActive = (startTime, endTime) => {
  if (!startTime || !endTime) return true; // Default to active if no time is set

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes from midnight

  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const startTimeInMinutes = startHours * 60 + startMinutes;

  const [endHours, endMinutes] = endTime.split(':').map(Number);
  const endTimeInMinutes = endHours * 60 + endMinutes;

  return currentTime >= startTimeInMinutes && currentTime <= endTimeInMinutes;
};

// --- Edit Icon Component ---
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;


const CategoryCard = ({ category, onSelectCategory, onEditCategory }) => {
  const isActive = isCategoryActive(category.startTime, category.endTime);

  // Prevents the main button click from firing when the edit button is clicked
  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEditCategory) {
      onEditCategory(category);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => onSelectCategory(category.name)}
        className="w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
      >
        {/* Left Side: Image and Info */}
        <div className="flex items-center">
          <img 
            className="h-16 w-16 object-cover rounded-lg" 
            src={category.imageUrl} 
            alt={category.name}
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/E2E8F0/4A5568?text=Category'; }}
          />
          <div className="ml-4">
            <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{category.itemCount} items</p>
          </div>
        </div>

        {/* Right Side: Status */}
        <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center">
                <span className={`h-3 w-3 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span className="text-xs font-semibold text-gray-600">{isActive ? 'Active Now' : 'Inactive'}</span>
            </div>
            <div className="text-xs text-gray-500">
                {category.startTime} - {category.endTime}
            </div>
        </div>
      </button>
      
      {/* Footer with Edit Button */}
      <div className="bg-gray-50 border-t px-4 py-2">
        <button 
            onClick={handleEditClick}
            className="w-full flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
            <EditIcon />
            {/* --- TEXT CHANGED HERE --- */}
            <span className="ml-2">Edit</span>
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
