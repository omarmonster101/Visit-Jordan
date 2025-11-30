
import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { X, Type, Image, Layout, Palette, Save, Trash2, ArrowUp, Move } from 'lucide-react';

export const VisualEditorOverlay: React.FC = () => {
  const { state, toggleVisualEditMode } = useAppContext();
  const { visualEditMode } = state;
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [labelPos, setLabelPos] = useState({ top: 0, left: 0, visible: false, text: '' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Styling inputs state
  const [styles, setStyles] = useState<{
     color: string;
     backgroundColor: string;
     fontSize: string;
     padding: string;
     margin: string;
     borderRadius: string;
     width: string;
     src?: string;
  }>({
     color: '#000000',
     backgroundColor: 'transparent',
     fontSize: '16px',
     padding: '0px',
     margin: '0px',
     borderRadius: '0px',
     width: 'auto',
  });

  useEffect(() => {
    if (!visualEditMode) {
       // Cleanup styling classes
       document.querySelectorAll('.visual-editor-hover').forEach(el => el.classList.remove('visual-editor-hover'));
       document.querySelectorAll('.visual-editor-selected').forEach(el => el.classList.remove('visual-editor-selected'));
       return;
    }

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target || target.closest('#visual-editor-ui') || target === document.body || target === document.documentElement) return;
        
        target.classList.add('visual-editor-hover');
        
        // Show Label
        const rect = target.getBoundingClientRect();
        let tagName = target.tagName.toLowerCase();
        if (target.id) tagName += `#${target.id}`;
        else if (target.classList.length > 0) tagName += `.${target.classList[0]}`;
        
        setLabelPos({
            top: e.clientY + 15,
            left: e.clientX + 15,
            visible: true,
            text: tagName
        });
    };

    const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target) target.classList.remove('visual-editor-hover');
        setLabelPos(prev => ({ ...prev, visible: false }));
    };

    const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target || target.closest('#visual-editor-ui')) return;

        e.preventDefault();
        e.stopPropagation();

        // Deselect previous
        if (selectedElement) {
            selectedElement.classList.remove('visual-editor-selected');
            selectedElement.contentEditable = "false";
        }

        // Select new
        target.classList.add('visual-editor-selected');
        setSelectedElement(target);
        setSidebarOpen(true);

        // Populate initial styles
        const computed = window.getComputedStyle(target);
        setStyles({
            color: rgbToHex(computed.color),
            backgroundColor: rgbToHex(computed.backgroundColor),
            fontSize: computed.fontSize,
            padding: computed.padding,
            margin: computed.margin,
            borderRadius: computed.borderRadius,
            width: computed.width,
            src: (target as HTMLImageElement).src
        });
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);

    return () => {
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
        document.removeEventListener('click', handleClick);
    };
  }, [visualEditMode, selectedElement]);

  const rgbToHex = (rgb: string) => {
    if (!rgb || rgb === 'transparent' || rgb.startsWith('rgba(0, 0, 0, 0)')) return '#ffffff';
    if (rgb.startsWith('#')) return rgb;
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues) return '#000000';
    return "#" + ((1 << 24) + (parseInt(rgbValues[0]) << 16) + (parseInt(rgbValues[1]) << 8) + parseInt(rgbValues[2])).toString(16).slice(1);
  };

  const updateStyle = (key: string, value: string) => {
      if (selectedElement) {
          selectedElement.style[key as any] = value;
          setStyles(prev => ({ ...prev, [key]: value }));
      }
  };

  const updateImageSrc = (value: string) => {
      if (selectedElement && selectedElement.tagName === 'IMG') {
          (selectedElement as HTMLImageElement).src = value;
          setStyles(prev => ({ ...prev, src: value }));
      }
  };

  const handleTextEdit = () => {
      if (selectedElement) {
          selectedElement.contentEditable = "true";
          selectedElement.focus();
      }
  };

  if (!visualEditMode) return null;

  return (
    <div id="visual-editor-ui">
        {/* Floating Label */}
        <div 
            className="visual-editor-label" 
            style={{ 
                display: labelPos.visible ? 'block' : 'none', 
                top: labelPos.top, 
                left: labelPos.left 
            }}
        >
            {labelPos.text}
        </div>

        {/* Sidebar */}
        <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl border-r border-gray-200 z-[10002] transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
            <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2"><Palette size={18}/> Visual Editor</h3>
                <button onClick={() => setSidebarOpen(false)}><X size={18}/></button>
            </div>

            {selectedElement ? (
                <div className="p-6 space-y-6">
                    <div className="text-xs font-bold text-gray-400 uppercase border-b pb-2 mb-4">
                        Selected: <span className="text-blue-600">{selectedElement.tagName}</span>
                    </div>

                    {/* Text Actions */}
                    {['H1','H2','H3','P','SPAN','A','BUTTON','LI'].includes(selectedElement.tagName) && (
                        <div className="space-y-4">
                            <h4 className="font-bold text-sm flex items-center gap-2"><Type size={16}/> Typography</h4>
                            <button onClick={handleTextEdit} className="w-full py-2 bg-blue-100 text-blue-700 rounded font-bold text-sm hover:bg-blue-200">
                                Edit Text Content
                            </button>
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Color</label>
                                <div className="flex gap-2">
                                    <input type="color" value={styles.color} onChange={e => updateStyle('color', e.target.value)} className="w-10 h-10 border rounded cursor-pointer p-0" />
                                    <input type="text" value={styles.color} onChange={e => updateStyle('color', e.target.value)} className="flex-1 border rounded px-2 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Font Size</label>
                                <input type="text" value={styles.fontSize} onChange={e => updateStyle('fontSize', e.target.value)} className="w-full border rounded p-2 text-sm" />
                            </div>
                        </div>
                    )}

                    {/* Image Actions */}
                    {selectedElement.tagName === 'IMG' && (
                        <div className="space-y-4">
                             <h4 className="font-bold text-sm flex items-center gap-2"><Image size={16}/> Image Source</h4>
                             <input type="text" value={styles.src} onChange={e => updateImageSrc(e.target.value)} className="w-full border rounded p-2 text-sm" placeholder="https://..." />
                             
                             <div>
                                <label className="text-xs text-gray-500 block mb-1">Corner Radius</label>
                                <input type="text" value={styles.borderRadius} onChange={e => updateStyle('borderRadius', e.target.value)} className="w-full border rounded p-2 text-sm" />
                            </div>
                        </div>
                    )}

                    {/* Layout Actions */}
                    <div className="space-y-4 pt-4 border-t">
                        <h4 className="font-bold text-sm flex items-center gap-2"><Layout size={16}/> Layout & Design</h4>
                        
                        <div>
                            <label className="text-xs text-gray-500 block mb-1">Background</label>
                            <div className="flex gap-2">
                                <input type="color" value={styles.backgroundColor} onChange={e => updateStyle('backgroundColor', e.target.value)} className="w-10 h-10 border rounded cursor-pointer p-0" />
                                <input type="text" value={styles.backgroundColor} onChange={e => updateStyle('backgroundColor', e.target.value)} className="flex-1 border rounded px-2 text-sm" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Padding</label>
                                <input type="text" value={styles.padding} onChange={e => updateStyle('padding', e.target.value)} className="w-full border rounded p-2 text-sm" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Margin</label>
                                <input type="text" value={styles.margin} onChange={e => updateStyle('margin', e.target.value)} className="w-full border rounded p-2 text-sm" />
                            </div>
                        </div>
                        
                        <div>
                            <label className="text-xs text-gray-500 block mb-1">Width</label>
                            <input type="text" value={styles.width} onChange={e => updateStyle('width', e.target.value)} className="w-full border rounded p-2 text-sm" />
                        </div>
                    </div>

                    <button 
                        onClick={() => {
                            // Save logic (Simulated)
                            alert("Changes saved to local session!");
                            setSidebarOpen(false);
                            if (selectedElement) selectedElement.classList.remove('visual-editor-selected');
                            setSelectedElement(null);
                        }}
                        className="w-full py-3 bg-green-600 text-white font-bold rounded shadow-lg hover:bg-green-700 mt-8"
                    >
                        Save Changes
                    </button>

                </div>
            ) : (
                <div className="p-10 text-center text-gray-400 mt-20">
                    <Move size={48} className="mx-auto mb-4 opacity-50"/>
                    <p>Click any element on the page to start editing.</p>
                </div>
            )}
        </div>

        {/* Exit Button */}
        <button 
            onClick={toggleVisualEditMode}
            className="fixed bottom-8 left-8 z-[10002] bg-red-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 hover:bg-red-700"
        >
            <X size={20}/> Exit Editor
        </button>
    </div>
  );
};
