import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { UserProfile } from '../../types';

export const AdminCustomersPage: React.FC = () => {
  const [patrons, setPatrons] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchPatrons = async () => {
      setIsLoading(true);
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

          if (!error && data) {
            const mapped: UserProfile[] = data.map((p) => ({
              id: p.id,
              fullName: p.full_name || 'Valued Client',
              email: p.email || '',
              phone: p.phone || '',
              role: p.role === 'admin' ? 'admin' : 'customer',
              tier: p.tier || 'Atelier Patron',
              joinedDate: p.created_at ? new Date(p.created_at).toLocaleDateString() : 'Recent',
            }));
            setPatrons(mapped);
          }
        } catch (err) {
          console.warn('Error fetching patrons from Supabase:', err);
        }
      }
      setIsLoading(false);
    };

    fetchPatrons();
  }, []);

  const filteredUsers = patrons.filter((u) =>
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
          Patron Directory ({patrons.length})
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
        {isLoading ? (
          <div className="p-12 text-center text-xs font-mono text-[#8C8275] flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading registered patrons from Supabase...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-[#8C8275]">
            No patrons found matching query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E5E0D8] text-[#8C8275] uppercase text-[10px]">
                  <th className="p-4">Patron Name</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Member Since</th>
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
                      {u.phone || <span className="text-[#8C8275]">None registered</span>}
                    </td>
                    <td className="p-4 text-[#8C8275]">
                      {u.joinedDate || 'Recent'}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="border border-[#E5E0D8] px-3 py-1 text-[10px] font-mono uppercase hover:bg-[#FAF8F5] cursor-pointer"
                      >
                        Inspect Patron
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
                className="text-xs font-mono uppercase border border-[#E5E0D8] px-3 py-1 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="bg-[#FAF8F5] p-3 border border-[#E5E0D8] space-y-2">
                <p><span className="text-[#8C8275]">Patron ID:</span> {selectedUser.id}</p>
                <p><span className="text-[#8C8275]">Assigned Role:</span> {selectedUser.role}</p>
                <p><span className="text-[#8C8275]">Telephone:</span> {selectedUser.phone || 'None'}</p>
                <p><span className="text-[#8C8275]">Tier:</span> {selectedUser.tier || 'Atelier Patron'}</p>
                <p><span className="text-[#8C8275]">Registered:</span> {selectedUser.joinedDate || 'Recent'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
