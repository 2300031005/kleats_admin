import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import MenuItemCard from '../components/MenuItemCard';
import EditMenuItemModal from '../components/EditMenuItemModal';
import CategoryCard from '../components/CategoryCard';
import CategoryEditModal from '../components/CategoryEditModal';

// --- Helper function to check if a category is currently active ---
const isCategoryActiveNow = (category) => {
    if (!category || !category.startTime || !category.endTime) return true;
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [startHours, startMinutes] = category.startTime.split(':').map(Number);
    const startTimeInMinutes = startHours * 60 + startMinutes;
    const [endHours, endMinutes] = category.endTime.split(':').map(Number);
    const endTimeInMinutes = endHours * 60 + endMinutes;
    return currentTime >= startTimeInMinutes && currentTime <= endTimeInMinutes;
};

// --- DUMMY DATA ---
const initialMenuItems = [
  { id: 1, name: 'Masala Dosa', price: 60.00, inStock: true, category: 'Tiffins', imageUrl: 'https://images.unsplash.com/photo-1626786425719-a-3b7dc5b8cb3?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, name: 'Samosa', price: 15.00, inStock: true, category: 'Snacks', imageUrl: 'https://images.unsplash.com/photo-1601050690594-716e1d9b9b09?q=80&w=1935&auto=format&fit=crop' },
  { id: 3, name: 'Veg Biryani', price: 120.00, inStock: true, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop' },
  { id: 7, name: 'Idli', price: 40.00, inStock: true, category: 'Tiffins', imageUrl: 'https://images.unsplash.com/photo-1595235334239-ab620a30f4a4?q=80&w=1974&auto=format&fit=crop' },
];

const initialCategories = [
    { name: 'Tiffins', itemCount: 2, imageUrl: 'https://images.unsplash.com/photo-1626786425719-a-3b7dc5b8cb3?q=80&w=2070&auto=format&fit=crop', startTime: '08:00', endTime: '12:00' },
    { name: 'Snacks', itemCount: 1, imageUrl: 'https://images.unsplash.com/photo-1601050690594-716e1d9b9b09?q=80&w=1935&auto=format&fit=crop', startTime: '15:00', endTime: '18:00' },
    { name: 'Main Course', itemCount: 1, imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop', startTime: '12:00', endTime: '22:00' },
];

const dummyMetrics = {
    todaySales: 7550.50,
    todayOrders: 125,
    monthlySales: 185750.00,
};

const MenuPage = ({ onLogout, navigateTo, currentPage }) => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [categories, setCategories] = useState(initialCategories);
  const [editingItem, setEditingItem] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleSelectCategory = (categoryName) => setSelectedCategory(categoryName);
  const handleBackToCategories = () => setSelectedCategory(null);
  const handleCloseAllModals = () => {
    setEditingItem(null);
    setIsAddingNew(false);
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };
  const handleAddNewItem = () => { setIsAddingNew(true); setEditingItem({ name: '', price: 0, imageUrl: '', inStock: true, category: selectedCategory }); };
  const handleEditItem = (item) => { setIsAddingNew(false); setEditingItem(item); };
  
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleSaveItem = (updatedItem) => {
    const correctedItem = { ...updatedItem, price: parseFloat(updatedItem.price) || 0 };
    if (isAddingNew) {
      setMenuItems(prev => [...prev, { ...correctedItem, id: Date.now() }]);
    } else {
      setMenuItems(prev => prev.map(item => (item.id === correctedItem.id ? correctedItem : item)));
    }
    handleCloseAllModals();
  };

  const handleStockToggle = (itemId) => {
    setMenuItems(prev => prev.map(item => item.id === itemId ? { ...item, inStock: !item.inStock } : item));
  };
  
  const handleDeleteItem = (itemId) => {
    setMenuItems(prev => prev.filter(item => item.id !== itemId));
    handleCloseAllModals();
  };
  
  const handleSaveCategory = (categoryData) => {
    if (editingCategory) { 
        setCategories(prev => prev.map(cat => cat.name === editingCategory.name ? { ...cat, ...categoryData } : cat));
    } else { 
        if (categories.some(cat => cat.name.toLowerCase() === categoryData.name.toLowerCase())) {
            alert("A category with this name already exists.");
            return;
        }
        const newCategory = { ...categoryData, itemCount: 0 };
        setCategories(prev => [...prev, newCategory]);
    }
    handleCloseAllModals();
  };

  // --- NEW DELETE CATEGORY HANDLER ---
  const handleDeleteCategory = (categoryName) => {
    // Safety Check: Prevent deletion if category contains items.
    const itemsInCategory = menuItems.filter(item => item.category === categoryName);
    if (itemsInCategory.length > 0) {
      alert(`Cannot delete "${categoryName}". Please move or delete its ${itemsInCategory.length} items first.`);
      return;
    }

    if (window.confirm(`Are you sure you want to delete the "${categoryName}" category? This action cannot be undone.`)) {
      setCategories(prev => prev.filter(cat => cat.name !== categoryName));
      handleCloseAllModals();
    }
  };

  const itemsToShow = selectedCategory ? menuItems.filter(item => item.category === selectedCategory) : [];
  
  const categoryIsActive = useMemo(() => {
    if (!selectedCategory) return true;
    const categoryDetails = categories.find(c => c.name === selectedCategory);
    return isCategoryActiveNow(categoryDetails);
  }, [selectedCategory, categories]);

  return (
    <Layout metrics={dummyMetrics} onLogout={onLogout} navigateTo={navigateTo} currentPage={currentPage}>
      {!selectedCategory ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Menu Categories</h1>
            <button onClick={() => { setEditingCategory(null); setIsCategoryModalOpen(true); }} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700">
              + Add New Category
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map(cat => (
              <CategoryCard 
                key={cat.name} 
                category={cat} 
                onSelectCategory={handleSelectCategory}
                onEditCategory={handleEditCategory}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <button onClick={handleBackToCategories} className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
              Back to Categories
            </button>
            <button onClick={handleAddNewItem} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700">
              + Add New Item
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">{selectedCategory}</h1>
          {!categoryIsActive && (
            <div className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg" role="alert">
              <span className="font-medium">Category Inactive:</span> This category is currently outside its available time range. All items will appear as "Out of Stock".
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {itemsToShow.map(item => (
              <MenuItemCard 
                key={item.id} 
                item={item} 
                onEdit={handleEditItem} 
                onStockToggle={handleStockToggle}
                isCategoryActive={categoryIsActive}
              />
            ))}
          </div>
        </>
      )}

      {/* Modals */}
      {editingItem && (
        <EditMenuItemModal item={editingItem} isAddingNew={isAddingNew} onClose={handleCloseAllModals} onSave={handleSaveItem} onDelete={handleDeleteItem} />
      )}
      {isCategoryModalOpen && (
        <CategoryEditModal 
          category={editingCategory} 
          onClose={handleCloseAllModals} 
          onSave={handleSaveCategory}
          onDelete={handleDeleteCategory} // Pass the new delete handler
        />
      )}
    </Layout>
  );
};

export default MenuPage;
