import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Check,
  X,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';

export const AdminProductsPage: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct, formatPrice, addToast } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form State
  const initialForm: Omit<Product, 'id'> = {
    name: '',
    subtitle: '',
    slug: '',
    category: 'Outerwear',
    gender: 'women',
    material: 'Virgin Wool',
    price: 950,
    compare_at_price: 0,
    sku: `MA-${Math.floor(1000 + Math.random() * 9000)}`,
    stock_quantity: 12,
    badge: 'New Season',
    badgeType: 'new',
    sizes: ['FR 34', 'FR 36', 'FR 38', 'FR 40'],
    colors: [
      { name: 'Noir Black', hex: '#1C1B1F' },
      { name: 'Camel', hex: '#C19A6B' },
    ],
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
    ],
    fabric: '100% Biellese Virgin Wool',
    lining: '100% Cupro Silk',
    care: 'Dry clean only by luxury garment specialist.',
    description: 'Tailored with sharp peak lapels and structured shoulder construction.',
    editorialDescription: 'Tailored with sharp peak lapels and structured shoulder construction.',
    details: ['Hand-sewn pick stitching', '100% breathable cupro lining', 'Includes cedar garment dossier'],
    origin: 'Hand-tailored in Paris, France',
    traceabilityId: 'FR-ATELIER-2025-099',
    rating: 5.0,
    reviewsCount: 4,
    featured: false,
    new_arrival: true,
  };

  const [formData, setFormData] = useState<Omit<Product, 'id'>>(initialForm);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingProductId(null);
    setFormData({
      ...initialForm,
      sku: `MA-${Math.floor(1000 + Math.random() * 9000)}`,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProductId(product.id);
    const { id, ...rest } = product;
    setFormData(rest);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the catalog?`)) {
      deleteProduct(id);
      addToast(`Product "${name}" deleted from catalog.`, 'info');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProductId) {
      updateProduct(editingProductId, formData);
      addToast(`Product "${formData.name}" updated successfully.`, 'success');
    } else {
      addProduct(formData);
      addToast(`New product "${formData.name}" published to catalog.`, 'success');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C8275]">
            Catalog Management
          </p>
          <h1 className="font-serif text-3xl text-[#1A1A1A] font-light">
            Garment Inventory ({products.length})
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#1A1A1A] text-white px-5 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Garment
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#E5E0D8] p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, SKU, or fiber..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#E5E0D8] pl-10 pr-4 py-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] shrink-0">
            Category:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-1.5 text-xs font-mono text-[#1A1A1A]"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E5E0D8] text-[#8C8275] uppercase text-[10px]">
                <th className="p-4">Garment</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category / Fiber</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Badge</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-14 object-cover border border-[#E5E0D8]"
                      />
                      <div>
                        <p className="font-serif text-sm font-medium text-[#1A1A1A]">{p.name}</p>
                        <p className="text-[10px] text-[#8C8275]">{p.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[#5A534A]">{p.sku}</td>
                  <td className="p-4">
                    <p className="text-[#1A1A1A]">{p.category}</p>
                    <p className="text-[10px] text-[#8C8275]">{p.material}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-[#1A1A1A]">{formatPrice(p.price)}</p>
                    {p.compare_at_price && p.compare_at_price > p.price && (
                      <p className="line-through text-[10px] text-[#8C8275]">
                        {formatPrice(p.compare_at_price)}
                      </p>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-mono ${
                        p.stock_quantity <= 5
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {p.stock_quantity} in stock
                    </span>
                  </td>
                  <td className="p-4">
                    {p.badge && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#FAF8F5] border border-[#E5E0D8] text-[#1A1A1A]">
                        {p.badge}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-[#5A534A] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] rounded border border-[#E5E0D8]"
                        title="Edit Garment"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded border border-rose-200"
                        title="Delete Garment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E5E0D8] max-w-3xl w-full p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E0D8] mb-6">
              <h2 className="font-serif text-2xl text-[#1A1A1A] font-light">
                {editingProductId ? 'Edit Atelier Garment' : 'Create New Garment'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#8C8275] hover:text-[#1A1A1A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                    Garment Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sculpted Suri Alpaca Overcoat"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="MA-XXXX"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs font-mono text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs text-[#1A1A1A]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs text-[#1A1A1A]"
                  >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                    Material / Fiber *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="e.g. Suri Alpaca"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                    Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs font-mono text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                    Compare At Price ($ USD)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.compare_at_price || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, compare_at_price: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="Original retail price"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs font-mono text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                    Available Stock *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.stock_quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })
                    }
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs font-mono text-[#1A1A1A]"
                  />
                </div>
              </div>

              {/* Primary Image URL */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                  Primary Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.images[0] || ''}
                  onChange={(e) => {
                    const newImgs = [...formData.images];
                    newImgs[0] = e.target.value;
                    setFormData({ ...formData, images: newImgs });
                  }}
                  placeholder="https://..."
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs font-mono text-[#1A1A1A]"
                />
              </div>

              {/* Editorial Description */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                  Editorial Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.editorialDescription}
                  onChange={(e) => setFormData({ ...formData, editorialDescription: e.target.value })}
                  placeholder="Describe the silhouette, proportions, and tailoring..."
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs text-[#1A1A1A]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E0D8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-[#E5E0D8] px-5 py-2.5 text-xs font-mono uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1A1A1A] text-white px-8 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-black"
                >
                  {editingProductId ? 'Update Garment' : 'Publish to Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
