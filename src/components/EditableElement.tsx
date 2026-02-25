import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { LayoutData } from '../context/DataContext';

interface EditableElementProps {
  id: string;
  layout: LayoutData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, newLayout: Partial<LayoutData>) => void;
  children: React.ReactNode;
  type?: 'text' | 'image' | 'button' | 'container';
  className?: string;
  style?: React.CSSProperties;
  dragHandleClassName?: string;
  containerWidth?: number;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export const EditableElement: React.FC<EditableElementProps> = ({
  id,
  layout,
  isSelected,
  onSelect,
  onUpdate,
  children,
  type = 'text',
  className = '',
  style = {},
  dragHandleClassName,
  containerWidth = 480,
  onDragStart,
  onDragEnd,
}) => {
  const { x, y, width, height } = layout;
  
  // Local state for controlled dragging to support snapping
  const [dragPos, setDragPos] = useState({ x, y });
  const [isDragging, setIsDragging] = useState(false);

  // Sync with props when not dragging
  useEffect(() => {
    if (!isDragging) {
      setDragPos({ x, y });
    }
  }, [x, y, isDragging]);

  const handleDragStart = () => {
    setIsDragging(true);
    onDragStart?.();
  };

  const handleDrag = (e: any, d: any) => {
    let newX = d.x;
    const newY = d.y;
    
    // Snapping Logic
    const numWidth = typeof width === 'number' ? width : parseInt(width as string) || 0;
    const centerX = containerWidth / 2;
    const elementCenterX = newX + numWidth / 2;
    
    // Snap threshold 10px
    if (Math.abs(elementCenterX - centerX) < 10) {
      newX = centerX - numWidth / 2;
    }

    setDragPos({ x: newX, y: newY });
  };

  const handleDragStop = (e: any, d: any) => {
    setIsDragging(false);
    onDragEnd?.();
    // Use dragPos because it contains the snapped value
    onUpdate(id, { x: dragPos.x, y: dragPos.y });
  };

  const handleResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {
    onUpdate(id, {
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    });
  };

  const borderClass = isSelected 
    ? 'border-2 border-blue-500 bg-blue-500/10 z-50' 
    : 'border border-transparent hover:border-blue-500/30 hover:bg-blue-500/5';

  // Apply text styles if it's a text element
  const textStyles: React.CSSProperties = type === 'text' || type === 'button' ? {
    fontFamily: layout.fontFamily,
    fontWeight: layout.fontWeight,
    fontSize: layout.fontSize ? `${layout.fontSize}px` : undefined,
    color: layout.color,
    WebkitTextStroke: layout.textStrokeWidth ? `${layout.textStrokeWidth}px ${layout.textStrokeColor}` : undefined,
    textShadow: layout.textShadowColor ? `${layout.textShadowOffsetX || 0}px ${layout.textShadowOffsetY || 0}px ${layout.textShadowBlur || 0}px ${layout.textShadowColor}` : undefined,
    ...style
  } : { ...style };

  return (
    <Rnd
      size={{ width, height }}
      position={dragPos}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onMouseDown={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      bounds="parent"
      className={`${borderClass} ${className}`}
      style={{ zIndex: isSelected ? 50 : 10 }}
      dragHandleClassName={dragHandleClassName}
    >
      <div className="w-full h-full pointer-events-none" style={textStyles}>
        {children}
      </div>
    </Rnd>
  );
};
