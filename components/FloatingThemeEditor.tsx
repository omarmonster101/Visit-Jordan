
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Plus, Layers, Monitor, Type, Image, Square, Layout, 
  Video, Music, FileText, ShoppingCart, X, Palette, 
  Settings, Grid, CheckCircle, Smartphone, Globe,
  Box, Eye, Zap, Type as TypeIcon, Circle, Menu,
  MessageSquare, MoreHorizontal, Info, BarChart, Film, Mail, MousePointer
} from 'lucide-react';
import { THEME_PRESETS } from '../constants';

export const FloatingThemeEditor: React.FC = () => {
  const { state, updateTheme, applyThemePreset, togglePlugin, toggleVisualEditMode, isRtl } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'add' | 'layers' | 'theme' | 'apps'>('add');
  const [panelOpen, setPanelOpen] = useState(false);

  const togglePanel = (tab: typeof activeTab) => {
    if (activeTab === tab && panelOpen) {
      setPanelOpen(false);
    } else {
      setActiveTab(tab);
      setPanelOpen(true);
    }
  };

  if (!isOpen) {
     return (
        <button 
          onClick={() => { setIsOpen(true); setPanelOpen(true); }}
          className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-[100] bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 border-4 border-white group`}
        >
           <Plus size={24} className="group-hover:rotate-90 transition-transform" />
           <span className="font-bold text-sm hidden group-hover:block transition-all">Edit Site</span>
        </button>
     );
  }

  const SidebarItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button 
      onClick={() => togglePanel(id)}
      className={`w-full py-4 flex flex-col items-center gap-1 transition-colors relative ${activeTab === id && panelOpen ? 'text-blue-600 bg-white' : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'}`}
    >
      <Icon size={24} strokeWidth={1.5} />
      <span className="text-[10px] font-medium">{label}</span>
      {activeTab === id && panelOpen && (
        <div className={`absolute ${isRtl ? 'left-0' : 'right-0'} top-2 bottom-2 w-1 bg-blue-600 rounded-full`}></div>
      )}
    </button>
  );

  const AddElementButton = ({ icon: Icon, label, onClick, active = false }: { icon: any, label: string, onClick?: () => void, active?: boolean }) => (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all gap-2 aspect-square ${active ? 'border-blue-500 bg-blue-50 text-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}
    >
      <Icon size={28} strokeWidth={1.5} />
      <span className="text-xs font-semibold">{label}</span>
      {active && <CheckCircle size={14} className="absolute top-2 right-2 text-blue-500" />}
    </button>
  );

  return (
    <div className={`fixed inset-0 z-[100] pointer-events-none flex ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
       
       {/* Left Toolbar */}
       <div className="w-20 bg-white shadow-2xl border-r border-gray-200 flex flex-col pointer-events-auto h-full">
          <div className="p-4 border-b flex justify-center">
             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">W</div>
          </div>
          
          <div className="flex-1 flex flex-col">
             <SidebarItem id="add" icon={Plus} label="Add" />
             <SidebarItem id="layers" icon={Layers} label="Sections" />
             <SidebarItem id="theme" icon={Palette} label="Design" />
             <SidebarItem id="apps" icon={Grid} label="Apps" />
             
             {/* VISUAL EDITOR TOGGLE */}
             <button 
               onClick={() => {
                 setIsOpen(false);
                 toggleVisualEditMode();
               }}
               className="w-full py-4 flex flex-col items-center gap-1 transition-colors relative text-purple-600 bg-purple-50 hover:bg-purple-100 mt-4 border-t"
             >
                <MousePointer size={24} strokeWidth={1.5} />
                <span className="text-[10px] font-bold">Visual Edit</span>
             </button>
          </div>

          <div className="p-4 border-t">
             <button onClick={() => setIsOpen(false)} className="w-full py-2 flex flex-col items-center text-gray-400 hover:text-red-500">
                <X size={24} />
             </button>
          </div>
       </div>

       {/* Flyout Panel */}
       {panelOpen && (
         <div className="w-80 bg-white shadow-2xl border-r border-gray-200 pointer-events-auto h-full flex flex-col animate-slide-in">
            <div className="p-5 border-b flex justify-between items-center bg-gray-50">
               <h2 className="font-bold text-lg text-gray-800">
                  {activeTab === 'add' && 'Add Elements'}
                  {activeTab === 'layers' && 'Page Sections'}
                  {activeTab === 'theme' && 'Site Design'}
                  {activeTab === 'apps' && 'App Market'}
               </h2>
               <button onClick={() => setPanelOpen(false)}><X size={18} className="text-gray-400 hover:text-gray-600"/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 custom-scrollbar">
               
               {/* ADD ELEMENTS TAB */}
               {activeTab === 'add' && (
                  <div className="space-y-6">
                     <p className="text-xs text-gray-500 mb-2">Click to add/remove sections from your homepage.</p>
                     
                     <div className="grid grid-cols-2 gap-3">
                        <AddElementButton 
                          icon={BarChart} 
                          label="Stats Counter" 
                          onClick={() => updateTheme({ visibleSections: { ...state.theme.visibleSections!, stats: !state.theme.visibleSections!.stats } })} 
                          active={state.theme.visibleSections!.stats}
                        />
                        <AddElementButton 
                          icon={Film} 
                          label="Video Banner" 
                          onClick={() => updateTheme({ visibleSections: { ...state.theme.visibleSections!, videoSection: !state.theme.visibleSections!.videoSection } })} 
                          active={state.theme.visibleSections!.videoSection}
                        />
                        <AddElementButton 
                          icon={MessageSquare} 
                          label="Testimonials" 
                          onClick={() => updateTheme({ visibleSections: { ...state.theme.visibleSections!, testimonials: !state.theme.visibleSections!.testimonials } })}
                          active={state.theme.visibleSections!.testimonials}
                        />
                        <AddElementButton 
                          icon={Mail} 
                          label="Newsletter" 
                          onClick={() => updateTheme({ visibleSections: { ...state.theme.visibleSections!, newsletter: !state.theme.visibleSections!.newsletter } })}
                          active={state.theme.visibleSections!.newsletter}
                        />
                     </div>

                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4 mb-2">Components</h3>
                     <div className="grid grid-cols-2 gap-3">
                        <AddElementButton icon={Image} label="Image" />
                        <AddElementButton icon={Square} label="Button" />
                        <AddElementButton icon={Type} label="Text Block" />
                        <AddElementButton icon={Layout} label="Divider" />
                     </div>
                  </div>
               )}

               {/* SECTIONS / LAYERS TAB */}
               {activeTab === 'layers' && (
                  <div className="space-y-4">
                     <p className="text-xs text-gray-500 mb-2">Manage visibility of standard sections.</p>
                     
                     {[
                        { id: 'hero', icon: Monitor, label: 'Hero Section' },
                        { id: 'history', icon: FileText, label: 'History Intro' },
                        { id: 'featured', icon: Grid, label: 'Featured Grid' },
                        { id: 'cta', icon: Info, label: 'Info / CTA' },
                     ].map(sec => (
                        <div key={sec.id} className={`p-4 rounded-lg border bg-white flex items-center justify-between shadow-sm`}>
                            <div className="flex items-center gap-3">
                               <sec.icon size={18} className="text-gray-400"/>
                               <span className="font-medium text-sm">{sec.label}</span>
                            </div>
                            <input 
                               type="checkbox" 
                               checked={(state.theme.visibleSections as any)[sec.id] ?? true}
                               onChange={e => updateTheme({ visibleSections: { ...state.theme.visibleSections!, [sec.id]: e.target.checked } })}
                               className="w-5 h-5 accent-blue-600"
                            />
                        </div>
                     ))}
                  </div>
               )}

               {/* THEME / DESIGN TAB */}
               {activeTab === 'theme' && (
                  <div className="space-y-6">
                     <div>
                        <h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Presets</h3>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {THEME_PRESETS.map(preset => (
                                <button 
                                key={preset.id}
                                onClick={() => applyThemePreset(preset.id)}
                                className={`p-2 rounded-lg border text-left transition-all ${state.currentThemeId === preset.id ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-white'}`}
                                >
                                <div className="h-16 bg-gray-200 rounded mb-2 overflow-hidden">
                                    <img src={preset.thumbnail} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xs font-bold block truncate">{preset.name}</span>
                                </button>
                            ))}
                        </div>
                     </div>
                     
                     <hr className="border-gray-200" />
                     
                     <div>
                        <h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Global Colors</h3>
                        <div className="space-y-3">
                           <div>
                              <label className="text-[10px] text-gray-400 uppercase flex justify-between">Primary <span className="text-gray-800">{state.theme.primaryColor}</span></label>
                              <input type="color" value={state.theme.primaryColor} onChange={e => updateTheme({ primaryColor: e.target.value })} className="w-full h-8 rounded cursor-pointer border-none p-0 mt-1" />
                           </div>
                           <div>
                              <label className="text-[10px] text-gray-400 uppercase flex justify-between">Secondary <span className="text-gray-800">{state.theme.secondaryColor}</span></label>
                              <input type="color" value={state.theme.secondaryColor} onChange={e => updateTheme({ secondaryColor: e.target.value })} className="w-full h-8 rounded cursor-pointer border-none p-0 mt-1" />
                           </div>
                           <div>
                              <label className="text-[10px] text-gray-400 uppercase flex justify-between">Background <span className="text-gray-800">{state.theme.backgroundColor}</span></label>
                              <input type="color" value={state.theme.backgroundColor} onChange={e => updateTheme({ backgroundColor: e.target.value })} className="w-full h-8 rounded cursor-pointer border-none p-0 mt-1" />
                           </div>
                        </div>
                     </div>

                     <hr className="border-gray-200" />

                     <div>
                        <h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Typography</h3>
                        <div className="flex gap-2 mb-3">
                           {['sans', 'serif', 'display'].map(f => (
                              <button 
                                key={f} 
                                onClick={() => updateTheme({ fontHeader: f as any })}
                                className={`flex-1 py-2 text-xs border rounded capitalize ${state.theme.fontHeader === f ? 'bg-slate-800 text-white' : 'bg-white'}`}
                              >
                                 {f}
                              </button>
                           ))}
                        </div>
                        <input 
                           type="range" 
                           min="0.8" 
                           max="1.2" 
                           step="0.05" 
                           value={state.theme.fontScale}
                           onChange={e => updateTheme({ fontScale: parseFloat(e.target.value) })}
                           className="w-full accent-blue-600"
                        />
                     </div>
                     
                     <hr className="border-gray-200" />

                     <div>
                        <h3 className="text-xs font-bold uppercase text-gray-500 mb-3">Shapes & Borders</h3>
                         <div className="flex gap-2 mb-3">
                           {['none', 'sm', 'lg', 'full'].map(r => (
                              <button 
                                key={r} 
                                onClick={() => updateTheme({ borderRadius: r as any })}
                                className={`flex-1 py-2 text-xs border rounded capitalize ${state.theme.borderRadius === r ? 'bg-slate-800 text-white' : 'bg-white'}`}
                              >
                                 {r}
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               )}

               {/* APPS TAB */}
               {activeTab === 'apps' && (
                  <div className="space-y-4">
                     <div className="relative mb-4">
                        <input type="text" placeholder="Search apps..." className="w-full p-2 pl-8 border rounded text-sm bg-white" />
                        <Box size={14} className="absolute left-3 top-3 text-gray-400" />
                     </div>
                     
                     {state.plugins.slice(0, 10).map(plugin => (
                        <div key={plugin.id} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
                           <div className="flex items-center gap-3">
                              <div className={`p-2 rounded ${plugin.active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                                 <Box size={16} />
                              </div>
                              <div className="max-w-[120px]">
                                 <h4 className="text-xs font-bold truncate">{plugin.name}</h4>
                                 <p className="text-[10px] text-gray-500 truncate">{plugin.category}</p>
                              </div>
                           </div>
                           <button 
                              onClick={() => togglePlugin(plugin.id)}
                              className={`text-xs font-bold px-3 py-1 rounded transition-colors ${plugin.active ? 'bg-red-50 text-red-600' : 'bg-blue-600 text-white'}`}
                           >
                              {plugin.active ? 'Remove' : 'Add'}
                           </button>
                        </div>
                     ))}
                  </div>
               )}

            </div>
         </div>
       )}
    </div>
  );
};