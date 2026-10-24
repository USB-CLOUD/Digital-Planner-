import React, { useRef, useState, useEffect } from 'react';
import {
  Pen,
  Highlighter,
  Eraser,
  Type,
  RotateCcw,
  Trash2,
  Eye,
  EyeOff,
  Check,
} from 'lucide-react';

interface CanvasAnnotationLayerProps {
  isDrawingMode: boolean;
  onToggleDrawingMode: () => void;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  tool: 'pen' | 'highlighter' | 'eraser';
  color: string;
  size: number;
  points: Point[];
}

interface TextAnnotation {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
}

export const CanvasAnnotationLayer: React.FC<CanvasAnnotationLayerProps> = ({
  isDrawingMode,
  onToggleDrawingMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentTool, setCurrentTool] = useState<'pen' | 'highlighter' | 'eraser' | 'text'>('pen');
  const [strokeColor, setStrokeColor] = useState('#1e293b'); // Dark slate ink
  const [strokeSize, setStrokeSize] = useState(3);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [textAnnotations, setTextAnnotations] = useState<TextAnnotation[]>([]);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [tempText, setTempText] = useState('');

  const PALETTE = [
    { color: '#1e293b', name: 'Ink Black' },
    { color: '#1d4ed8', name: 'Sapphire Blue' },
    { color: '#dc2626', name: 'Crimson Red' },
    { color: '#15803d', name: 'Sage Forest' },
    { color: '#a855f7', name: 'Lavender Violet' },
    { color: '#f59e0b', name: 'Highlighter Amber' },
    { color: '#ec4899', name: 'Pastel Blush' },
  ];

  // Resize canvas to match container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      redrawAll();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Redraw canvas whenever strokes change
  useEffect(() => {
    redrawAll();
  }, [strokes, currentStroke]);

  const redrawAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;

    for (const stroke of allStrokes) {
      if (stroke.points.length < 2) continue;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.tool === 'highlighter') {
        ctx.globalAlpha = 0.35;
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size * 3.5;
        ctx.globalCompositeOperation = 'multiply';
      } else if (stroke.tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = stroke.size * 4;
      } else {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;
        ctx.globalCompositeOperation = 'source-over';
      }

      ctx.stroke();
      ctx.restore();
    }
  };

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode) return;

    if (currentTool === 'text') {
      const pt = getCanvasCoords(e);
      const newId = Date.now().toString();
      setTextAnnotations([
        ...textAnnotations,
        { id: newId, x: pt.x, y: pt.y, text: 'Note...', color: strokeColor },
      ]);
      setEditingTextId(newId);
      setTempText('Note...');
      return;
    }

    setIsDrawing(true);
    const pt = getCanvasCoords(e);
    setCurrentStroke({
      tool: currentTool,
      color: strokeColor,
      size: strokeSize,
      points: [pt],
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke) return;
    const pt = getCanvasCoords(e);
    setCurrentStroke({
      ...currentStroke,
      points: [...currentStroke.points, pt],
    });
  };

  const handlePointerUp = () => {
    if (currentStroke) {
      setStrokes([...strokes, currentStroke]);
      setCurrentStroke(null);
    }
    setIsDrawing(false);
  };

  const handleUndo = () => {
    setStrokes(strokes.slice(0, -1));
  };

  const handleClear = () => {
    setStrokes([]);
    setTextAnnotations([]);
  };

  return (
    <>
      {/* Drawing Toolbar Overlay - only visible when draw mode is active */}
      {isDrawingMode && (
        <div className="absolute top-3 right-6 z-30 flex items-center gap-1.5 p-1.5 bg-neutral-900/95 text-white rounded-full shadow-2xl backdrop-blur-md border border-white/20 animate-in fade-in">
          <button
            onClick={onToggleDrawingMode}
            className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-500 text-neutral-900 flex items-center gap-1 hover:bg-amber-400 transition"
            title="Exit Draw Mode"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Done</span>
          </button>

          <div className="h-4 w-px bg-white/20 mx-0.5" />

            {/* Tools */}
            <button
              onClick={() => setCurrentTool('pen')}
              className={`p-1.5 rounded-full transition ${
                currentTool === 'pen' ? 'bg-white/20 text-amber-400' : 'text-neutral-400 hover:text-white'
              }`}
              title="Ballpoint Pen"
            >
              <Pen className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setCurrentTool('highlighter');
                if (strokeColor === '#1e293b') setStrokeColor('#f59e0b');
              }}
              className={`p-1.5 rounded-full transition ${
                currentTool === 'highlighter' ? 'bg-white/20 text-amber-400' : 'text-neutral-400 hover:text-white'
              }`}
              title="Translucent Highlighter"
            >
              <Highlighter className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setCurrentTool('eraser')}
              className={`p-1.5 rounded-full transition ${
                currentTool === 'eraser' ? 'bg-white/20 text-amber-400' : 'text-neutral-400 hover:text-white'
              }`}
              title="Eraser"
            >
              <Eraser className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setCurrentTool('text')}
              className={`p-1.5 rounded-full transition ${
                currentTool === 'text' ? 'bg-white/20 text-amber-400' : 'text-neutral-400 hover:text-white'
              }`}
              title="Text Annotation"
            >
              <Type className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-px bg-white/20 mx-0.5" />

            {/* Color Swatches */}
            <div className="flex items-center gap-1">
              {PALETTE.map((p) => (
                <button
                  key={p.color}
                  onClick={() => setStrokeColor(p.color)}
                  className={`w-4 h-4 rounded-full border border-white/40 transition transform hover:scale-125 ${
                    strokeColor === p.color ? 'ring-2 ring-amber-400 scale-110' : ''
                  }`}
                  style={{ backgroundColor: p.color }}
                  title={p.name}
                />
              ))}
            </div>

            <div className="h-4 w-px bg-white/20 mx-0.5" />

            {/* Size Steppers */}
            <div className="flex items-center gap-1">
              {[2, 4, 8].map((s) => (
                <button
                  key={s}
                  onClick={() => setStrokeSize(s)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    strokeSize === s ? 'bg-amber-500 text-neutral-900' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {s}px
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-white/20 mx-0.5" />

            {/* Undo & Clear */}
            <button
              onClick={handleUndo}
              disabled={strokes.length === 0}
              className="p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 transition"
              title="Undo Stroke"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleClear}
              className="p-1.5 text-neutral-400 hover:text-red-400 transition"
              title="Clear All Drawings"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
        </div>
      )}

      {/* Interactive HTML5 Canvas Layer */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`absolute inset-0 z-20 w-full h-full ${
          isDrawingMode ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'
        }`}
      />

      {/* Text Annotations */}
      {textAnnotations.map((item) => (
        <div
          key={item.id}
          style={{ left: item.x, top: item.y }}
          className="absolute z-20 -translate-x-2 -translate-y-2"
        >
          {editingTextId === item.id ? (
            <div className="flex items-center gap-1 bg-white p-1 rounded-md shadow-lg border border-stone-300">
              <input
                type="text"
                autoFocus
                value={tempText}
                onChange={(e) => setTempText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setTextAnnotations(
                      textAnnotations.map((t) => (t.id === item.id ? { ...t, text: tempText } : t))
                    );
                    setEditingTextId(null);
                  }
                }}
                className="text-xs font-handwriting text-base font-bold text-stone-900 px-1 border-none focus:outline-none"
              />
              <button
                onClick={() => {
                  setTextAnnotations(
                    textAnnotations.map((t) => (t.id === item.id ? { ...t, text: tempText } : t))
                  );
                  setEditingTextId(null);
                }}
                className="p-0.5 text-emerald-600 hover:bg-emerald-50 rounded"
              >
                <Check className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div
              onDoubleClick={() => {
                setEditingTextId(item.id);
                setTempText(item.text);
              }}
              className="font-handwriting text-base md:text-lg font-bold px-1.5 py-0.5 rounded cursor-pointer select-none drop-shadow-xs"
              style={{ color: item.color }}
            >
              {item.text}
            </div>
          )}
        </div>
      ))}
    </>
  );
};
