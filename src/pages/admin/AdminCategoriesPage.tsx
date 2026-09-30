import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Layers, Check, X, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CategoryInfo } from '../../types';

export const AdminCategoriesPage: React.FC = () => {
  const { categories, products, addToast } = useShop();

  const [categoryList, setCategoryList] = useState<CategoryInfo[]>(categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
  });

  const handleOpenAdd = () => {
    setEditingCatId(null);
    setForm({
      name: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryInfo) => {
    setEditingCatId(cat.id);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete category "${name}"?`)) {
      setCategoryList(categoryList.filter((c) => c.id !== id));
      addToast(`Category "${name}" removed.`, 'info');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCatId) {
      setCategoryList(
        categoryList.map((c) =>
          c.id === editingCatId
            ? { ...c, ...form, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-') }
            : c
        )
      );
      addToast('Category updated.', 'success');
    } else {
      const newCat: CategoryInfo = {
        id: `cat-${Date.now()}`,
        name: form.name,
        slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
        description: form.description,
        image: form.image,
        itemCount: 0,
      };
      setCategoryList([...categoryList, newCat]);
      addToast(`Category "${form.name}" created.`, 'success');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C8275]">
            Store Taxonomy
          </p>
          <h1 className="font-serif text-3xl text-[#1A1A1A] font-light">
            Categories & Collections ({categoryList.length})
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#1A1A1A] text-white px-5 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryList.map((cat) => {
          const count = products.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
          return (
            <div key={cat.id} className="bg-white border border-[#E5E0D8] overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative bg-[#FAF8F5]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-black/75 text-white text-[10px] font-mono px-2 py-0.5 uppercase tracking-widest">
                    {count} Products
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-xl text-[#1A1A1A] font-light">{cat.name}</h3>
                  <p className="text-[11px] font-mono text-[#8C8275]">Slug: /category/{cat.slug}</p>
                  <p className="text-xs text-[#5A534A] font-light line-clamp-2">{cat.description}</p>
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F5] border-t border-[#E5E0D8] flex justify-between items-center">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="text-xs font-mono uppercase text-[#1A1A1A] hover:underline flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="text-xs font-mono uppercase text-rose-700 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E0D8] max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-[#E5E0D8] mb-4">
              <h3 className="font-serif text-xl text-[#1A1A1A]">
                {editingCatId ? 'Edit Category' : 'New Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Evening Wear"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="evening-wear"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs font-mono text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs font-mono text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                  Editorial Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs text-[#1A1A1A]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E0D8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-[#E5E0D8] px-4 py-2 text-xs font-mono uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1A1A1A] text-white px-6 py-2 text-xs font-mono uppercase tracking-widest"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
