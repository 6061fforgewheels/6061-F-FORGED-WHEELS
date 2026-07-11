import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, ChevronDown, Plus, 
  Edit2, Trash2, Save, Image as ImageIcon, ArrowLeft, Settings
} from 'lucide-react';

// 初始產品型錄資料 (依照您提供的架構圖設計)
const initialCatalogData = [
  {
    id: 'L1-01',
    name: '色卡對應區',
    subCategories: [
      { id: 'L2-01-01', name: '一般色', products: [] },
      { id: 'L2-01-02', name: '特殊色', products: [] },
    ]
  },
  {
    id: 'L1-02',
    name: '鍛造單片客製',
    subCategories: [
      { id: 'L2-02-01', name: 'OE-原廠款式', products: [] },
      { id: 'L2-02-02', name: 'PORSCHE', products: [{ id: 'P01', name: 'P01', image: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=500&q=80', specs: '專為保時捷打造，5孔130規格。' }] },
      { id: 'L2-02-03', name: 'BMW', products: [{ id: 'B01', name: 'B01', image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=500&q=80', specs: '寶馬專用，5孔112規格。' }] },
      { id: 'L2-02-04', name: 'AUDI', products: [{ id: 'A01', name: 'A01', image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=500&q=80', specs: '奧迪專用，完美切齊輪拱。' }] },
      { id: 'L2-02-05', name: 'Lexus', products: [{ id: 'L01', name: 'L01', image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=500&q=80', specs: 'Lexus 專屬優雅設計。' }] },
      { id: 'L2-02-06', name: 'Land rover', products: [{ id: 'R01', name: 'R01', image: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=500&q=80', specs: '高載重越野設計。' }] },
      { id: 'L2-02-07', name: 'Mercedes-benz', products: [{ id: 'M01', name: 'M01', image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=500&q=80', specs: '賓士奢華風格。' }] },
      { id: 'L2-02-08', name: 'PX-轎跑車系列', products: [
        { id: 'PX01', name: 'PX01', image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=500&q=80', specs: '高階運動化轎跑設定，輕量化處理。' },
        { id: 'PX02', name: 'PX02', image: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=500&q=80', specs: '極限抓地力配方，寬體對應。' }
      ]},
      { id: 'L2-02-09', name: 'EX-電動車系列', products: [{ id: 'EX01', name: 'EX01', image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=500&q=80', specs: '低風阻氣動設計，增加續航里程。' }] },
      { id: 'L2-02-10', name: 'TX-越野車系列', products: [{ id: 'TX01', name: 'TX01', image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=500&q=80', specs: '防脫圈設計，極限越野對應。' }] },
    ]
  },
  {
    id: 'L1-03',
    name: 'CARBON客製',
    subCategories: [
      { id: 'L2-03-01', name: 'CF系列', products: [
        { id: 'CF01', name: 'CF01', image: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=500&q=80', specs: '純碳纖維桶身，極致輕量化。' },
        { id: 'CF02', name: 'CF02', image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=500&q=80', specs: '鍛造碳纖維紋路，獨一無二。' }
      ] }
    ]
  }
];

export default function App() {
  // 全域資料狀態
  const [catalog, setCatalog] = useState(initialCatalogData);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // 導航狀態 (前台)
  const [activeLayer1, setActiveLayer1] = useState(catalog[1]); // 預設選中 鍛造單片客製
  const [activeLayer2, setActiveLayer2] = useState(catalog[1].subCategories[7]); // 預設選中 PX系列
  const [activeProduct, setActiveProduct] = useState<any>(null); // 第四層狀態

  // 選單開關狀態 (手機版)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- 前台檢視元件 (Frontend View) ---
  const FrontendView = () => {
    // 渲染第一層與第二層選單
    const renderSidebar = () => (
      <div className="w-full md:w-64 bg-zinc-950 border-r border-zinc-900 min-h-[calc(100vh-64px)] p-6">
        <h2 className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-6">產品型錄導覽</h2>
        <ul className="space-y-4">
          {catalog.map(layer1 => (
            <li key={layer1.id} className="block">
              <button 
                onClick={() => setActiveLayer1(layer1)}
                className={`w-full text-left flex justify-between items-center py-2 text-sm font-medium transition-colors ${
                  activeLayer1?.id === layer1.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {layer1.name}
                <ChevronDown size={16} className={`transition-transform ${activeLayer1?.id === layer1.id ? 'rotate-180' : ''}`} />
              </button>
              
              {/* 第二層次選單 */}
              {activeLayer1?.id === layer1.id && (
                <ul className="pl-4 mt-2 space-y-2 border-l border-zinc-800 ml-2">
                  {layer1.subCategories.map(layer2 => (
                    <li key={layer2.id}>
                      <button
                        onClick={() => {
                          setActiveLayer2(layer2);
                          setActiveProduct(null); // 切換目錄時關閉產品詳細頁
                          setIsMobileMenuOpen(false); // 手機版選擇後關閉選單
                        }}
                        className={`text-left w-full py-1 text-xs tracking-wider transition-colors ${
                          activeLayer2?.id === layer2.id ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {layer2.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    );

    // 渲染第三層 (產品圖片網格)
    const renderLayer3 = () => (
      <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-zinc-500 tracking-widest mb-2">
            <span>{activeLayer1?.name}</span>
            <ChevronRight size={12} />
            <span className="text-white">{activeLayer2?.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wider">{activeLayer2?.name}</h1>
        </div>

        {activeLayer2?.products.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-lg text-zinc-600">
            <ImageIcon size={48} className="mb-4 opacity-50" />
            <p>目前此分類尚無產品圖片</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeLayer2?.products.map(product => (
              <div 
                key={product.id} 
                className="group cursor-pointer bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all"
                onClick={() => setActiveProduct(product)}
              >
                <div className="aspect-square overflow-hidden bg-black flex items-center justify-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  ) : (
                    <ImageIcon size={48} className="text-zinc-800" />
                  )}
                </div>
                <div className="p-4 flex justify-between items-center bg-zinc-950">
                  <h3 className="text-white font-bold tracking-widest">{product.name}</h3>
                  <span className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-1 rounded">查看規格</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    // 渲染第四層 (產品規格詳細頁)
    const renderLayer4 = () => (
      <div className="flex-1 p-6 lg:p-12 overflow-y-auto bg-black">
        <button 
          onClick={() => setActiveProduct(null)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm tracking-widest mb-8"
        >
          <ArrowLeft size={16} /> 返回產品列表
        </button>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2 aspect-square bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
            {activeProduct.image ? (
              <img src={activeProduct.image} alt={activeProduct.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-700">無圖片</div>
            )}
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="text-xs text-zinc-500 tracking-widest mb-2 flex items-center gap-2">
              <span>{activeLayer1?.name}</span> <ChevronRight size={12}/> <span>{activeLayer2?.name}</span>
            </div>
            <h1 className="text-5xl font-bold text-white tracking-wider mb-6">{activeProduct.name}</h1>
            <div className="w-12 h-1 bg-zinc-700 mb-6"></div>
            
            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-lg">
              <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-4 border-b border-zinc-800 pb-2">產品規格</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {activeProduct.specs || '尚無規格資料。'}
              </p>
            </div>

            <button className="mt-8 px-8 py-4 bg-white text-black text-xs font-bold tracking-widest hover:bg-zinc-200 transition-colors self-start">
              聯絡我們訂製
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] pt-16">
        {/* 手機版選單遮罩與側邊欄 */}
        <div className={`${isMobileMenuOpen ? 'fixed inset-0 z-40 bg-black' : 'hidden'} md:block md:static md:bg-transparent`}>
           {renderSidebar()}
        </div>
        
        {/* 主內容區塊 */}
        <div className={`flex-1 flex flex-col ${isMobileMenuOpen ? 'hidden md:flex' : 'flex'}`}>
          {activeProduct ? renderLayer4() : renderLayer3()}
        </div>
      </div>
    );
  };

  // --- 後台管理元件 (Backend/Admin View) ---
  const AdminView = () => {
    const [selectedL1Id, setSelectedL1Id] = useState(catalog[0].id);
    const [selectedL2Id, setSelectedL2Id] = useState(catalog[0].subCategories[0]?.id);
    const [editingProduct, setEditingProduct] = useState<any>(null); // 正在編輯的產品
    const [isCreating, setIsCreating] = useState(false); // 是否在新增模式

    // 當 Layer 1 改變時，自動選擇對應的第一個 Layer 2
    useEffect(() => {
      const l1 = catalog.find(c => c.id === selectedL1Id);
      if (l1 && l1.subCategories.length > 0) {
        setSelectedL2Id(l1.subCategories[0].id);
      }
    }, [selectedL1Id, catalog]);

    const activeL1 = catalog.find(c => c.id === selectedL1Id);
    const activeL2 = activeL1?.subCategories.find(sc => sc.id === selectedL2Id);

    // 儲存產品 (新增或修改)
    const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const productData = {
        id: isCreating ? `PROD_${Date.now()}` : editingProduct.id,
        name: formData.get('name'),
        image: formData.get('image'),
        specs: formData.get('specs')
      };

      setCatalog(prevCatalog => {
        return prevCatalog.map(l1 => {
          if (l1.id !== selectedL1Id) return l1;
          return {
            ...l1,
            subCategories: l1.subCategories.map(l2 => {
              if (l2.id !== selectedL2Id) return l2;
              let newProducts = [...l2.products];
              if (isCreating) {
                newProducts.push(productData as any);
              } else {
                newProducts = newProducts.map(p => p.id === productData.id ? productData : p) as any[];
              }
              return { ...l2, products: newProducts };
            })
          };
        });
      });

      setEditingProduct(null);
      setIsCreating(false);
    };

    // 刪除產品
    const handleDeleteProduct = (productId: string) => {
      if(window.confirm('確定要刪除這個產品嗎？')) {
        setCatalog(prevCatalog => {
          return prevCatalog.map(l1 => {
            if (l1.id !== selectedL1Id) return l1;
            return {
              ...l1,
              subCategories: l1.subCategories.map(l2 => {
                if (l2.id !== selectedL2Id) return l2;
                return { ...l2, products: l2.products.filter(p => p.id !== productId) };
              })
            };
          });
        });
      }
    };

    return (
      <div className="p-6 md:p-12 pt-24 min-h-screen bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-widest mb-2">後台管理系統</h1>
              <p className="text-zinc-500 text-sm">新增、修改或刪除各分類下的產品與圖片 (模擬記憶體模式)</p>
            </div>
            <button 
              onClick={() => setIsAdminMode(false)}
              className="px-6 py-2 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-sm flex items-center gap-2"
            >
              <ArrowLeft size={16} /> 返回前台網站
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 左側：目錄選擇器 */}
            <div className="col-span-1 bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-6 self-start">
              <div>
                <label className="block text-xs font-bold text-zinc-400 tracking-widest mb-2 uppercase">第一層 主選單</label>
                <select 
                  className="w-full bg-black border border-zinc-700 text-white p-3 rounded outline-none focus:border-white transition-colors"
                  value={selectedL1Id}
                  onChange={(e) => setSelectedL1Id(e.target.value)}
                >
                  {catalog.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-400 tracking-widest mb-2 uppercase">第二層 次選單</label>
                <select 
                  className="w-full bg-black border border-zinc-700 text-white p-3 rounded outline-none focus:border-white transition-colors"
                  value={selectedL2Id}
                  onChange={(e) => setSelectedL2Id(e.target.value)}
                >
                  {activeL1?.subCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            {/* 右側：產品列表與編輯表單 */}
            <div className="col-span-1 md:col-span-2">
              {editingProduct || isCreating ? (
                /* 編輯/新增表單 */
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                    <h2 className="text-xl font-bold text-white">
                      {isCreating ? '新增產品' : `編輯產品: ${editingProduct.name}`}
                    </h2>
                    <button 
                      onClick={() => { setEditingProduct(null); setIsCreating(false); }}
                      className="text-zinc-500 hover:text-white"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 tracking-widest mb-2">產品名稱 (型號)</label>
                      <input 
                        name="name" 
                        defaultValue={editingProduct?.name || ''} 
                        required
                        className="w-full bg-black border border-zinc-700 text-white p-3 rounded outline-none focus:border-white"
                        placeholder="例如: PX07"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 tracking-widest mb-2">圖片網址 (URL)</label>
                      <input 
                        name="image" 
                        defaultValue={editingProduct?.image || ''} 
                        className="w-full bg-black border border-zinc-700 text-white p-3 rounded outline-none focus:border-white"
                        placeholder="https://..."
                      />
                      <p className="text-[10px] text-zinc-500 mt-1">請貼上公開的圖片網址。若留空將顯示預設圖標。</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 tracking-widest mb-2">規格說明</label>
                      <textarea 
                        name="specs" 
                        defaultValue={editingProduct?.specs || ''} 
                        rows={4}
                        className="w-full bg-black border border-zinc-700 text-white p-3 rounded outline-none focus:border-white resize-none"
                        placeholder="輸入產品規格、尺寸、孔距等資訊..."
                      ></textarea>
                    </div>
                    
                    <div className="pt-4 flex justify-end gap-4">
                      <button 
                        type="button" 
                        onClick={() => { setEditingProduct(null); setIsCreating(false); }}
                        className="px-6 py-3 border border-zinc-700 text-zinc-300 hover:text-white rounded"
                      >
                        取消
                      </button>
                      <button 
                        type="submit"
                        className="px-6 py-3 bg-white text-black font-bold tracking-widest rounded flex items-center gap-2 hover:bg-zinc-200"
                      >
                        <Save size={16} /> 儲存產品
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* 產品列表 */
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="text-zinc-500 text-sm">目前位置：</span>
                      {activeL2?.name}
                    </h2>
                    <button 
                      onClick={() => setIsCreating(true)}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs tracking-widest rounded flex items-center gap-2 transition-colors"
                    >
                      <Plus size={14} /> 新增產品
                    </button>
                  </div>

                  {activeL2?.products.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded">
                      此目錄目前沒有產品，點擊右上方「新增產品」。
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activeL2?.products.map(product => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-black border border-zinc-800 rounded hover:border-zinc-600 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded overflow-hidden flex items-center justify-center flex-shrink-0">
                               {product.image ? (
                                 <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                               ) : (
                                 <ImageIcon size={20} className="text-zinc-600" />
                               )}
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-sm">{product.name}</h4>
                              <p className="text-zinc-500 text-[10px] truncate max-w-[200px] md:max-w-sm">{product.specs || '無規格描述'}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setEditingProduct(product)}
                              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                              title="編輯"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                              title="刪除"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black font-sans text-zinc-300 selection:bg-zinc-700 selection:text-white">
      {/* 頂部導航列 (無論前后台都顯示，包含後台切換按鈕) */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900 h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          {!isAdminMode && (
             <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          )}
          <div className="text-xl font-bold tracking-[0.2em] text-white flex items-center gap-2">
            <span className="text-zinc-400">6061</span>-F <span className="text-[10px] tracking-widest text-zinc-600 hidden sm:inline ml-2">型錄展示系統</span>
          </div>
        </div>

        <div>
           {isAdminMode ? (
              <span className="text-xs bg-zinc-800 text-white px-3 py-1 rounded tracking-widest animate-pulse">後台管理模式</span>
           ) : (
              <button 
                onClick={() => setIsAdminMode(true)}
                className="text-xs text-zinc-500 hover:text-white flex items-center gap-2 transition-colors border border-zinc-800 hover:border-zinc-500 px-3 py-1.5 rounded"
              >
                <Settings size={14} /> 後台管理
              </button>
           )}
        </div>
      </nav>

      {/* 依據狀態切換前台或後台 */}
      <main>
        {isAdminMode ? <AdminView /> : <FrontendView />}
      </main>
    </div>
  );
}
