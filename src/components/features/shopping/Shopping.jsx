/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { ChevronLeft, ChevronRight, Settings } from "lucide-react";

import { Menu } from "@headlessui/react";
import { ShoppingBag, Plus, Bell, ChevronDown } from "lucide-react";
import moment from "moment";

const Header = ({ onNewList, totalLists, completedLists, pendingLists }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-6 rounded-lg shadow-lg relative overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg">
        <pattern
          id="shopping-pattern"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse">
          <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="rgba(255,255,255,0.05)" />
          <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)" />
        </pattern>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#shopping-pattern)"
        />
      </svg>

      <div className="container mx-auto relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="text-white" size={32} />
              <h1 className="text-2xl font-bold text-white">Smart Shop</h1>
            </div>
            <span className="text-white text-lg">
              {moment().format("MMMM D, YYYY")}
            </span>
          </div>
          <button
            onClick={onNewList}
            className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition duration-300 flex items-center shadow-md">
            <Plus size={20} className="mr-2" />
            New List
          </button>
        </div>

        <div className="flex justify-center items-center mb-6">
          <div className="relative flex-grow max-w-2xl">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search lists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-20 py-2 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-white"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <button className="text-gray-400 hover:text-gray-600">
                <ChevronLeft size={20} />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <ChevronRight size={20} />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Settings size={20} />
              </button>
            </div>
          </div>

          <Menu as="div" className="relative inline-block text-left ml-4">
            <Menu.Button className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              Sort by
              <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                        Sort by Date
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                        Sort by Category
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <span className="text-white text-sm bg-blue-700 px-3 py-1 rounded-full">
                Total: {totalLists}
              </span>
              <span className="text-white text-sm bg-green-500 px-3 py-1 rounded-full">
                Completed: {completedLists}
              </span>
              <span className="text-white text-sm bg-yellow-500 px-3 py-1 rounded-full">
                Pending: {pendingLists}
              </span>
            </div>
            <button className="relative focus:outline-none">
              <Bell size={24} className="text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

import { Tag, Calendar } from "lucide-react";

