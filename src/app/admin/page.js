"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AdminDashboard from "@/components/AdminDashboard"; // move the large dashboard component to a separate file

export default function AdminPage() {
  return (
    <ProtectedRoute role="ADMIN">
      <AdminDashboard />
    </ProtectedRoute>
  );
}
