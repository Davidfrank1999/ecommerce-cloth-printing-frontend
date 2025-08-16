import React, { useRef, useEffect } from 'react';
import { Text, Transformer } from 'react-konva';

const DraggableText = ({ text, onSelect, onChange, isSelected }) => {
    const shapeRef = useRef();
    const trRef = useRef();

    // Effect to attach the Transformer when the text is selected
    useEffect(() => {
        if (isSelected && trRef.current) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Text
                ref={shapeRef}
                {...text}
                draggable={isSelected}
                onClick={onSelect}
                onTap={onSelect}
                onDragEnd={(e) => onChange({ ...text, x: e.target.x(), y: e.target.y() })}
                onTransformEnd={() => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    // Reset scale to avoid compounding transformations
                    node.scaleX(1);
                    node.scaleY(1); // Y scale is not used but good practice to reset
                    onChange({
                        ...text,
                        x: node.x(),
                        y: node.y(),
                        // Adjust font size based on horizontal scaling
                        fontSize: text.fontSize * scaleX, 
                        width: node.width() * scaleX,
                    });
                }}
            />
            {/* The Transformer is only rendered when the text is selected */}
            {isSelected && (
                <Transformer
                    ref={trRef}
                    // Only enable horizontal resizing anchors for text
                    enabledAnchors={['middle-left', 'middle-right']}
                    boundBoxFunc={(oldBox, newBox) => {
                        // Set a minimum width for the text box
                        newBox.width = Math.max(30, newBox.width);
                        return newBox;
                    }}
                />
            )}
        </>
    );
};

export default DraggableText;