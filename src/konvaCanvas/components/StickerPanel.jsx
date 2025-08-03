import React from 'react';

const StickerPanel = ({ stickers, loading, onSelectSticker }) => (
    <div className="p-4 h-full overflow-y-auto">
        {loading ? (
            <p className="text-center text-gray-500">Loading stickers...</p>
        ) : (
            <div className="grid grid-cols-3 gap-4">
                {stickers.map(sticker => (
                    <button 
                        key={sticker.id} 
                        onClick={() => onSelectSticker(sticker.src)} 
                        className="p-2 border rounded-lg hover:bg-gray-100 hover:border-blue-500 transition aspect-square focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <img src={sticker.src} alt={sticker.id} className="w-full h-full object-contain" />
                    </button>
                ))}
            </div>
        )}
    </div>
);

export default StickerPanel;