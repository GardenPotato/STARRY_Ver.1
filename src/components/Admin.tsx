import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { useData, SiteContent, MenuItem, Notice, LayoutData, defaultContent } from '../context/DataContext';
import { motion } from 'motion/react';
import { Save, RotateCcw, Plus, Trash2, Image as ImageIcon, Type, Layout, Palette, Bell, Move, Grid, Dog } from 'lucide-react';

import { EditableElement } from './EditableElement';

const InputGroup = ({ label, value, onChange, type = "text", textarea = false }: any) => (
  <div className="mb-4">
    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">{label}</label>
    {textarea ? (
      <textarea 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#222] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors h-24 resize-none"
      />
    ) : (
      <input 
        type={type}
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#222] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
      />
    )}
  </div>
);

const SpacingSlider = ({ label, value, onChange }: { label: string, value: number, onChange: (val: number) => void }) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <label className="text-xs font-medium text-gray-400 uppercase">{label}</label>
      <span className="text-xs text-gray-400">{value}px</span>
    </div>
    <input 
      type="range" 
      min="0" 
      max="200" 
      value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full accent-blue-500"
    />
  </div>
);

export default function Admin() {
  const { content, updateContent, resetContent, isLoading } = useData();
  const [activeTab, setActiveTab] = useState<'hero' | 'visual' | 'usps' | 'menu' | 'gallery' | 'notices' | 'contact' | 'theme'>('hero');
  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showGuides, setShowGuides] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Auto-save logic to prevent data loss on reload
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (JSON.stringify(localContent) !== JSON.stringify(content)) {
        updateContent(localContent);
      }
    }, 1000); // 1 second debounce
    return () => clearTimeout(timer);
  }, [localContent, content, updateContent]);

  // Sync local state with context when context changes (optional, but good for reset)
  React.useEffect(() => {
    // Only sync if not currently editing or if content was reset
    if (JSON.stringify(content) === JSON.stringify(defaultContent)) {
      setLocalContent(content);
    }
  }, [content]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin1234';
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('비밀번호가 올바르지 않습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">관리자 로그인</h2>
            <p className="text-gray-400 text-sm">컨텐츠를 수정하려면 비밀번호를 입력하세요.</p>
          </div>
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full bg-black border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    );
  }

  const handleSave = () => {
    updateContent(localContent);
    alert('변경사항이 저장되었습니다.');
  };

  const handleReset = () => {
    if (confirm('모든 변경사항을 초기화하시겠습니까?')) {
      resetContent();
      setLocalContent(content);
    }
  };

  const handleChange = (section: keyof SiteContent, key: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleNestedChange = (section: keyof SiteContent, subsection: string, key: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          // @ts-ignore
          ...prev[section][subsection],
          [key]: value
        }
      }
    }));
  };

  const handleMenuChange = (index: number, key: keyof MenuItem, value: string) => {
    const newMenu = [...localContent.menu];
    newMenu[index] = { ...newMenu[index], [key]: value };
    setLocalContent(prev => ({ ...prev, menu: newMenu }));
  };

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: "새 메뉴",
      description: "메뉴 설명",
      price: "0원",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
      layout: {
        image: { x: 0, y: 0, width: 280, height: 200 },
        name: { x: 20, y: 220, width: 240, height: 'auto', fontSize: 18, fontFamily: 'Noto Sans KR', color: '#ffffff' },
        price: { x: 20, y: 250, width: 240, height: 'auto', fontSize: 16, fontFamily: 'Noto Serif KR', color: '#0047AB' },
        description: { x: 20, y: 280, width: 240, height: 'auto', fontSize: 12, fontFamily: 'Noto Sans KR', color: '#9ca3af' }
      }
    };
    setLocalContent(prev => ({ ...prev, menu: [...prev.menu, newItem] }));
  };

  const removeMenuItem = (index: number) => {
    const newMenu = localContent.menu.filter((_, i) => i !== index);
    setLocalContent(prev => ({ ...prev, menu: newMenu }));
  };

  const handleNoticeChange = (index: number, key: keyof Notice, value: string) => {
    const newNotices = [...(localContent.notices || [])];
    newNotices[index] = { ...newNotices[index], [key]: value };
    setLocalContent(prev => ({ ...prev, notices: newNotices }));
  };

  const addNotice = () => {
    const newNotice: Notice = {
      id: Date.now().toString(),
      title: "새 공지사항",
      content: "내용을 입력하세요.\n줄바꿈이 가능합니다.",
      date: new Date().toISOString().split('T')[0]
    };
    setLocalContent(prev => ({ ...prev, notices: [...(prev.notices || []), newNotice] }));
  };

  const removeNotice = (index: number) => {
    const newNotices = (localContent.notices || []).filter((_, i) => i !== index);
    setLocalContent(prev => ({ ...prev, notices: newNotices }));
  };

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...(localContent.gallery || [])];
    newGallery[index] = value;
    setLocalContent(prev => ({ ...prev, gallery: newGallery }));
  };

  const addGalleryItem = () => {
    setLocalContent(prev => ({ 
      ...prev, 
      gallery: [...(prev.gallery || []), "https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=1000&auto=format&fit=crop"] 
    }));
  };

  const removeGalleryItem = (index: number) => {
    const newGallery = (localContent.gallery || []).filter((_, i) => i !== index);
    setLocalContent(prev => ({ ...prev, gallery: newGallery }));
  };

  const handleLayoutChange = (path: string, data: Partial<LayoutData>) => {
    setLocalContent(prev => {
      const keys = path.split('.');
      const lastKey = keys.pop()!;
      const newContent = { ...prev };
      
      let current: any = newContent;
      for (const key of keys) {
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }
      
      if (!current[lastKey]) current[lastKey] = {};

      current[lastKey] = {
        ...current[lastKey],
        ...data
      };
      
      return newContent;
    });
  };

  const handleSpacingChange = (sectionKey: string, property: 'marginTop' | 'marginBottom' | 'paddingTop' | 'paddingBottom', value: number) => {
    setLocalContent(prev => ({
      ...prev,
      sectionSpacing: {
        ...prev.sectionSpacing,
        [sectionKey]: {
          ...(prev.sectionSpacing?.[sectionKey] || { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }),
          [property]: value
        }
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-black border-r border-gray-800 p-6 flex flex-col">
        <h1 className="text-xl font-bold font-serif mb-8 text-white flex items-center gap-2">
          <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
          STARRY Admin
        </h1>
        
        <nav className="flex-1 space-y-2">
          {[
            { id: 'hero', label: '히어로 섹션', icon: Layout },
            { id: 'visual', label: '비주얼 빌더', icon: Move },
            { id: 'usps', label: '소구점 (USP)', icon: ImageIcon },
            { id: 'menu', label: '메뉴 관리', icon: Type },
            { id: 'gallery', label: '갤러리 관리', icon: ImageIcon },
            { id: 'notices', label: '공지/이벤트', icon: Bell },
            { id: 'contact', label: '연락처 정보', icon: Layout },
            { id: 'theme', label: '테마 설정', icon: Palette },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-900/30 text-blue-400 border border-blue-800' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-gray-800 space-y-3">
          <button 
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            저장하기
          </button>
          <button 
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="max-w-3xl mx-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 capitalize">{activeTab} Settings</h2>

            {activeTab === 'hero' && (
              <div className="space-y-6 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                <InputGroup 
                  label="메인 헤드라인" 
                  value={localContent.hero.headline} 
                  onChange={(v: string) => handleChange('hero', 'headline', v)} 
                  textarea
                />
                <InputGroup 
                  label="서브 헤드라인" 
                  value={localContent.hero.subheadline} 
                  onChange={(v: string) => handleChange('hero', 'subheadline', v)} 
                />
                <InputGroup 
                  label="CTA 버튼 텍스트" 
                  value={localContent.hero.ctaText} 
                  onChange={(v: string) => handleChange('hero', 'ctaText', v)} 
                />
                <InputGroup 
                  label="로고 이미지 URL (투명 PNG 권장)" 
                  value={localContent.hero.logo} 
                  onChange={(v: string) => handleChange('hero', 'logo', v)} 
                />
                <div className="mt-2 rounded-lg overflow-hidden h-24 w-24 border border-gray-700 bg-gray-800 flex items-center justify-center">
                  <img src={localContent.hero.logo} alt="Logo Preview" className="w-full h-full object-contain" />
                </div>
                <InputGroup 
                  label="배경 이미지 URL" 
                  value={localContent.hero.backgroundImage} 
                  onChange={(v: string) => handleChange('hero', 'backgroundImage', v)} 
                />
                <div className="mt-4 rounded-lg overflow-hidden h-48 border border-gray-700">
                  <img src={localContent.hero.backgroundImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {activeTab === 'visual' && (
              <div className="flex flex-row gap-6 items-start justify-center">
                <div className="flex flex-col items-center">
                  <div className="mb-4 text-center w-full flex justify-between items-center px-4">
                    <div>
                      <h2 className="text-lg font-bold">비주얼 웹 빌더</h2>
                      <p className="text-sm text-gray-400">요소를 클릭하여 스타일을 편집하세요.</p>
                    </div>
                    <button
                      onClick={() => setShowGuides(!showGuides)}
                      className={`p-2 rounded-lg transition-colors ${showGuides ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                      title="가이드라인 켜기/끄기"
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div 
                    className="relative overflow-y-auto overflow-x-hidden border-4 border-gray-700 rounded-[30px] shadow-2xl bg-black scrollbar-hide"
                    style={{ width: '480px', height: '85vh' }}
                    onClick={() => setSelectedElement(null)}
                  >
                    <style>{`
                      .scrollbar-hide::-webkit-scrollbar {
                          display: none;
                      }
                    `}</style>
                    
                    {/* Center Guide Line */}
                    {(showGuides || isDragging) && (
                      <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-cyan-400 z-[60] pointer-events-none opacity-50" />
                    )}

                    {/* Hero Section */}
                    <div 
                      className={`relative w-full ${selectedElement === 'section:hero' ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        marginTop: localContent.sectionSpacing?.hero?.marginTop,
                        marginBottom: localContent.sectionSpacing?.hero?.marginBottom,
                        paddingTop: localContent.sectionSpacing?.hero?.paddingTop,
                        paddingBottom: localContent.sectionSpacing?.hero?.paddingBottom,
                        minHeight: '85vh'
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement('section:hero'); }}
                    >
                      {/* Padding Guides */}
                      {selectedElement === 'section:hero' && (
                        <>
                          <div className="absolute top-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.hero?.paddingTop || 0 }} />
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.hero?.paddingBottom || 0 }} />
                        </>
                      )}

                      {/* Background */}
                      <div 
                        className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
                        style={{ backgroundImage: `url(${localContent.hero.backgroundImage})` }}
                      />
                      
                      {/* Logo */}
                      {localContent.hero.layout?.logo && (
                        <EditableElement
                          id="logo"
                          layout={localContent.hero.layout.logo}
                          isSelected={selectedElement === 'logo'}
                          onSelect={setSelectedElement}
                          onUpdate={(id, data) => handleLayoutChange(`hero.layout.logo`, data)}
                          type="image"
                          containerWidth={480}
                          onDragStart={() => setIsDragging(true)}
                          onDragEnd={() => setIsDragging(false)}
                        >
                          <img src={localContent.hero.logo} alt="Logo" className="w-full h-full object-contain pointer-events-none" />
                        </EditableElement>
                      )}

                      {/* Headline */}
                      {localContent.hero.layout && (
                        <EditableElement
                          id="headline"
                          layout={localContent.hero.layout.headline}
                          isSelected={selectedElement === 'headline'}
                          onSelect={setSelectedElement}
                          onUpdate={(id, data) => handleLayoutChange(`hero.layout.headline`, data)}
                          type="text"
                          containerWidth={480}
                          onDragStart={() => setIsDragging(true)}
                          onDragEnd={() => setIsDragging(false)}
                        >
                          <h1 className="w-full text-center pointer-events-none whitespace-pre-line">
                            {localContent.hero.headline}
                          </h1>
                        </EditableElement>
                      )}

                      {/* Subheadline */}
                      {localContent.hero.layout && (
                        <EditableElement
                          id="subheadline"
                          layout={localContent.hero.layout.subheadline}
                          isSelected={selectedElement === 'subheadline'}
                          onSelect={setSelectedElement}
                          onUpdate={(id, data) => handleLayoutChange(`hero.layout.subheadline`, data)}
                          type="text"
                          containerWidth={480}
                          onDragStart={() => setIsDragging(true)}
                          onDragEnd={() => setIsDragging(false)}
                        >
                          <p className="w-full text-center pointer-events-none">
                            {localContent.hero.subheadline}
                          </p>
                        </EditableElement>
                      )}

                      {/* CTA */}
                      {localContent.hero.layout && (
                        <EditableElement
                          id="cta"
                          layout={localContent.hero.layout.cta}
                          isSelected={selectedElement === 'cta'}
                          onSelect={setSelectedElement}
                          onUpdate={(id, data) => handleLayoutChange(`hero.layout.cta`, data)}
                          type="button"
                          containerWidth={480}
                          onDragStart={() => setIsDragging(true)}
                          onDragEnd={() => setIsDragging(false)}
                        >
                          <div 
                            className="w-full h-full flex items-center justify-center rounded-full text-white font-medium text-sm shadow-lg pointer-events-none"
                            style={{ backgroundColor: `${localContent.theme.primaryColor}dd` }}
                          >
                            {localContent.hero.ctaText}
                          </div>
                        </EditableElement>
                      )}
                    </div>

                    {/* USP 1: Aging */}
                    <div 
                      className={`relative overflow-hidden bg-black ${selectedElement === 'section:usp_aging' ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        marginTop: localContent.sectionSpacing?.usp_aging?.marginTop,
                        marginBottom: localContent.sectionSpacing?.usp_aging?.marginBottom,
                        paddingTop: localContent.sectionSpacing?.usp_aging?.paddingTop || '5rem',
                        paddingBottom: localContent.sectionSpacing?.usp_aging?.paddingBottom || '5rem',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement('section:usp_aging'); }}
                    >
                      {/* Padding Guides */}
                      {selectedElement === 'section:usp_aging' && (
                        <>
                          <div className="absolute top-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_aging?.paddingTop || '5rem' }} />
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_aging?.paddingBottom || '5rem' }} />
                        </>
                      )}
                      
                      {/* Deep Crimson Glow */}
                      <div className="absolute -bottom-[20%] -right-[20%] w-[500px] h-[500px] rounded-full bg-[#DC143C] opacity-20 blur-[120px] pointer-events-none z-0" />

                      <div className="space-y-6 relative z-10 px-6">
                        <div className="aspect-[4/5] w-full overflow-hidden rounded-sm">
                          <img 
                            src={localContent.usps.aging.image} 
                            alt="Dry Aging" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-2xl font-serif text-white">{localContent.usps.aging.title}</h3>
                          <p className="text-gray-400 font-light leading-relaxed text-sm whitespace-pre-line">
                            {localContent.usps.aging.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* USP 2: View */}
                    <div 
                      className={`relative w-full ${selectedElement === 'section:usp_view' ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        marginTop: localContent.sectionSpacing?.usp_view?.marginTop,
                        marginBottom: localContent.sectionSpacing?.usp_view?.marginBottom,
                        paddingTop: localContent.sectionSpacing?.usp_view?.paddingTop || '0',
                        paddingBottom: localContent.sectionSpacing?.usp_view?.paddingBottom || '0',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement('section:usp_view'); }}
                    >
                      {/* Padding Guides */}
                      {selectedElement === 'section:usp_view' && (
                        <>
                          <div className="absolute top-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_view?.paddingTop || '0' }} />
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_view?.paddingBottom || '0' }} />
                        </>
                      )}

                      <div className="relative w-full h-[400px] overflow-hidden">
                        {/* Background Image */}
                        <img 
                          src={localContent.usps.view.image} 
                          alt="Panoramic View" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent" />

                        {/* Content at Bottom */}
                        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end items-start text-left z-20">
                          <h3 className="text-3xl font-serif text-white mb-3 drop-shadow-lg">
                            {localContent.usps.view.title}
                          </h3>
                          <p className="text-white/90 font-light leading-relaxed text-sm drop-shadow-md max-w-lg whitespace-pre-line">
                            {localContent.usps.view.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* USP 3: Private Room */}
                    <div 
                      className={`relative w-full ${selectedElement === 'section:usp_privateRoom' ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        marginTop: localContent.sectionSpacing?.usp_privateRoom?.marginTop,
                        marginBottom: localContent.sectionSpacing?.usp_privateRoom?.marginBottom,
                        paddingTop: localContent.sectionSpacing?.usp_privateRoom?.paddingTop || '0',
                        paddingBottom: localContent.sectionSpacing?.usp_privateRoom?.paddingBottom || '0',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement('section:usp_privateRoom'); }}
                    >
                      {/* Padding Guides */}
                      {selectedElement === 'section:usp_privateRoom' && (
                        <>
                          <div className="absolute top-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_privateRoom?.paddingTop || '0' }} />
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_privateRoom?.paddingBottom || '0' }} />
                        </>
                      )}

                      <div className="relative w-full h-[400px] overflow-hidden">
                        {/* Background Image */}
                        <img 
                          src={localContent.usps.privateRoom.image} 
                          alt="Private Room" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent" />

                        {/* Content at Bottom */}
                        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end items-start text-left z-20">
                          <h3 className="text-3xl font-serif text-white mb-3 drop-shadow-lg">
                            {localContent.usps.privateRoom.title}
                          </h3>
                          <p className="text-white/90 font-light leading-relaxed text-sm drop-shadow-md max-w-lg whitespace-pre-line">
                            {localContent.usps.privateRoom.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* USP 4 & 5: Terrace & Pet */}
                    <div 
                      className={`relative overflow-hidden bg-black ${selectedElement === 'section:usp_terrace_pet' ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        marginTop: localContent.sectionSpacing?.usp_terrace_pet?.marginTop,
                        marginBottom: localContent.sectionSpacing?.usp_terrace_pet?.marginBottom,
                        paddingTop: localContent.sectionSpacing?.usp_terrace_pet?.paddingTop || '5rem',
                        paddingBottom: localContent.sectionSpacing?.usp_terrace_pet?.paddingBottom || '5rem',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement('section:usp_terrace_pet'); }}
                    >
                      {/* Padding Guides */}
                      {selectedElement === 'section:usp_terrace_pet' && (
                        <>
                          <div className="absolute top-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_terrace_pet?.paddingTop || '5rem' }} />
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_terrace_pet?.paddingBottom || '5rem' }} />
                        </>
                      )}

                      {/* Glows */}
                      <div className="absolute -bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#008080] opacity-20 blur-[100px] pointer-events-none z-0" />
                      <div className="absolute -top-[10%] -right-[10%] w-[300px] h-[300px] rounded-full bg-[#9400D3] opacity-20 blur-[100px] pointer-events-none z-0" />

                      <div className="flex flex-col gap-16 px-6 relative z-10">
                        {/* Terrace */}
                        <div className="space-y-4">
                          <div className="aspect-[3/4] w-full overflow-hidden rounded-sm">
                            <img src={localContent.usps.terrace.image} alt="Terrace" className="w-full h-full object-cover" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xl font-serif text-white">{localContent.usps.terrace.title}</h4>
                            <p className="text-gray-300 font-light text-sm leading-relaxed whitespace-pre-line">
                              {localContent.usps.terrace.description}
                            </p>
                          </div>
                        </div>

                        {/* Pet */}
                        <div className="space-y-4">
                          <div className="aspect-[3/4] w-full overflow-hidden rounded-sm relative group">
                             <img src={localContent.usps.pet.image} alt="Pet Friendly" className="w-full h-full object-cover" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xl font-serif text-white">{localContent.usps.pet.title}</h4>
                            <p className="text-gray-300 font-light text-sm leading-relaxed whitespace-pre-line">
                              {localContent.usps.pet.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Section (Horizontal Scroll) */}
                    <div 
                      className={`relative overflow-hidden bg-black ${selectedElement === 'section:menu' ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        marginTop: localContent.sectionSpacing?.menu?.marginTop,
                        marginBottom: localContent.sectionSpacing?.menu?.marginBottom,
                        paddingTop: localContent.sectionSpacing?.menu?.paddingTop || '5rem', // Default py-20 is 5rem
                        paddingBottom: localContent.sectionSpacing?.menu?.paddingBottom || '5rem',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement('section:menu'); }}
                    >
                      {/* Padding Guides */}
                      {selectedElement === 'section:menu' && (
                        <>
                          <div className="absolute top-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.menu?.paddingTop || '5rem' }} />
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.menu?.paddingBottom || '5rem' }} />
                        </>
                      )}

                      <div className="bg-black/40 backdrop-blur-sm absolute inset-0 z-0"></div>

                      <div className="mb-10 text-center relative z-10 px-6">
                        <h3 className="text-2xl font-serif text-white mb-2">Signature Menu</h3>
                        <div className="w-10 h-[1px] bg-white/30 mx-auto"></div>
                      </div>

                      <div className="relative z-10 w-full overflow-x-auto flex gap-4 px-6 pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {localContent.menu.map((item, index) => (
                          <div 
                            key={item.id}
                            className="flex-shrink-0 w-[280px] snap-center bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-lg relative"
                            style={{ height: '380px' }} // Fixed height for container
                          >
                            {/* Delete Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm('Delete this menu item?')) {
                                  removeMenuItem(index);
                                }
                              }}
                              className="absolute top-2 right-2 z-50 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                            
                            {/* Center Guide Line for Menu Card */}
                            {(showGuides || isDragging) && (
                              <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-cyan-400 z-[60] pointer-events-none opacity-50" />
                            )}

                            {item.layout ? (
                              <>
                                {/* Image */}
                                <EditableElement
                                  id={`menu.${index}.image`}
                                  layout={item.layout.image}
                                  isSelected={selectedElement === `menu.${index}.image`}
                                  onSelect={setSelectedElement}
                                  onUpdate={(id, data) => handleLayoutChange(`menu.${index}.layout.image`, data)}
                                  type="image"
                                  containerWidth={280}
                                  onDragStart={() => setIsDragging(true)}
                                  onDragEnd={() => setIsDragging(false)}
                                >
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </EditableElement>

                                {/* Name */}
                                <EditableElement
                                  id={`menu.${index}.name`}
                                  layout={item.layout.name}
                                  isSelected={selectedElement === `menu.${index}.name`}
                                  onSelect={setSelectedElement}
                                  onUpdate={(id, data) => handleLayoutChange(`menu.${index}.layout.name`, data)}
                                  type="text"
                                  containerWidth={280}
                                  onDragStart={() => setIsDragging(true)}
                                  onDragEnd={() => setIsDragging(false)}
                                >
                                  <h4 className="w-full pointer-events-none truncate">{item.name}</h4>
                                </EditableElement>

                                {/* Price */}
                                <EditableElement
                                  id={`menu.${index}.price`}
                                  layout={item.layout.price}
                                  isSelected={selectedElement === `menu.${index}.price`}
                                  onSelect={setSelectedElement}
                                  onUpdate={(id, data) => handleLayoutChange(`menu.${index}.layout.price`, data)}
                                  type="text"
                                  containerWidth={280}
                                  onDragStart={() => setIsDragging(true)}
                                  onDragEnd={() => setIsDragging(false)}
                                >
                                  <span className="w-full pointer-events-none">{item.price}</span>
                                </EditableElement>

                                {/* Description */}
                                <EditableElement
                                  id={`menu.${index}.description`}
                                  layout={item.layout.description}
                                  isSelected={selectedElement === `menu.${index}.description`}
                                  onSelect={setSelectedElement}
                                  onUpdate={(id, data) => handleLayoutChange(`menu.${index}.layout.description`, data)}
                                  type="text"
                                  containerWidth={280}
                                  onDragStart={() => setIsDragging(true)}
                                  onDragEnd={() => setIsDragging(false)}
                                >
                                  <p className="w-full pointer-events-none text-xs line-clamp-2">{item.description}</p>
                                </EditableElement>
                              </>
                            ) : (
                              <div className="p-4 text-center text-gray-500">
                                No layout data. Reset content to see default layout.
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Add Button Card */}
                        <div 
                          className="flex-shrink-0 w-[280px] snap-center bg-[#111] border-2 border-dashed border-gray-800 rounded-xl overflow-hidden shadow-lg flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-900/10 transition-all"
                          style={{ height: '380px' }}
                          onClick={addMenuItem}
                        >
                          <div className="text-center text-gray-400">
                            <Plus className="w-12 h-12 mx-auto mb-2" />
                            <span>Add Menu Item</span>
                          </div>
                        </div>
                        
                        <div className="w-2 flex-shrink-0" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Editor Toolbar */}
                {selectedElement && (
                  <div className="w-80 bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 space-y-6 overflow-y-auto max-h-[85vh]">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                      <h3 className="font-bold text-lg capitalize">
                        {selectedElement.startsWith('section:') ? 'Spacing Editor' : 'Style Editor'}
                      </h3>
                      <button onClick={() => setSelectedElement(null)} className="text-gray-400 hover:text-white">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Spacing Editor */}
                    {selectedElement.startsWith('section:') && (() => {
                       const sectionKey = selectedElement.split(':')[1];
                       const spacing = localContent.sectionSpacing?.[sectionKey] || { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 };
                       
                       return (
                         <div className="space-y-6">
                           <div className="space-y-4">
                             <h4 className="text-sm font-semibold text-blue-400">Margin (Outside)</h4>
                             <SpacingSlider label="Top Margin" value={spacing.marginTop || 0} onChange={(val) => handleSpacingChange(sectionKey, 'marginTop', val)} />
                             <SpacingSlider label="Bottom Margin" value={spacing.marginBottom || 0} onChange={(val) => handleSpacingChange(sectionKey, 'marginBottom', val)} />
                           </div>
                           <div className="space-y-4 pt-4 border-t border-gray-800">
                             <h4 className="text-sm font-semibold text-green-400">Padding (Inside)</h4>
                             <SpacingSlider label="Top Padding" value={spacing.paddingTop || 0} onChange={(val) => handleSpacingChange(sectionKey, 'paddingTop', val)} />
                             <SpacingSlider label="Bottom Padding" value={spacing.paddingBottom || 0} onChange={(val) => handleSpacingChange(sectionKey, 'paddingBottom', val)} />
                           </div>
                         </div>
                       );
                    })()}

                    {/* Style Editor */}
                    {!selectedElement.startsWith('section:') && (() => {
                      const currentLayout = (() => {
                         if (['headline', 'subheadline', 'cta', 'logo'].includes(selectedElement)) {
                            return localContent.hero.layout?.[selectedElement as 'headline' | 'subheadline' | 'cta' | 'logo'];
                         }
                         if (selectedElement.startsWith('menu.')) {
                            const parts = selectedElement.split('.');
                            const index = parseInt(parts[1]);
                            const field = parts[2];
                            return localContent.menu[index]?.layout?.[field as 'name' | 'price' | 'description' | 'image'];
                         }
                         return null;
                      })();

                      if (!currentLayout) return <div className="text-gray-500">Select an element to edit style.</div>;

                      // Helper to update
                      const updateStyle = (key: string, value: any) => {
                         let path = '';
                         if (['headline', 'subheadline', 'cta', 'logo'].includes(selectedElement)) {
                            path = `hero.layout.${selectedElement}`;
                         } else if (selectedElement.startsWith('menu.')) {
                            const parts = selectedElement.split('.');
                            const index = parts[1];
                            const field = parts[2];
                            path = `menu.${index}.layout.${field}`;
                         }
                         handleLayoutChange(path, { [key]: value });
                      };

                      return (
                        <>
                          {/* Font Family */}
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 uppercase">Font Family</label>
                            <select 
                              className="w-full bg-[#222] border border-gray-700 rounded-lg p-2 text-white text-sm"
                              value={currentLayout.fontFamily || 'Noto Sans KR'}
                              onChange={(e) => updateStyle('fontFamily', e.target.value)}
                            >
                              <option value="Noto Sans KR">Noto Sans KR (Gothic)</option>
                              <option value="Noto Serif KR">Noto Serif KR (Myungjo)</option>
                              <option value="Pretendard">Pretendard</option>
                              <option value="Nanum Myeongjo">Nanum Myeongjo</option>
                            </select>
                          </div>

                          {/* Font Weight */}
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 uppercase">Font Weight</label>
                            <select 
                              className="w-full bg-[#222] border border-gray-700 rounded-lg p-2 text-white text-sm"
                              value={currentLayout.fontWeight || 400}
                              onChange={(e) => updateStyle('fontWeight', parseInt(e.target.value))}
                            >
                              <option value="100">Thin (100)</option>
                              <option value="200">Extra Light (200)</option>
                              <option value="300">Light (300)</option>
                              <option value="400">Regular (400)</option>
                              <option value="500">Medium (500)</option>
                              <option value="600">Semi Bold (600)</option>
                              <option value="700">Bold (700)</option>
                              <option value="800">Extra Bold (800)</option>
                              <option value="900">Black (900)</option>
                            </select>
                          </div>

                          {/* Font Size */}
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <label className="text-xs font-medium text-gray-400 uppercase">Font Size</label>
                              <span className="text-xs text-gray-400">{currentLayout.fontSize}px</span>
                            </div>
                            <input 
                              type="range" 
                              min="10" 
                              max="100" 
                              value={currentLayout.fontSize || 16} 
                              onChange={(e) => updateStyle('fontSize', parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>

                          {/* Color */}
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 uppercase">Text Color</label>
                            <div className="flex gap-2">
                              <input 
                                type="color" 
                                value={currentLayout.color || '#ffffff'} 
                                onChange={(e) => updateStyle('color', e.target.value)}
                                className="w-10 h-10 rounded cursor-pointer bg-transparent"
                              />
                              <input 
                                type="text" 
                                value={currentLayout.color || '#ffffff'} 
                                onChange={(e) => updateStyle('color', e.target.value)}
                                className="flex-1 bg-[#222] border border-gray-700 rounded-lg p-2 text-white text-sm"
                              />
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'usps' && (
              <div className="space-y-8">
                {Object.entries(localContent.usps).map(([key, usp]) => {
                  const typedUsp = usp as { title: string; description: string; image: string };
                  return (
                    <div key={key} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                      <h3 className="text-lg font-medium mb-4 capitalize text-blue-400">{key} Section</h3>
                      <InputGroup 
                        label="제목" 
                        value={typedUsp.title} 
                        onChange={(v: string) => handleNestedChange('usps', key, 'title', v)} 
                      />
                      <InputGroup 
                        label="설명" 
                        value={typedUsp.description} 
                        onChange={(v: string) => handleNestedChange('usps', key, 'description', v)} 
                        textarea
                      />
                      <InputGroup 
                        label="이미지 URL" 
                        value={typedUsp.image} 
                        onChange={(v: string) => handleNestedChange('usps', key, 'image', v)} 
                      />
                      <div className="mt-2 rounded-lg overflow-hidden h-32 w-32 border border-gray-700">
                        <img src={typedUsp.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-6">
                {localContent.menu.map((item, index) => (
                  <div key={item.id} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 relative group">
                    <button 
                      onClick={() => removeMenuItem(index)}
                      className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputGroup 
                        label="메뉴명" 
                        value={item.name} 
                        onChange={(v: string) => handleMenuChange(index, 'name', v)} 
                      />
                      <InputGroup 
                        label="가격" 
                        value={item.price} 
                        onChange={(v: string) => handleMenuChange(index, 'price', v)} 
                      />
                    </div>
                    <InputGroup 
                      label="설명" 
                      value={item.description} 
                      onChange={(v: string) => handleMenuChange(index, 'description', v)} 
                      textarea
                    />
                    <InputGroup 
                      label="이미지 URL" 
                      value={item.image} 
                      onChange={(v: string) => handleMenuChange(index, 'image', v)} 
                    />
                    <div className="flex gap-4 items-center mt-2">
                       <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
                          <img src={item.image} alt="Preview" className="w-full h-full object-cover" />
                       </div>
                       <span className="text-xs text-gray-500">이미지 미리보기</span>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={addMenuItem}
                  className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  새 메뉴 추가하기
                </button>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(localContent.gallery || []).map((image, index) => (
                    <div key={index} className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 relative group">
                      <button 
                        onClick={() => removeGalleryItem(index)}
                        className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-red-600 transition-colors z-10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="aspect-video w-full rounded-lg overflow-hidden mb-3 bg-gray-800">
                        <img src={image} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                      </div>
                      <InputGroup 
                        label={`이미지 URL ${index + 1}`} 
                        value={image} 
                        onChange={(v: string) => handleGalleryChange(index, v)} 
                      />
                    </div>
                  ))}
                </div>
                <button 
                  onClick={addGalleryItem}
                  className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  새 이미지 추가하기
                </button>
              </div>
            )}

            {activeTab === 'notices' && (
              <div className="space-y-6">
                {(localContent.notices || []).map((notice, index) => (
                  <div key={notice.id} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 relative group">
                    <button 
                      onClick={() => removeNotice(index)}
                      className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputGroup 
                        label="제목" 
                        value={notice.title} 
                        onChange={(v: string) => handleNoticeChange(index, 'title', v)} 
                      />
                      <InputGroup 
                        label="날짜" 
                        value={notice.date} 
                        onChange={(v: string) => handleNoticeChange(index, 'date', v)} 
                        type="date"
                      />
                    </div>
                    <InputGroup 
                      label="내용 (줄바꿈 가능)" 
                      value={notice.content} 
                      onChange={(v: string) => handleNoticeChange(index, 'content', v)} 
                      textarea
                    />
                  </div>
                ))}
                <button 
                  onClick={addNotice}
                  className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  새 공지사항 추가하기
                </button>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                <InputGroup 
                  label="주소" 
                  value={localContent.contact.address} 
                  onChange={(v: string) => handleChange('contact', 'address', v)} 
                />
                <InputGroup 
                  label="전화번호" 
                  value={localContent.contact.phone} 
                  onChange={(v: string) => handleChange('contact', 'phone', v)} 
                />
                <InputGroup 
                  label="영업시간" 
                  value={localContent.contact.hours} 
                  onChange={(v: string) => handleChange('contact', 'hours', v)} 
                />
                <InputGroup 
                  label="네이버 지도 URL" 
                  value={localContent.contact.naverMapUrl} 
                  onChange={(v: string) => handleChange('contact', 'naverMapUrl', v)} 
                />
                <InputGroup 
                  label="인스타그램 URL" 
                  value={localContent.contact.instagram} 
                  onChange={(v: string) => handleChange('contact', 'instagram', v)} 
                />
                <InputGroup 
                  label="블로그 URL" 
                  value={localContent.contact.blog} 
                  onChange={(v: string) => handleChange('contact', 'blog', v)} 
                />
                <InputGroup 
                  label="지도 이미지 URL" 
                  value={localContent.contact.mapImage} 
                  onChange={(v: string) => handleChange('contact', 'mapImage', v)} 
                />
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="space-y-6 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                <InputGroup 
                  label="포인트 컬러 (Primary)" 
                  value={localContent.theme.primaryColor} 
                  onChange={(v: string) => handleChange('theme', 'primaryColor', v)} 
                  type="color"
                />
                <InputGroup 
                  label="배경 컬러 (Background)" 
                  value={localContent.theme.backgroundColor} 
                  onChange={(v: string) => handleChange('theme', 'backgroundColor', v)} 
                  type="color"
                />
                <div className="p-4 rounded-lg border border-gray-700 flex items-center justify-center gap-4" style={{ backgroundColor: localContent.theme.backgroundColor }}>
                  <button 
                    className="px-6 py-2 rounded-full text-white text-sm"
                    style={{ backgroundColor: localContent.theme.primaryColor }}
                  >
                    Button Preview
                  </button>
                  <span className="text-white font-serif">Font Preview</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
