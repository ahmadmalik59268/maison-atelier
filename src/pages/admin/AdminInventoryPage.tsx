import React, { useState } from 'react';
import { Warehouse, Search, Plus, Minus, AlertTriangle, Save, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AdminInventoryPage: React.FC = () => {
  const { products, updateProduct, formatPrice, addToast } = useShop();

  const [search, setSearch] = useState('');
  const [filterLowStockOnly, setFilterLowStockOnly] = useState(false);
  const [stockChanges, setStockChanges] = useState<Record<string, number>>({});

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesLowStock = !filterLowStockOnly || p.stock_quantity <= 5;
    return matchesSearch && matchesLowStock;
  });

  const handleStockDelta = (productId: string, currentStock: number, delta: number) => {
    const currentVal = stockChanges[productId] !== undefined ? stockChanges[productId] : currentStock;
    const nextVal = Math.max(0, currentVal + delta);
    setStockChanges({
      ...stockChanges,
      [productId]: nextVal,
    });
  };

  const handleManualInput = (productId: string, val: number) => {
    setStockChanges({
      ...stockChanges,
      [productId]: Math.max(0, val),
    });
  };

  const handleSaveSingle = (productId: string) => {
    if (stockChanges[productId] !== undefined) {
      updateProduct(productId, { stock_quantity: stockChanges[productId] });
      const newMap = { ...stockChanges };
      delete newMap[productId];
      setStockChanges(newMap);
      addToast('Inventory count updated.', 'success');
    }
  };

  const handleSaveAll = () => {
    Object.entries(stockChanges).forEach(([pId, newStock]) => {
      updateProduct(pId, { stock_quantity: newStock });
    });
    setStockChanges({});
    addToast('All inventory adjustments persisted.', 'success');
  };

  const pendingCount = Object.keys(stockChanges).length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C8275]">
            Atelier Vault & Reserves
          </p>
          <h1 className="font-serif text-3xl text-[#1A1A1A] font-light">
            Inventory & Stock Control
          </h1>
        </div>

        {pendingCount > 0 && (
          <button
            onClick={handleSaveAll}
            className="bg-emerald-700 text-white px-5 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-emerald-800 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save All Changes ({pendingCount})
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#E5E0D8] p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by SKU or Garment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#E5E0D8] pl-10 pr-4 py-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-mono text-[#5A534A] cursor-pointer">
          <input
            type="checkbox"
            checked={filterLowStockOnly}
            onChange={(e) => setFilterLowStockOnly(e.target.checked)}
            className="accent-[#1A1A1A]"
          />
          <span>Show Low Stock Only (&le; 5 units)</span>
        </label>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E5E0D8] text-[#8C8275] uppercase text-[10px]">
                <th className="p-4">Garment</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4">Quick Adjust</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {filteredProducts.map((p) => {
                const currentVal =
                  stockChanges[p.id] !== undefined ? stockChanges[p.id] : p.stock_quantity;
                const isModified = stockChanges[p.id] !== undefined;

                return (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-12 object-cover border"
                        />
                        <div>
                          <p className="font-serif text-[#1A1A1A] font-medium">{p.name}</p>
                          <p className="text-[10px] text-[#8C8275]">{p.material}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-[#5A534A]">{p.sku}</td>
                    <td className="p-4 font-mono">{formatPrice(p.price)}</td>
                    <td className="p-4">
                      {currentVal <= 5 ? (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-rose-800 bg-rose-50 px-2 py-0.5 border border-rose-200">
                          <AlertTriangle className="w-3 h-3" /> Low ({currentVal})
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                          Adequate ({currentVal})
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStockDelta(p.id, p.stock_quantity, -1)}
                          className="w-7 h-7 bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center hover:bg-[#E5E0D8] text-[#1A1A1A]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          min={0}
                          value={currentVal}
                          onChange={(e) => handleManualInput(p.id, parseInt(e.target.value) || 0)}
                          className={`w-16 text-center border p-1 text-xs font-mono ${
                            isModified
                              ? 'border-amber-500 bg-amber-50 font-bold text-[#1A1A1A]'
                              : 'border-[#E5E0D8] bg-[#FAF8F5]'
                          }`}
                        />
                        <button
                          onClick={() => handleStockDelta(p.id, p.stock_quantity, 1)}
                          className="w-7 h-7 bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center hover:bg-[#E5E0D8] text-[#1A1A1A]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      {isModified ? (
                        <button
                          onClick={() => handleSaveSingle(p.id)}
                          className="bg-[#1A1A1A] text-white px-3 py-1 text-[10px] font-mono uppercase tracking-widest hover:bg-black"
                        >
                          Save
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#8C8275]">Synced</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
