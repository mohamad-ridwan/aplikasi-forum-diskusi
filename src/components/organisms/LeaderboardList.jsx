import React from 'react';
import { FiAward } from 'react-icons/fi';
import Avatar from '../atoms/Avatar';

function LeaderboardList({ leaderboards = [] }) {
  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span className="w-7 h-7 rounded-full bg-amber-400 text-white font-black text-xs flex items-center justify-center shadow-sm">
          1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="w-7 h-7 rounded-full bg-slate-400 text-white font-black text-xs flex items-center justify-center shadow-sm">
          2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-sm">
          3
        </span>
      );
    }
    return (
      <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center">
        {rank}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-indigo-50/50 to-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">
            <FiAward />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Klasemen Pengguna Aktif</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Anggota komunitas paling berkontribusi dalam diskusi dan tanggapan.
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <span className="flex-1">Pengguna</span>
          <span className="w-20 text-right">Skor Poin</span>
        </div>

        {leaderboards.map((item, index) => (
          <div
            key={item.user.id}
            className={`flex items-center justify-between px-6 py-4 hover:bg-slate-50/70 transition ${
              index === 0 ? 'bg-amber-50/20' : ''
            }`}
          >
            <div className="flex items-center gap-4 min-w-0 flex-1">
              {getRankBadge(index + 1)}
              <Avatar image={item.user.avatar} name={item.user.name} size="md" />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate">
                  {item.user.name}
                </h4>
                <p className="text-xs text-slate-400 truncate">{item.user.email}</p>
              </div>
            </div>

            <div className="w-20 text-right">
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 font-extrabold text-sm rounded-lg border border-indigo-100">
                {item.score}
              </span>
            </div>
          </div>
        ))}

        {leaderboards.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">
            Memuat data klasemen...
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaderboardList;
