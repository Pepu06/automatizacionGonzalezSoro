"use client";

import Link from "next/link";

export default function DashboardButton() {
  return (
    <Link
      href="/dashboard"
      className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium border border-gray-200 group"
    >
      Resumen Anual
    </Link>
  );
}
