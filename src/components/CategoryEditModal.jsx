import React, { useState, useEffect } from 'react';

const CategoryEditModal = ({ category, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    imageUrl: '',
    startTime: '09:00',
    endTime: '21:00',
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        imageUrl: category.imageUrl || '',
        startTime: category.startTime || '09:00',
        endTime: category.endTime || '21:00',
      });
    } else {
      setFormData({ name: '', imageUrl: '', startTime: '09:00', endTime: '21:00' });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(formData.name);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {category ? 'Edit Category' : 'Add New Category'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Form fields remain the same */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
              <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Available From</label>
                    <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Available Until</label>
                    <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
            </div>
          </div>
          
          {/* --- ACTION BUTTONS --- */}
          <div className="mt-6 flex justify-between items-center">
            {/* Delete Button (only shows when editing) */}
            <div>
              {category && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              )}
            </div>
            
            {/* Save and Cancel Buttons */}
            <div className="flex space-x-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700">
                Save Category
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryEditModal;