const Sidebar = ({ lists, activeListId, onSelectList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", ...new Set(lists.map((list) => list.category))];

  const filteredLists = lists.filter(
    (list) =>
      list.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "All" || list.category === filterCategory)
  );

  return (
    <nav className="bg-gray-100 w-64 p-4 h-full overflow-y-auto flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Your Lists</h2>
      <div className="relative mb-4">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search lists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full p-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ul className="flex-grow overflow-y-auto">
        {filteredLists.map((list) => (
          <li
            key={list.id}
            className={`mb-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              activeListId === list.id
                ? "bg-blue-100 shadow-md"
                : "hover:bg-gray-200"
            }`}
            onClick={() => onSelectList(list.id)}>
            <h3 className="font-medium flex items-center">
              <ShoppingBag size={18} className="mr-2 text-blue-500" />
              {list.title}
            </h3>
            <div className="text-sm text-gray-500 mt-1 flex items-center justify-between">
              <span className="flex items-center">
                <Tag size={14} className="mr-1" />
                {list.category}
              </span>
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(list.dateCreated).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// import { Edit2, Trash2, DollarSign } from "lucide-react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Edit2, Trash2, DollarSign, ArrowUp, ArrowDown } from "lucide-react";

const ListDetail = ({
  list,
  onAddItem,
  onToggleItem,
  onDeleteItem,
  onUpdateItem,
  onReorderItems,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isDragging, setIsDragging] = useState(false);

  const totalCost = list.items.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0),
    0
  );
  const remainingBudget = list.budget ? list.budget - totalCost : null;
  const budgetPercentage = list.budget ? (totalCost / list.budget) * 100 : 0;

  const handleAddItem = (data) => {
    if (data.newItemName.trim()) {
      onAddItem(
        data.newItemName.trim(),
        parseFloat(data.newItemPrice) || 0,
        new Date().toISOString()
      );
      reset();
    }
  };

  const sortedItems = [...list.items].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "price":
        comparison = (a.price || 0) - (b.price || 0);
        break;
      case "recent":
        comparison = new Date(b.dateAdded) - new Date(a.dateAdded);
        break;
      case "smart":
        // Incomplete items first, then by price (highest to lowest), then by name
        if (a.completed !== b.completed) {
          comparison = a.completed ? 1 : -1;
        } else if (a.price !== b.price) {
          comparison = (b.price || 0) - (a.price || 0);
        } else {
          comparison = a.name.localeCompare(b.name);
        }
        break;
      default:
        comparison = 0;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(list.items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    onReorderItems(newItems);
    setIsDragging(false);
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">{list.title}</h2>
        <button
          onClick={() => {
            /* Implement edit list details */
          }}
          className="text-blue-500 hover:text-blue-700">
          <Edit2 size={20} />
        </button>
      </div>
      <div className="mb-6 flex flex-wrap justify-between items-center">
        <div>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {list.category}
          </span>
          <span className="ml-2 text-gray-500">
            Created: {new Date(list.dateCreated).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-4 sm:mt-0">
          {list.budget && (
            <div className="mb-2">
              <p className="font-semibold">Budget: ${list.budget.toFixed(2)}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${Math.min(budgetPercentage, 100)}%`,
                  }}></div>
              </div>
            </div>
          )}
          <p className="font-semibold">Total: ${totalCost.toFixed(2)}</p>
          {remainingBudget !== null && (
            <p
              className={`font-semibold ${
                remainingBudget >= 0 ? "text-green-600" : "text-red-600"
              }`}>
              {remainingBudget >= 0 ? "Remaining: " : "Over budget: "}$
              {Math.abs(remainingBudget).toFixed(2)}
            </p>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleAddItem)}
        className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="Add new item"
          {...register("newItemName")}
          className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Price"
          {...register("newItemPrice")}
          className="w-24 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
          <Plus size={20} className="mr-1" /> Add
        </button>
      </form>

      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold">Items</h3>
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="recent">Sort by Recently Added</option>
            <option value="smart">Smart Sort</option>
          </select>
          <button
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-100">
            {sortDirection === "asc" ? (
              <ArrowUp size={20} />
            ) : (
              <ArrowDown size={20} />
            )}
          </button>
        </div>
      </div>

      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={() => setIsDragging(true)}>
        <Droppable droppableId="items">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3">
              {sortedItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                        isDragging ? "opacity-50" : ""
                      }`}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => onToggleItem(index)}
                          className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span
                          className={`${
                            item.completed
                              ? "line-through text-gray-500"
                              : "text-gray-800"
                          } font-medium`}>
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-white rounded-md border px-2 py-1">
                          <DollarSign
                            size={16}
                            className="text-gray-400 mr-1"
                          />
                          <input
                            type="number"
                            value={item.price || ""}
                            onChange={(e) =>
                              onUpdateItem(index, {
                                price: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-20 focus:outline-none"
                            placeholder="Price"
                          />
                        </div>
                        <button
                          onClick={() => onDeleteItem(index)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors duration-200">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const NewListForm = ({ onSave, onCancel }) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [items, setItems] = useState([]);

  const category = watch("category");

  const handleSave = (data) => {
    onSave({
      title: data.title,
      category:
        data.category === "custom" ? data.customCategory : data.category,
      dateCreated: new Date().toISOString(),
      budget: data.budget ? parseFloat(data.budget) : null,
      items: items.map((item) => ({
        name: item.name,
        price: item.price,
        completed: false,
      })),
    });
    reset();
    setItems([]);
  };

  const handleAddItem = () => {
    const newItem = watch("newItem");
    const newItemPrice = watch("newItemPrice");
    if (newItem.trim()) {
      setItems([
        ...items,
        {
          name: newItem.trim(),
          price: parseFloat(newItemPrice) || 0,
        },
      ]);
      reset({ newItem: "", newItemPrice: "" });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create New List</h2>
      <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
        <input
          type="text"
          placeholder="List Title"
          {...register("title", { required: true })}
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          {...register("category", { required: true })}
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="groceries">Groceries</option>
          <option value="household">Household</option>
          <option value="work">Work</option>
          <option value="custom">Custom</option>
        </select>
        {category === "custom" && (
          <input
            type="text"
            placeholder="Custom Category"
            {...register("customCategory", { required: true })}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <input
          type="number"
          placeholder="Budget (optional)"
          {...register("budget")}
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b">
              <span>{item.name}</span>
              <div className="flex items-center space-x-2">
                <span>${item.price.toFixed(2)}</span>
                <button
                  onClick={() => setItems(items.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add new item"
            {...register("newItem")}
            className="flex-grow px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Price"
            {...register("newItemPrice")}
            className="w-24 px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add
          </button>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const Shopping = () => {
  const [lists, setLists] = useState([]);
  const [activeListId, setActiveListId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (lists.length > 0 && activeListId === null) {
      setActiveListId(lists[0].id);
    }
  }, [activeListId, lists]);

  const handleAddList = (newList) => {
    setLists([...lists, { ...newList, id: new Date().getTime().toString() }]);
    setIsModalOpen(false);
  };

  const handleSelectList = (id) => {
    setActiveListId(id);
  };

  const handleAddItem = (listId, newItemName, newItemPrice) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: [
                ...list.items,
                { name: newItemName, price: newItemPrice, completed: false },
              ],
            }
          : list
      )
    );
  };

  const handleToggleItem = (listId, itemIndex) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item, index) =>
                index === itemIndex
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : list
      )
    );
  };

  const handleDeleteItem = (listId, itemIndex) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter((_, index) => index !== itemIndex),
            }
          : list
      )
    );
  };

  const handleUpdateItem = (listId, itemIndex, updatedItem) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item, index) =>
                index === itemIndex ? { ...item, ...updatedItem } : item
              ),
            }
          : list
      )
    );
  };

  const activeList = lists.find((list) => list.id === activeListId);

  return (
    <div className="flex min-h-full flex-col">
      <Header
        onNewList={() => setIsModalOpen(true)}
        totalLists={lists.length}
        completedLists={lists.reduce(
          (acc, list) =>
            acc + list.items.filter((item) => item.completed).length,
          0
        )}
        pendingLists={lists.reduce(
          (acc, list) =>
            acc + list.items.filter((item) => !item.completed).length,
          0
        )}
      />
      <div className="w-full flex flex-1">
        <Sidebar
          lists={lists}
          activeListId={activeListId}
          onSelectList={handleSelectList}
        />
        <main className="flex-grow p-6 bg-gray-50 overflow-y-auto">
          {activeList ? (
            <ListDetail
              list={activeList}
              onAddItem={(name, price) =>
                handleAddItem(activeList.id, name, price)
              }
              onToggleItem={(index) => handleToggleItem(activeList.id, index)}
              onDeleteItem={(index) => handleDeleteItem(activeList.id, index)}
              onUpdateItem={(index, updatedItem) =>
                handleUpdateItem(activeList.id, index, updatedItem)
              }
            />
          ) : (
            <p className="text-gray-500">No list selected.</p>
          )}
        </main>
      </div>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <NewListForm
                    onSave={handleAddList}
                    onCancel={() => setIsModalOpen(false)}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Shopping;
