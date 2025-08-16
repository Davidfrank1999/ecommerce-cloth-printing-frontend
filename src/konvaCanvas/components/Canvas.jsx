import React from 'react';
import { Stage, Layer, Image, Rect, Line } from 'react-konva';
import URLImage from './URLImage';
import DraggableText from './DraggableText';

const Canvas = ({
    containerRef,
    stageRef,
    stageSize,
    tool,
    handleStageMouseDown,
    handleStageMouseMove,
    handleStageMouseUp,
    productImage,
    printableArea,
    designs,
    selectedId,
    onElementSelect,
    onElementChange,
}) => {
    return (
        <main ref={containerRef} className="flex-1 flex items-center justify-center bg-gray-200 relative overflow-hidden tour-canvas">
            <Stage
                width={stageSize.width}
                height={stageSize.height}
                ref={stageRef}
                onMouseDown={handleStageMouseDown}
                onTouchStart={handleStageMouseDown}
                onMouseMove={handleStageMouseMove}
                onTouchMove={handleStageMouseMove}
                onMouseUp={handleStageMouseUp}
                onTouchEnd={handleStageMouseUp}
                style={{ cursor: tool === 'draw' ? 'crosshair' : 'default' }}
            >
                {/* Layer for the T-shirt image and printable area rectangle */}
                <Layer>
                    {productImage && <Image {...productImage} id="product-image" listening={false} />}
                    {printableArea && <Rect {...printableArea} stroke="rgba(0, 0, 0, 0.3)" strokeWidth={2} dash={[10, 5]} listening={false} />}
                </Layer>

                {/* Layer for user designs, clipped to the printable area */}
                {printableArea && (
                    <Layer
                        clipX={printableArea.x}
                        clipY={printableArea.y}
                        clipWidth={printableArea.width}
                        clipHeight={printableArea.height}
                    >
                        {/* Render drawn lines */}
                        {designs.lines.map((line, i) => (
                            <Line key={i} points={line.points} stroke={line.color} strokeWidth={5} tension={0.5} lineCap="round" lineJoin="round" globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'} />
                        ))}

                        {/* Render text and image elements */}
                        {designs.elements.map((el) => {
                            const isSelected = el.id === selectedId && tool === 'select';
                            if (el.type === 'image') {
                                return (
                                    <URLImage
                                        key={el.id}
                                        image={el}
                                        isSelected={isSelected}
                                        onSelect={() => onElementSelect(el.id)}
                                        onChange={onElementChange}
                                    />
                                );
                            }
                            if (el.type === 'text') {
                                return (
                                    <DraggableText
                                        key={el.id}
                                        text={el}
                                        isSelected={isSelected}
                                        onSelect={() => onElementSelect(el.id)}
                                        onChange={onElementChange}
                                    />
                                );
                            }
                            return null;
                        })}
                    </Layer>
                )}
            </Stage>
        </main>
    );
};

export default Canvas;