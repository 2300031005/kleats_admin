import React from 'react';

const MenuItemCard = ({ item, onEdit, onStockToggle, isCategoryActive }) => {
  // --- THE FIX IS HERE ---
  // The final "available" status now depends on BOTH the item's own stock
  // AND whether its parent category is currently active.
  const isAvailable = item.inStock && isCategoryActive;

  return (
    // We add an opacity class to visually grey out the card when the category is inactive.
    <div className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col ${!isCategoryActive ? 'opacity-60' : ''}`}>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E2E8F0/4A5568?text=No+Image'; }}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
        <p className="text-gray-700 font-semibold mt-1">₹{item.price.toFixed(2)}</p>
        
        <div className="flex-grow" />

        <div className="flex items-center justify-between mt-4">
          {/* This text now correctly uses the 'isAvailable' status */}
          <span className={`text-sm font-semibold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
            {isAvailable ? 'In Stock' : 'Out of Stock'}
          </span>
          <button
            onClick={() => onStockToggle(item.id)}
            // The toggle is disabled if the category is inactive
            disabled={!isCategoryActive}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${
              isAvailable ? 'bg-green-500' : 'bg-gray-300'
            } ${!isCategoryActive ? 'cursor-not-allowed' : ''}`}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
                isAvailable ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="mt-4 border-t pt-4">
           <button
             onClick={() => onEdit(item)}
             className="w-full text-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200"
           >
             Edit Item
           </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
