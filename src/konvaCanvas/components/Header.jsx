import React from 'react';
import {
    Download,
    Maximize,
    Minimize,
    Undo,
    Redo,
    HelpCircle
} from 'lucide-react';

const Header = ({ 
    onUndo, 
    onRedo, 
    canUndo, 
    canRedo, 
    onExport, 
    onToggleFullscreen, 
    isFullscreen,
    onOpenTour 
}) => {
    return (
        <header className="bg-white shadow-md p-2 flex justify-between items-center z-20">
            <h1 className="text-xl font-bold text-gray-800">T-Shirt Customizer</h1>
            <div className="flex items-center gap-2 tour-header-controls">
                <button onClick={onOpenTour} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <HelpCircle size={20} />
                </button>
                <button onClick={onUndo} disabled={!canUndo} className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors">
                    <Undo size={20} />
                </button>
                <button onClick={onRedo} disabled={!canRedo} className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors">
                    <Redo size={20} />
                </button>
                <button onClick={onExport} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    <Download size={18} />
                    <span>Export</span>
                </button>
                <button onClick={onToggleFullscreen} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
            </div>
        </header>
    );
};

export default Header;