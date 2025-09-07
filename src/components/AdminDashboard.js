"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "@/lib/auth";
import { Home, Users, Film, Settings, LogOut, Plus, Trash2, Moon, Sun, Star, Zap, Globe, Shield, Menu, X } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;;

export default function AdminDashboard() {
  const [token, setToken] = useState(null);
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [animeName, setAnimeName] = useState("");
  const [animeSynopsis, setAnimeSynopsis] = useState("");
  const [animeSeasons, setAnimeSeasons] = useState(1);
  const [posterUrl, setPosterUrl] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [animeList, setAnimeList] = useState([]);

  // Users management
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userForm, setUserForm] = useState({ username: "", email: "", roles: [] });
  const allRoles = ["USER", "ADMIN"]; // adjust if you have more roles

  // Load token and genres on mount
  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;
    setToken(jwt);

    axios
      .get(`${API_URL}/genres`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => setGenres(res.data))
      .catch((err) => console.error("Failed to fetch genres:", err));
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchAnime();
    fetchUsers();
  }, [token]);

  // ==================== Anime Functions ====================
  const fetchAnime = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/anime`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnimeList(res.data);
    } catch (err) {
      console.error("Failed to fetch anime:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGenre = async () => {
    if (!newGenre || !token) return;
    try {
      const res = await axios.post(
        `${API_URL}/genres`,
        { name: newGenre },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGenres([...genres, res.data]);
      setNewGenre("");
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 backdrop-blur-xl border border-emerald-400/30 animate-pulse';
      notification.innerHTML = '<div class="flex items-center gap-3"><div class="w-2 h-2 bg-white rounded-full animate-ping"></div>Genre added successfully!</div>';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (err) {
      console.error("Failed to add genre:", err);
    }
  };

  const handleGenreToggle = (id) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  const handleAddAnime = async () => {
    if (!animeName || !animeSynopsis || selectedGenres.length === 0 || !posterUrl || !token) {
      alert("Please fill all fields and select at least one genre.");
      return;
    }
    try {
      setIsLoading(true);
      await axios.post(
        `${API_URL}/anime`,
        {
          name: animeName,
          synopsis: animeSynopsis,
          numberOfSeasons: animeSeasons,
          posterUrl,
          genreIds: selectedGenres,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnimeName("");
      setAnimeSynopsis("");
      setAnimeSeasons(1);
      setPosterUrl("");
      setSelectedGenres([]);
      fetchAnime();
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 backdrop-blur-xl border border-purple-400/30 animate-pulse';
      notification.innerHTML = '<div class="flex items-center gap-3"><div class="w-2 h-2 bg-white rounded-full animate-ping"></div>Anime added successfully!</div>';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (err) {
      console.error("Failed to add anime:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAnime = async (id) => {
    if (!token) return;
    if (!confirm("Delete this anime?")) return;
    try {
      setIsLoading(true);
      await axios.delete(`${API_URL}/anime/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAnime();
    } catch (err) {
      console.error("Failed to delete anime:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== Users Functions ====================
  const fetchUsers = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!token) return;
    if (!confirm("Delete this user?")) return;
    try {
      await axios.delete(`${API_URL}/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    setUserForm({ username: user.username, email: user.email, roles: user.roles });
  };

  const handleRoleToggle = (role) => {
    if (userForm.roles.includes(role)) {
      setUserForm({ ...userForm, roles: userForm.roles.filter((r) => r !== role) });
    } else {
      setUserForm({ ...userForm, roles: [...userForm.roles, role] });
    }
  };

  const handleSaveUser = async (id) => {
    if (!token) return;
    try {
      await axios.put(`${API_URL}/admin/users/${id}`, userForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleUserFormChange = (field, value) => {
    setUserForm({ ...userForm, [field]: value });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const themeClasses = darkMode ? 'dark' : '';

  return (
    <div className={`${themeClasses}`}>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:fixed top-0 left-0 h-full z-50 lg:z-30
          w-80 lg:w-80 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
          transition-transform duration-300 ease-in-out
          bg-black/40 backdrop-blur-2xl border-r border-cyan-500/20 shadow-2xl
        `}>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-r-3xl"></div>
          
          <div className="relative z-10 p-4 lg:p-8 h-full overflow-y-auto">
            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 rounded-xl bg-black/30 text-white hover:bg-black/50 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-8 lg:mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Zap className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                   ANISHIN
                  </h1>
                  <p className="text-cyan-300/70 text-sm font-medium">Admin Portal</p>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
            </div>
            
            <nav className="space-y-3 mb-6">
              <a
                href="#"
                className="flex items-center gap-4 px-4 lg:px-6 py-3 lg:py-4 rounded-2xl transition-all duration-500 group transform hover:scale-105 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10 backdrop-blur-xl"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Home size={18} />
                </div>
                <span className="font-bold text-base lg:text-lg">Dashboard</span>
                <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </a>
              
              <a
                href="#users"
                className="flex items-center gap-4 px-4 lg:px-6 py-3 lg:py-4 rounded-2xl transition-all duration-500 group transform hover:scale-105 text-slate-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10 hover:text-white hover:border hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 hover:backdrop-blur-xl"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:scale-110 transition-all duration-300">
                  <Users size={18} />
                </div>
                <span className="font-bold text-base lg:text-lg">Users</span>
              </a>
              
              <a
                href="#anime"
                className="flex items-center gap-4 px-4 lg:px-6 py-3 lg:py-4 rounded-2xl transition-all duration-500 group transform hover:scale-105 text-slate-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-pink-500/10 hover:to-rose-500/10 hover:text-white hover:border hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 hover:backdrop-blur-xl"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:scale-110 transition-all duration-300">
                  <Film size={18} />
                </div>
                <span className="font-bold text-base lg:text-lg">Anime</span>
              </a>
            </nav>

            {/* Stats Cards */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <Globe className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-cyan-300 text-sm font-medium">Total Anime</p>
                    <p className="text-white text-xl lg:text-2xl font-black">{animeList.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <Shield className="text-purple-400" size={20} />
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Total Users</p>
                    <p className="text-white text-xl lg:text-2xl font-black">{users.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 lg:ml-80">
          {/* Top Navbar */}
          <header className="flex justify-between items-center bg-black/20 backdrop-blur-2xl p-4 lg:p-8 shadow-2xl border-b border-cyan-500/10 sticky top-0 z-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-black/30 text-white hover:bg-black/50 transition-colors"
              >
                <Menu size={24} />
              </button>

              <div>
                <h2 className="text-2xl lg:text-4xl font-black bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                  Command Center
                </h2>
                <p className="text-cyan-300/70 mt-1 lg:mt-2 font-medium text-sm lg:text-base">Control your digital universe</p>
              </div>
            </div>

            <div className="flex items-center gap-3 lg:gap-6 relative z-10">
              <div className="hidden sm:flex items-center gap-2 lg:gap-4 bg-black/30 rounded-2xl px-2 lg:px-4 py-2 border border-cyan-500/20">
                <Star className="text-yellow-400" size={16} />
                <span className="text-white font-medium text-sm lg:text-base">Online</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 lg:p-4 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 hover:from-slate-700/50 hover:to-slate-600/50 border border-slate-600/30 hover:border-cyan-500/30 transition-all duration-500 transform hover:scale-110 backdrop-blur-xl shadow-lg hover:shadow-cyan-500/20"
              >
                {darkMode ? 
                  <Sun size={20} className="text-yellow-400" /> : 
                  <Moon size={20} className="text-slate-300" />
                }
              </button>
            </div>
          </header>

          {/* Content */}
          <main className="p-4 lg:p-8 space-y-6 lg:space-y-8 relative">
            {/* ==================== Users Management ==================== */}
            <div id="users" className="bg-black/20 backdrop-blur-2xl rounded-2xl lg:rounded-3xl shadow-2xl p-4 lg:p-8 border border-blue-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 lg:mb-8">
                  <div className="p-2 lg:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/25">
                    <Users size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-black text-white">User Matrix</h3>
                    <p className="text-blue-300/70 text-sm lg:text-base">Manage system users</p>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center items-center py-12 lg:py-20">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 lg:h-16 lg:w-16 border-t-2 border-b-2 border-cyan-500"></div>
                      <div className="animate-spin rounded-full h-12 w-12 lg:h-16 lg:w-16 border-l-2 border-r-2 border-purple-500 absolute top-0 left-0 animate-reverse-spin"></div>
                    </div>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-12 lg:py-16">
                    <Users size={48} className="mx-auto text-slate-500 mb-4" />
                    <p className="text-slate-400 text-lg lg:text-xl font-medium">No users in the matrix</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 backdrop-blur-xl border border-slate-600/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-[1.02]">
                        {editingUserId === user.id ? (
                          <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <input
                                type="text"
                                value={userForm.username}
                                onChange={(e) => handleUserFormChange("username", e.target.value)}
                                className="p-3 lg:p-4 bg-black/30 border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-300"
                              />
                              <input
                                type="email"
                                value={userForm.email}
                                onChange={(e) => handleUserFormChange("email", e.target.value)}
                                className="p-3 lg:p-4 bg-black/30 border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-300"
                              />
                            </div>
                            
                            <div className="flex gap-3 flex-wrap">
                              {allRoles.map((role) => (
                                <label key={role} className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-xl border border-slate-600/30">
                                  <input
                                    type="checkbox"
                                    checked={userForm.roles.includes(role)}
                                    onChange={() => handleRoleToggle(role)}
                                    className="w-4 h-4 text-cyan-500 bg-black/50 border-cyan-500/30 rounded focus:ring-cyan-500/20"
                                  />
                                  <span className="text-white font-medium">{role}</span>
                                </label>
                              ))}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                              <button
                                onClick={() => handleSaveUser(user.id)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 font-bold"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingUserId(null)}
                                className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-xl hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-300 font-bold"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-base lg:text-lg">
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-lg lg:text-xl text-white">{user.username}</p>
                                <p className="text-cyan-300/70 text-sm lg:text-base">{user.email}</p>
                                <div className="flex gap-2 mt-2">
                                  {user.roles.map((role, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 lg:px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold rounded-full"
                                    >
                                      {role}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Add Genre */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl lg:rounded-3xl shadow-2xl p-4 lg:p-8 border border-emerald-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 lg:mb-8">
                  <div className="p-2 lg:p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg shadow-emerald-500/25">
                    <Plus size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-black text-white">Genre Generator</h3>
                    <p className="text-emerald-300/70 text-sm lg:text-base">Create new categories</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Enter genre name..."
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="flex-1 p-4 lg:p-6 bg-black/30 border-2 border-emerald-500/30 rounded-xl lg:rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all duration-300 text-white placeholder-slate-400 text-base lg:text-lg font-medium backdrop-blur-xl"
                  />
                  <button
                    onClick={handleAddGenre}
                    className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 lg:px-10 py-4 lg:py-6 rounded-xl lg:rounded-2xl hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/25 font-black text-base lg:text-lg backdrop-blur-xl border border-emerald-400/30"
                  >
                    Deploy Genre
                  </button>
                </div>
              </div>
            </div>

            {/* Add Anime */}
            <div id="anime" className="bg-black/20 backdrop-blur-2xl rounded-2xl lg:rounded-3xl shadow-2xl p-4 lg:p-8 border border-purple-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 lg:mb-8">
                  <div className="p-2 lg:p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-purple-500/25">
                    <Film size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-black text-white">Anime Constructor</h3>
                    <p className="text-purple-300/70 text-sm lg:text-base">Build your anime universe</p>
                  </div>
                </div>
                
                <div className="grid gap-4 lg:gap-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    <input
                      type="text"
                      placeholder="Anime Name"
                      value={animeName}
                      onChange={(e) => setAnimeName(e.target.value)}
                      className="p-4 lg:p-6 bg-black/30 border-2 border-purple-500/30 rounded-xl lg:rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 text-white placeholder-slate-400 text-base lg:text-lg font-medium backdrop-blur-xl"
                    />
                    <input
                      type="number"
                      min={1}
                      placeholder="Number of Seasons"
                      value={animeSeasons}
                      onChange={(e) => setAnimeSeasons(parseInt(e.target.value))}
                      className="p-4 lg:p-6 bg-black/30 border-2 border-purple-500/30 rounded-xl lg:rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 text-white placeholder-slate-400 text-base lg:text-lg font-medium backdrop-blur-xl"
                    />
                  </div>
                  
                  <textarea
                    placeholder="Anime Synopsis"
                    value={animeSynopsis}
                    onChange={(e) => setAnimeSynopsis(e.target.value)}
                    className="p-4 lg:p-6 bg-black/30 border-2 border-purple-500/30 rounded-xl lg:rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 text-white placeholder-slate-400 text-base lg:text-lg font-medium backdrop-blur-xl resize-none"
                    rows={4}
                  />
                  
                  <input
                    type="text"
                    placeholder="Poster URL"
                    value={posterUrl}
                    onChange={(e) => setPosterUrl(e.target.value)}
                    className="p-4 lg:p-6 bg-black/30 border-2 border-purple-500/30 rounded-xl lg:rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 text-white placeholder-slate-400 text-base lg:text-lg font-medium backdrop-blur-xl"
                  />

                  <div>
                    <h4 className="font-bold mb-4 lg:mb-6 text-white text-lg lg:text-xl">Select Genres</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-3 lg:gap-4">
                      {genres.map((g) => (
                        <label
                          key={g.id}
                          className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 backdrop-blur-xl text-sm lg:text-base ${
                            selectedGenres.includes(g.id)
                              ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-400/50 text-white shadow-lg shadow-purple-500/25'
                              : 'bg-black/30 border-2 border-slate-600/30 text-slate-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-500/30 hover:text-white'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedGenres.includes(g.id)}
                            onChange={() => handleGenreToggle(g.id)}
                            className="hidden"
                          />
                          <div className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-300 ${
                            selectedGenres.includes(g.id) 
                              ? 'bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-400/50' 
                              : 'border-2 border-slate-500'
                          }`}></div>
                          <span className="font-bold">{g.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleAddAnime}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white px-8 lg:px-12 py-4 lg:py-6 rounded-xl lg:rounded-2xl hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-purple-500/25 font-black text-base lg:text-xl disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-xl border border-purple-400/30"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 lg:h-6 lg:w-6 border-b-2 border-white"></div>
                        Constructing Anime...
                      </div>
                    ) : (
                      'Deploy Anime'
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Anime List */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl lg:rounded-3xl shadow-2xl p-4 lg:p-8 border border-cyan-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 lg:mb-8">
                  <div className="p-2 lg:p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/25">
                    <Film size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-black text-white">Anime Arsenal</h3>
                    <p className="text-cyan-300/70 text-sm lg:text-base">Your complete collection</p>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center items-center py-12 lg:py-20">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-16 w-16 lg:h-20 lg:w-20 border-t-4 border-b-4 border-cyan-500"></div>
                      <div className="animate-spin rounded-full h-16 w-16 lg:h-20 lg:w-20 border-l-4 border-r-4 border-purple-500 absolute top-0 left-0" style={{animationDirection: 'reverse'}}></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Zap className="text-white animate-pulse" size={24} />
                      </div>
                    </div>
                  </div>
                ) : animeList.length === 0 ? (
                  <div className="text-center py-12 lg:py-20">
                    <div className="relative mb-8">
                      <Film size={60} className="mx-auto text-slate-500" />
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-slate-400 text-xl lg:text-2xl font-bold mb-2">Arsenal Empty</p>
                    <p className="text-slate-500">Deploy your first anime to begin</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
                    {animeList.map((a) => (
                      <div
                        key={a.id}
                        className="bg-gradient-to-br from-black/40 to-slate-900/40 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 overflow-hidden transform hover:scale-105 border border-slate-700/50 hover:border-cyan-500/30 group relative"
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl lg:rounded-3xl"></div>
                        
                        <div className="relative">
                          {a.posterUrl && (
                            <div className="relative overflow-hidden rounded-t-2xl lg:rounded-t-3xl">
                              <img
                                src={a.posterUrl}
                                alt={a.name}
                                className="w-full h-40 sm:h-48 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              
                              {/* Floating badge */}
                              <div className="absolute top-3 left-3 lg:top-4 lg:left-4">
                                <div className="bg-gradient-to-r from-cyan-500/90 to-purple-500/90 backdrop-blur-xl px-2 lg:px-3 py-1 rounded-full text-white text-xs lg:text-sm font-bold border border-cyan-400/30">
                                  Season {a.numberOfSeasons}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div className="p-4 lg:p-6 space-y-3 lg:space-y-4 relative z-10">
                            <h4 className="font-black text-lg lg:text-2xl text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-1">
                              {a.name}
                            </h4>
                            <p className="text-slate-400 group-hover:text-slate-300 line-clamp-3 leading-relaxed text-sm">
                              {a.synopsis}
                            </p>
                            
                            <div className="flex flex-wrap gap-1 lg:gap-2">
                              {a.genres.slice(0, 2).map((genre, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 lg:px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold rounded-full backdrop-blur-xl"
                                >
                                  {genre}
                                </span>
                              ))}
                              {a.genres.length > 2 && (
                                <span className="px-2 lg:px-3 py-1 bg-gradient-to-r from-slate-600/20 to-slate-700/20 border border-slate-500/30 text-slate-400 text-xs font-bold rounded-full">
                                  +{a.genres.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}