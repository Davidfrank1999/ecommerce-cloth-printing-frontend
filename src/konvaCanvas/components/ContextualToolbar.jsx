import React from 'react';
import {
    Trash2,
    Palette,
    Edit,
    ArrowUp,
    ArrowDown
} from 'lucide-react';

const ContextualToolbar = ({
    selectedItem,
    onMoveLayer,
    canMoveUp,
    canMoveDown,
    onOpenTextEditModal,
    onTextColorChange,
    onDeleteSelected,
    activeTool,
    drawColor,
    setDrawColor
}) => {
    // Render nothing if no tool or item requires a contextual toolbar
    if (!selectedItem && activeTool !== 'draw') {
        return null;
    }

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex items-center gap-2 z-20">
            {/* Toolbar for a selected item */}
            {selectedItem && (
                <>
                    <button onClick={() => onMoveLayer(-1)} disabled={!canMoveDown} className="p-1 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-40">
                        <ArrowDown size={20} />
                    </button>
                    <button onClick={() => onMoveLayer(1)} disabled={!canMoveUp} className="p-1 text-gray-600 hover:bg-gray-100 rounded-md disabled:opacity-40">
                        <ArrowUp size={20} />
                    </button>

                    {selectedItem.type === 'text' && (
                        <>
                            <div className="w-px h-5 bg-gray-200 mx-1" />
                            <button onClick={onOpenTextEditModal} className="p-1 text-gray-600 hover:bg-gray-100 rounded-md">
                                <Edit size={20} />
                            </button>
                            <label className="relative group flex items-center cursor-pointer p-1">
                                <Palette size={20} style={{ color: selectedItem.fill }} />
                                <input
                                    type="color"
                                    value={selectedItem.fill}
                                    onChange={(e) => onTextColorChange(e.target.value)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>
                        </>
                    )}
                    <div className="w-px h-5 bg-gray-200 mx-1" />
                    <button onClick={onDeleteSelected} className="p-1 text-red-500 hover:bg-red-100 rounded-md">
                        <Trash2 size={20} />
                    </button>
                </>
            )}

            {/* Toolbar for the draw tool */}
            {activeTool === 'draw' && !selectedItem && (
                 <>
                    <label className="relative group flex items-center cursor-pointer p-1">
                       <Palette size={20} style={{ color: drawColor }} />
                       <input
                           type="color"
                           value={drawColor}
                           onChange={(e) => setDrawColor(e.target.value)}
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                       />
                   </label>
                </>
            )}
        </div>
    );
};

export default ContextualToolbar;