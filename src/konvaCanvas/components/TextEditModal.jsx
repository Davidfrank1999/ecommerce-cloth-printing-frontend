import React from 'react';

const TextEditModal = ({ isOpen, onClose, onSave, value, setValue }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">Edit Text</h3>
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    autoFocus
                />
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                        Cancel
                    </button>
                    <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextEditModal;