import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { TourProvider, useTour } from '@reactour/tour';

// Import all the components we created
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import ContextualToolbar from './components/ContextualToolbar';
import StickerPanel from './components/StickerPanel';
import StickerDrawer from './components/StickerDrawer';
import TextEditModal from './components/TextEditModal';

// Import tour configuration
import { getTourSteps, tourStyles } from './utils/tour';

// Import T-shirt images
import Tshirt from './product.jpeg'; // Using 'Tshirt' as per your function
import TshirtBack from './white-tshirt.png'; // Replace with the actual back image

// This is the core application component
const CustomizerCore = () => {
    // --- Refs ---
    const stageRef = useRef(null);
    const containerRef = useRef(null);
    const fileUploadRef = useRef(null);
    const mainContainerRef = useRef(null);
    const isDrawing = useRef(false);
    
    // --- Tour ---
    const { setIsOpen } = useTour();

    // --- State ---
    const [designs, setDesigns] = useState({ front: { elements: [], lines: [] }, back: { elements: [], lines: [] } });
    const [history, setHistory] = useState({ front: [[]], back: [[]] });
    const [historyStep, setHistoryStep] = useState({ front: 0, back: 0 });
    const [shirtSide, setShirtSide] = useState('front');
    const [tool, setTool] = useState('select');
    const [selectedId, setSelectedId] = useState(null);
    const [drawColor, setDrawColor] = useState('#000000');
    
    // UI State
    const [stageSize, setStageSize] = useState({ width: 500, height: 600 });
    const [productImage, setProductImage] = useState(null);
    const [printableArea, setPrintableArea] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Sticker State
    const [cloudinaryStickers, setCloudinaryStickers] = useState([]);
    const [stickersLoading, setStickersLoading] = useState(true);
    const [isStickerDrawerOpen, setIsStickerDrawerOpen] = useState(false);

    // Modal State
    const [editingText, setEditingText] = useState("");
    const [isTextEditModalOpen, setIsTextEditModalOpen] = useState(false);
    
    // Derived State
    const currentDesigns = designs[shirtSide];
    const userSelectedItem = currentDesigns.elements.find(e => e.id === selectedId);
    const selectedItemIndex = currentDesigns.elements.findIndex(e => e.id === selectedId);
    const canUndo = historyStep[shirtSide] > 0;
    const canRedo = historyStep[shirtSide] < history[shirtSide].length - 1;

    // --- Logic ---
    const saveState = useCallback(() => {
        const newHistory = { ...history };
        const currentState = { elements: designs[shirtSide].elements, lines: designs[shirtSide].lines };
        const sideHistory = newHistory[shirtSide].slice(0, historyStep[shirtSide] + 1);
        
        sideHistory.push(currentState);
        newHistory[shirtSide] = sideHistory;
        
        setHistory(newHistory);
        setHistoryStep(hs => ({ ...hs, [shirtSide]: sideHistory.length - 1 }));
    }, [history, historyStep, designs, shirtSide]);

    const undo = useCallback(() => {
        if (!canUndo) return;
        const newStep = historyStep[shirtSide] - 1;
        const prevState = history[shirtSide][newStep];
        if (prevState) {
            setDesigns(d => ({ ...d, [shirtSide]: { elements: prevState.elements || [], lines: prevState.lines || [] } }));
            setHistoryStep(hs => ({ ...hs, [shirtSide]: newStep }));
        }
    }, [canUndo, history, historyStep, shirtSide]);

    const redo = useCallback(() => {
        if (!canRedo) return;
        const newStep = historyStep[shirtSide] + 1;
        const nextState = history[shirtSide][newStep];
        if (nextState) {
            setDesigns(d => ({ ...d, [shirtSide]: { elements: nextState.elements || [], lines: nextState.lines || [] } }));
            setHistoryStep(hs => ({ ...hs, [shirtSide]: newStep }));
        }
    }, [canRedo, history, historyStep, shirtSide]);

    // This is your corrected function
    const fitStageIntoParent = useCallback(() => {
        if (containerRef.current) {
            const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
            setStageSize({ width: containerWidth, height: containerHeight });

            const img = new window.Image();
            img.src = shirtSide === 'front' ? Tshirt : TshirtBack;
            img.onload = () => {
                const scale = Math.min(containerWidth / img.width, containerHeight / img.height) * 0.8;
                const imgWidth = img.width * scale;
                const imgHeight = img.height * scale;
                const imgX = (containerWidth - imgWidth) / 2;
                const imgY = (containerHeight - imgHeight) / 2;
                
                const imageObj = new window.Image();
                imageObj.src = shirtSide === 'front' ? Tshirt : TshirtBack;
                setProductImage({
                    x: imgX,
                    y: imgY,
                    width: imgWidth,
                    height: imgHeight,
                    image: imageObj
                });

                const paScale = 0.3;
                const paSide = imgWidth * paScale;
                const paX = imgX + (imgWidth - paSide) / 2;
                const paY = imgY + (imgHeight - paSide) / 2;

                setPrintableArea({
                    x: paX,
                    y: paY,
                    width: paSide,
                    height: paSide,
                });
            };
        }
    }, [shirtSide]);
    
    const handleElementChange = (newAttrs) => {
        const newElements = currentDesigns.elements.map(e => e.id === newAttrs.id ? newAttrs : e);
        setDesigns(d => ({ ...d, [shirtSide]: { ...d[shirtSide], elements: newElements } }));
        saveState();
    };

    const addText = () => {
        if (!printableArea) return;
        const newText = {
            type: 'text',
            x: printableArea.x + 20,
            y: printableArea.y + 40,
            text: 'Your Text',
            fontSize: 40,
            fill: '#000000',
            fontFamily: 'Impact',
            id: `text-${Date.now()}`,
        };
        const newElements = [...currentDesigns.elements, newText];
        setDesigns(d => ({ ...d, [shirtSide]: { ...d[shirtSide], elements: newElements } }));
        setSelectedId(newText.id);
        setTool('select');
        saveState();
    };

    const addImage = useCallback((imageSrc) => {
        if (!printableArea) return;
        const img = new window.Image();
        img.src = imageSrc;
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const maxWidth = printableArea.width * 0.8;
            const maxHeight = printableArea.height * 0.8;
            const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
            const width = img.width * ratio;
            const height = img.height * ratio;

            const newImage = {
                type: 'image',
                src: imageSrc,
                x: printableArea.x + (printableArea.width - width) / 2,
                y: printableArea.y + (printableArea.height - height) / 2,
                width,
                height,
                id: `img-${Date.now()}`,
            };
            const newElements = [...currentDesigns.elements, newImage];
            setDesigns(d => ({ ...d, [shirtSide]: { ...d[shirtSide], elements: newElements } }));
            setSelectedId(newImage.id);
            setTool('select');
            saveState();
        };
    }, [printableArea, shirtSide, currentDesigns, saveState]);

    const deleteSelected = useCallback(() => {
        if (!selectedId) return;
        const newElements = currentDesigns.elements.filter(el => el.id !== selectedId);
        setDesigns(d => ({ ...d, [shirtSide]: { ...d[shirtSide], elements: newElements } }));
        setSelectedId(null);
        saveState();
    }, [selectedId, currentDesigns, shirtSide, saveState]);

    const moveLayer = (step) => {
        if (selectedItemIndex === -1) return;
        const newElements = [...currentDesigns.elements];
        const newIndex = selectedItemIndex + step;
        if (newIndex < 0 || newIndex >= newElements.length) return;
        
        const [item] = newElements.splice(selectedItemIndex, 1);
        newElements.splice(newIndex, 0, item);
        
        setDesigns(d => ({ ...d, [shirtSide]: { ...d[shirtSide], elements: newElements } }));
        saveState();
    };

    const handleStageMouseDown = (e) => {
        const stage = e.target.getStage();
        const pos = stage.getPointerPosition();

        if (tool === 'draw') {
            isDrawing.current = true;
            const newLines = [...currentDesigns.lines, { tool, points: [pos.x, pos.y], color: drawColor }];
            setDesigns(d => ({ ...d, [shirtSide]: { ...d[shirtSide], lines: newLines }}));
            return;
        }

        const clickedOnEmpty = e.target === stage || e.target.attrs.id === 'product-image';
        if (clickedOnEmpty) setSelectedId(null);
    };

    const handleStageMouseMove = (e) => {
        if (tool !== 'draw' || !isDrawing.current) return;
        const point = e.target.getStage().getPointerPosition();
        const lastLine = currentDesigns.lines[currentDesigns.lines.length - 1];
        if (lastLine) {
            lastLine.points = lastLine.points.concat([point.x, point.y]);
            const newLines = [...currentDesigns.lines.slice(0, -1), lastLine];
            setDesigns(d => ({ ...d, [shirtSide]: { ...d[shirtSide], lines: newLines } }));
        }
    };
    
    const handleStageMouseUp = () => {
        if (isDrawing.current) {
            isDrawing.current = false;
            saveState();
        }
    };

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            addImage(URL.createObjectURL(e.target.files[0]));
        }
        e.target.value = null;
    };

    const handleExport = () => {
        setSelectedId(null);
        setTimeout(() => {
            const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
            const link = document.createElement('a');
            link.download = `custom-tshirt-${shirtSide}.png`;
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 100);
    };
    
    const handleSaveText = () => {
        handleElementChange({ ...userSelectedItem, text: editingText });
        setIsTextEditModalOpen(false);
        setEditingText("");
    };

    useEffect(() => {
        fitStageIntoParent();
        window.addEventListener('resize', fitStageIntoParent);
        return () => window.removeEventListener('resize', fitStageIntoParent);
    }, [fitStageIntoParent]);

    useEffect(() => {
        const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey) {
                if (e.key.toLowerCase() === 'z') { e.preventDefault(); undo(); }
                if (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z')) { e.preventDefault(); redo(); }
            }
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if(selectedId) { e.preventDefault(); deleteSelected(); }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo, selectedId, deleteSelected]);

    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem('hasSeenTshirtTutorial');
        if (!hasSeenTutorial) setIsOpen(true);

        const fetchStickers = async () => {
            setStickersLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/stickers?_=${new Date().getTime()}`);
                setCloudinaryStickers(response.data);
            } catch (error) { console.error("Could not fetch stickers:", error); } 
            finally { setStickersLoading(false); }
        };
        fetchStickers();
    }, [setIsOpen]);

    return (
        <div ref={mainContainerRef} className="w-full h-screen bg-gray-100 flex flex-col font-sans overflow-hidden">
            <Header
                onUndo={undo}
                canUndo={canUndo}
                onRedo={redo}
                canRedo={canRedo}
                onExport={handleExport}
                onToggleFullscreen={() => mainContainerRef.current?.requestFullscreen().catch(console.error)}
                isFullscreen={isFullscreen}
                onOpenTour={() => setIsOpen(true)}
            />

            <div className="flex-1 flex overflow-hidden">
                <Toolbar
                    tool={tool}
                    setTool={setTool}
                    shirtSide={shirtSide}
                    setShirtSide={setShirtSide}
                    addText={addText}
                    onImageUploadClick={() => fileUploadRef.current.click()}
                    onClearDrawing={() => {
                        setDesigns(d => ({ ...d, [shirtSide]: { ...d[shirtSide], lines: [] }}));
                        saveState();
                    }}
                    hasDrawing={currentDesigns.lines.length > 0}
                    onDeleteSelected={deleteSelected}
                    isItemSelected={!!userSelectedItem}
                    onOpenStickerDrawer={() => setIsStickerDrawerOpen(true)}
                />
                <input type="file" ref={fileUploadRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

                <div className="flex-1 relative flex justify-center items-center">
                    <Canvas
                        containerRef={containerRef}
                        stageRef={stageRef}
                        stageSize={stageSize}
                        tool={tool}
                        handleStageMouseDown={handleStageMouseDown}
                        handleStageMouseMove={handleStageMouseMove}
                        handleStageMouseUp={handleStageMouseUp}
                        productImage={productImage}
                        printableArea={printableArea}
                        designs={currentDesigns}
                        selectedId={selectedId}
                        onElementSelect={(id) => { setTool('select'); setSelectedId(id); }}
                        onElementChange={handleElementChange}
                    />
                    <ContextualToolbar
                        selectedItem={userSelectedItem}
                        onMoveLayer={moveLayer}
                        canMoveUp={selectedItemIndex < currentDesigns.elements.length - 1}
                        canMoveDown={selectedItemIndex > 0}
                        onOpenTextEditModal={() => {
                            setEditingText(userSelectedItem.text);
                            setIsTextEditModalOpen(true);
                        }}
                        onTextColorChange={(color) => handleElementChange({ ...userSelectedItem, fill: color })}
                        onDeleteSelected={deleteSelected}
                        activeTool={tool}
                        drawColor={drawColor}
                        setDrawColor={setDrawColor}
                    />
                </div>
                
                <aside className="w-80 bg-white shadow-lg overflow-y-auto hidden lg:flex flex-col tour-stickers-desktop">
                    <div className="p-4 border-b">
                        <h3 className="text-xl font-bold">Stickers</h3>
                    </div>
                    <StickerPanel stickers={cloudinaryStickers} loading={stickersLoading} onSelectSticker={addImage} />
                </aside>
            </div>
            
            <TextEditModal
                isOpen={isTextEditModalOpen}
                onClose={() => setIsTextEditModalOpen(false)}
                onSave={handleSaveText}
                value={editingText}
                setValue={setEditingText}
            />
            <StickerDrawer
                isOpen={isStickerDrawerOpen}
                onClose={() => setIsStickerDrawerOpen(false)}
                stickers={cloudinaryStickers}
                loading={stickersLoading}
                onSelectSticker={(src) => {
                    addImage(src);
                    setIsStickerDrawerOpen(false);
                }}
            />
        </div>
    );
};

// This component wraps the application with the TourProvider
const TshirtCustomize = () => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;
    
    return (
        <TourProvider 
            steps={getTourSteps(isDesktop)} 
            styles={tourStyles}
            afterOpen={() => document.body.style.overflow = 'hidden'} 
            beforeClose={() => {
                document.body.style.overflow = 'auto';
                localStorage.setItem('hasSeenTshirtTutorial', 'true');
            }}
        >
            <CustomizerCore />
        </TourProvider>
    );
};

export default TshirtCustomize;