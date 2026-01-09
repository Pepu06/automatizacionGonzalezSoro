"use client";

import Link from "next/link";

export default function DashboardButton() {
  return (
    <Link
      href="/dashboard"
      className="fixed top-4 left-4 bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors shadow-lg font-medium text-md z-50"
    >
      Resumen Anual
    </Link>
  );
}
