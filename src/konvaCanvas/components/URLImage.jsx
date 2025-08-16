import React, { useState, useRef, useEffect } from 'react';
import { Image, Transformer } from 'react-konva';

const URLImage = ({ image, onSelect, onChange, isSelected }) => {
    const [img, setImg] = useState(null);
    const shapeRef = useRef();
    const trRef = useRef();

    // Effect to load the image from the source URL
    useEffect(() => {
        const imageObj = new window.Image();
        imageObj.src = image.src;
        imageObj.crossOrigin = 'Anonymous'; // Important for canvas security and exporting
        imageObj.onload = () => setImg(imageObj);
    }, [image.src]);

    // Effect to attach the Transformer when the image is selected
    useEffect(() => {
        if (isSelected && trRef.current) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Image
                image={img}
                ref={shapeRef}
                {...image}
                draggable={isSelected}
                onClick={onSelect}
                onTap={onSelect}
                onDragEnd={(e) => {
                    onChange({ ...image, x: e.target.x(), y: e.target.y() });
                }}
                onTransformEnd={() => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    // Reset scale to 1 to avoid compounding transformations
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...image,
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(20, node.width() * scaleX),
                        height: Math.max(20, node.height() * scaleY),
                    });
                }}
            />
            {/* The Transformer is only rendered when the image is selected */}
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => (newBox.width < 10 || newBox.height < 10 ? oldBox : newBox)}
                />
            )}
        </>
    );
};

export default URLImage;