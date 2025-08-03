import React from 'react';
import StickerPanel from './StickerPanel';
import { X } from 'lucide-react';

const StickerDrawer = ({
    isOpen,
    onClose,
    stickers,
    loading,
    onSelectSticker
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        // Backdrop
        <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm z-30 flex justify-end lg:hidden">
            {/* Drawer */}
            <div className="bg-white w-80 h-full shadow-xl flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold">Stickers</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>
                {/* We render the StickerPanel component inside the drawer */}
                <StickerPanel
                    stickers={stickers}
                    loading={loading}
                    onSelectSticker={onSelectSticker}
                />
            </div>
        </div>
    );
};

export default StickerDrawer;