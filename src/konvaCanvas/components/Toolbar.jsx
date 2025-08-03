import React from 'react';
import ToolbarButton from './ToolbarButton';
import {
    Move,
    Type,
    Image as ImageIcon,
    Trash2,
    Paintbrush,
    Eraser,
    Smile,
} from 'lucide-react';

const Toolbar = ({
    tool,
    setTool,
    shirtSide,
    setShirtSide,
    addText,
    onImageUploadClick,
    onClearDrawing,
    hasDrawing,
    onDeleteSelected,
    isItemSelected,
    onOpenStickerDrawer
}) => {
    return (
        <aside className="w-16 bg-white flex flex-col items-center py-4 gap-1 shadow-lg z-10">
            {/* T-Shirt Side Switcher */}
            <div className="flex flex-col gap-1 w-full tour-side-switcher">
                <button
                    onClick={() => setShirtSide('front')}
                    className={`w-full text-xs py-2 ${shirtSide === 'front' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                    FRONT
                </button>
                <button
                    onClick={() => setShirtSide('back')}
                    className={`w-full text-xs py-2 ${shirtSide === 'back' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                    BACK
                </button>
            </div>

            <div className="w-full h-px bg-gray-200 my-2" />

            {/* Main Design Tools */}
            <div className="tour-main-tools w-full flex flex-col items-center gap-1">
                <ToolbarButton icon={<Move />} label="Select" active={tool === 'select'} onClick={() => setTool('select')} />
                <ToolbarButton icon={<Paintbrush />} label="Draw" active={tool === 'draw'} onClick={() => setTool('draw')} />
                <ToolbarButton icon={<Type />} label="Add Text" onClick={addText} />
                <ToolbarButton icon={<ImageIcon />} label="Upload" onClick={onImageUploadClick} />
            </div>

            {/* Mobile Sticker Drawer Button */}
            <div className="lg:hidden tour-stickers-mobile">
                <ToolbarButton icon={<Smile />} label="Stickers" onClick={onOpenStickerDrawer} />
            </div>
            
            {/* Actions */}
            <div className="mt-auto flex flex-col items-center gap-1 w-full">
                <ToolbarButton icon={<Eraser />} label="Clear" onClick={onClearDrawing} disabled={!hasDrawing} />
                <ToolbarButton icon={<Trash2 />} label="Delete" onClick={onDeleteSelected} disabled={!isItemSelected} />
            </div>
        </aside>
    );
};

export default Toolbar;