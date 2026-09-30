import React, { useState } from 'react';
import { Users, Search, Mail, Phone, MapPin, Shield, Eye, ArrowRight } from 'lucide-react';
import { DEMO_USERS } from '../../data/atelierData';
import { useShop } from '../../context/ShopContext';
import { UserProfile } from '../../types';

export const AdminCustomersPage: React.FC = () => {
  const { orders, formatPrice } = useShop();
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const filteredUsers = DEMO_USERS.filter((u) =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C8275]">
          Clientele Management
        </p>
        <h1 className="font-serif text-3xl text-[#1A1A1A] font-light">
          Patron Directory ({DEMO_USERS.length})
        </h1>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-[#E5E0D8] p-4 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search patron by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#E5E0D8] pl-10 pr-4 py-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E5E0D8] text-[#8C8275] uppercase text-[10px]">
                <th className="p-4">Patron Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Role</th>
                <th className="p-4">Delivery Addresses</th>
                <th className="p-4">Measurements</th>
                <th className="p-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-4 font-serif font-medium text-sm text-[#1A1A1A]">
                    {u.fullName}
                  </td>
                  <td className="p-4 text-[#5A534A]">{u.email}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[9px] uppercase tracking-widest ${
                        u.role === 'admin'
                          ? 'bg-[#1A1A1A] text-white'
                          : 'bg-[#FAF8F5] border border-[#E5E0D8] text-[#1A1A1A]'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-[#5A534A]">
                    {(u.addresses || []).length > 0 ? (
                      <span>{u.addresses?.[0].city}, {u.addresses?.[0].country}</span>
                    ) : (
                      <span className="text-[#8C8275]">None registered</span>
                    )}
                  </td>
                  <td className="p-4 text-[#8C8275]">
                    {u.measurements ? (
                      <span>
                        Chest: {u.measurements.chest} • Waist: {u.measurements.waist}
                      </span>
                    ) : (
                      <span>Not calibrated</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedUser(u)}
                      className="border border-[#E5E0D8] px-3 py-1 text-[10px] font-mono uppercase hover:bg-[#FAF8F5]"
                    >
                      Inspect Patron
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patron Dossier Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E0D8] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-start pb-4 border-b border-[#E5E0D8]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8C8275]">Patron Record</span>
                <h3 className="font-serif text-2xl text-[#1A1A1A]">{selectedUser.fullName}</h3>
                <p className="text-xs font-mono text-[#8C8275]">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-xs font-mono uppercase border border-[#E5E0D8] px-3 py-1"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <p className="text-[10px] font-mono uppercase text-[#8C8275] mb-1">Tailoring Sizing Calibration</p>
                {selectedUser.measurements ? (
                  <div className="grid grid-cols-2 gap-2 bg-[#FAF8F5] p-3 border border-[#E5E0D8] font-mono">
                    <p>Height: {selectedUser.measurements.height}</p>
                    <p>Chest: {selectedUser.measurements.chest}</p>
                    <p>Waist: {selectedUser.measurements.waist}</p>
                    <p>Hips: {selectedUser.measurements.hips}</p>
                  </div>
                ) : (
                  <p className="text-[#8C8275]">No measurements on file.</p>
                )}
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase text-[#8C8275] mb-1">Registered Coordinates</p>
                {(selectedUser.addresses || []).map((addr, idx) => (
                  <div key={idx} className="bg-[#FAF8F5] p-3 border border-[#E5E0D8] space-y-1 mb-2">
                    <p className="font-semibold text-[#1A1A1A]">{addr.fullName}</p>
                    <p>{addr.street}</p>
                    <p>{addr.city}, {addr.state} {addr.postalCode} - {addr.country}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
