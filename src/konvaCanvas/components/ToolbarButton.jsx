import React from 'react';

const ToolbarButton = ({ icon, label, active, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full flex flex-col items-center py-2 px-1 rounded-md transition-colors ${
            active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
        } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
        title={label}
    >
        {icon}
        <span className="text-xs mt-1">{label}</span>
    </button>
);

export default ToolbarButton;