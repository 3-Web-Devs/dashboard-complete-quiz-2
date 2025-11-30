import React, { useEffect, useState } from "react";
import { 
    FileText, Clock, Users, BarChart3, Upload, FileUp, Settings, 
    Edit, Trash2, Download, Plus, Search, Filter 
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingDoc, setEditingDoc] = useState(null);
    const [deleteDoc, setDeleteDoc] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // New document form state
    const [newDocument, setNewDocument] = useState({
        filename: "",
        originalFormat: "",
        convertedFormat: "",
        fileSize: ""
    });

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // Fetch dashboard data
    const fetchDashboardData = async () => {
        const token = localStorage.getItem("token");
        if (!token) return logout();

        try {
            const res = await fetch("http://localhost:5000/api/dashboard", {
                headers: { "auth-token": token },
            });
            const data = await res.json();
            if (!data.success) return logout();
            
            setDashboardData(data);
            setDocuments(data.documents || []);
            setUser(data.user);
        } catch (error) {
            console.error("Error fetching dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [navigate]);

    // Create new document
    const handleCreateDocument = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        
        try {
            const res = await fetch("http://localhost:5000/api/dashboard/documents", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "auth-token": token 
                },
                body: JSON.stringify(newDocument),
            });
            
            const data = await res.json();
            if (data.success) {
                setShowAddModal(false);
                setNewDocument({ filename: "", originalFormat: "", convertedFormat: "", fileSize: "" });
                fetchDashboardData(); // Refresh data
            }
        } catch (error) {
            console.error("Error creating document:", error);
        }
    };

    // Update document
    const handleUpdateDocument = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        
        try {
            const res = await fetch(`http://localhost:5000/api/dashboard/documents/${editingDoc._id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "auth-token": token 
                },
                body: JSON.stringify(editingDoc),
            });
            
            const data = await res.json();
            if (data.success) {
                setEditingDoc(null);
                fetchDashboardData(); // Refresh data
            }
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    // Delete document
    const handleDeleteDocument = async () => {
        const token = localStorage.getItem("token");
        
        try {
            const res = await fetch(`http://localhost:5000/api/dashboard/documents/${deleteDoc._id}`, {
                method: "DELETE",
                headers: { "auth-token": token },
            });
            
            const data = await res.json();
            if (data.success) {
                setDeleteDoc(null);
                fetchDashboardData(); // Refresh data
            }
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    // Filter documents based on search
    const filteredDocuments = documents.filter(doc =>
        doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.convertedFormat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
    if (!user) return <p className="p-8">Loading...</p>;

    return (
        <div className="bg-[#F7F3EE] min-h-screen text-[#3C2F2F]">
            {/* Header */}
            <header className="bg-[#c5a690] text-white p-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="w-6 h-6" /> Dashboard
                </h1>
                <div className="flex items-center gap-4">
                    <p>Hello, <strong>{user.name}</strong></p>
                    <button onClick={logout} className="bg-[#A88734] px-4 py-2 rounded-lg hover:bg-[#8B5E3C] transition">
                        Logout
                    </button>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto py-10 px-6 space-y-16">
                {/* Stats Overview */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-start hover:shadow-md transition">
                        <FileText className="w-8 h-8 text-[#A88734] mb-3" />
                        <h3 className="text-lg font-semibold">Total Conversions</h3>
                        <p className="text-3xl font-bold mt-1">{dashboardData?.stats?.totalConversions || 0}</p>
                        <p className="text-sm text-gray-500 mt-1">All-time conversions</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-start hover:shadow-md transition">
                        <BarChart3 className="w-8 h-8 text-[#A88734] mb-3" />
                        <h3 className="text-lg font-semibold">Completed</h3>
                        <p className="text-3xl font-bold mt-1">{dashboardData?.stats?.completedConversions || 0}</p>
                        <p className="text-sm text-gray-500 mt-1">Successful conversions</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-start hover:shadow-md transition">
                        <Clock className="w-8 h-8 text-[#A88734] mb-3" />
                        <h3 className="text-lg font-semibold">Pending</h3>
                        <p className="text-3xl font-bold mt-1">{dashboardData?.stats?.pendingConversions || 0}</p>
                        <p className="text-sm text-gray-500 mt-1">In progress</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-start hover:shadow-md transition">
                        <Users className="w-8 h-8 text-[#A88734] mb-3" />
                        <h3 className="text-lg font-semibold">Storage</h3>
                        <p className="text-3xl font-bold mt-1">{dashboardData?.storageUsage || 0}%</p>
                        <p className="text-sm text-gray-500 mt-1">Usage</p>
                    </div>
                </section>

                {/* Documents Management Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-[#6F4E37] flex items-center gap-2">
                            <FileText className="w-6 h-6" /> My Documents
                        </h2>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search documents..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88734] focus:border-transparent"
                                />
                            </div>
                            
                            {/* Add New Document Button */}
                            <button 
                                onClick={() => setShowAddModal(true)}
                                className="bg-[#A88734] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#8B5E3C] flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" /> Add Document
                            </button>
                        </div>
                    </div>

                    {/* Documents Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4">Filename</th>
                                    <th className="text-left py-3 px-4">Original Format</th>
                                    <th className="text-left py-3 px-4">Converted To</th>
                                    <th className="text-left py-3 px-4">Size</th>
                                    <th className="text-left py-3 px-4">Date</th>
                                    <th className="text-left py-3 px-4">Status</th>
                                    <th className="text-left py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDocuments.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-8 text-gray-500">
                                            No documents found. {searchTerm && "Try a different search term."}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDocuments.map((doc) => (
                                        <tr key={doc._id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 font-medium">{doc.filename}</td>
                                            <td className="py-3 px-4 text-sm">{doc.originalFormat}</td>
                                            <td className="py-3 px-4 text-sm">{doc.convertedFormat}</td>
                                            <td className="py-3 px-4 text-sm">{doc.fileSize} KB</td>
                                            <td className="py-3 px-4 text-sm">
                                                {new Date(doc.conversionDate).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    doc.status === 'completed' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : doc.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {doc.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setEditingDoc({...doc})}
                                                        className="p-1 text-blue-600 hover:text-blue-800 transition"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteDoc(doc)}
                                                        className="p-1 text-red-600 hover:text-red-800 transition"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-1 text-green-600 hover:text-green-800 transition"
                                                        title="Download"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                    <h2 className="text-2xl font-bold mb-6 text-[#6F4E37] flex items-center gap-2">
                        <Upload className="w-6 h-6" /> Quick Actions
                    </h2>
                    <div className="flex flex-wrap gap-6">
                        <Link to="/uploadfile" className="bg-[#A88734] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8B5E3C] flex items-center gap-2">
                            <FileUp className="w-5 h-5" /> Convert File
                        </Link>
                        <button className="bg-[#6F4E37] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5C3E2E] flex items-center gap-2">
                            <Upload className="w-5 h-5" /> Upload New
                        </button>
                        <button className="bg-[#382110] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A1810] flex items-center gap-2">
                            <Settings className="w-5 h-5" /> Export Report
                        </button>
                    </div>
                </section>

                {/* Profile Overview */}
                <section className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                    <h2 className="text-2xl font-bold mb-6 text-[#6F4E37] flex items-center gap-2">
                        <Settings className="w-6 h-6" /> Profile Overview
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-2">Profile</h3>
                            <p className="text-sm text-gray-600">Name: <strong>{user.name}</strong></p>
                            <p className="text-sm text-gray-600">Email: <strong>{user.email}</strong></p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Account Stats</h3>
                            <p className="text-sm text-gray-600">Member since: <strong>
                                {new Date(user.date).toLocaleDateString()}
                            </strong></p>
                            <p className="text-sm text-gray-600">Total conversions: <strong>
                                {dashboardData?.stats?.totalConversions || 0}
                            </strong></p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Add Document Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md">
                        <h3 className="text-2xl font-bold mb-6 text-[#6F4E37]">Add New Document</h3>
                        <form onSubmit={handleCreateDocument} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Filename"
                                value={newDocument.filename}
                                onChange={(e) => setNewDocument({...newDocument, filename: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88734]"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Original Format (e.g., PDF)"
                                value={newDocument.originalFormat}
                                onChange={(e) => setNewDocument({...newDocument, originalFormat: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88734]"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Converted Format (e.g., DOCX)"
                                value={newDocument.convertedFormat}
                                onChange={(e) => setNewDocument({...newDocument, convertedFormat: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88734]"
                                required
                            />
                            <input
                                type="number"
                                placeholder="File Size (KB)"
                                value={newDocument.fileSize}
                                onChange={(e) => setNewDocument({...newDocument, fileSize: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88734]"
                                required
                            />
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#A88734] text-white py-3 rounded-lg font-semibold hover:bg-[#8B5E3C] transition"
                                >
                                    Add Document
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Document Modal */}
            {editingDoc && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md">
                        <h3 className="text-2xl font-bold mb-6 text-[#6F4E37]">Edit Document</h3>
                        <form onSubmit={handleUpdateDocument} className="space-y-4">
                            <input
                                type="text"
                                value={editingDoc.filename}
                                onChange={(e) => setEditingDoc({...editingDoc, filename: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88734]"
                            />
                            <input
                                type="text"
                                value={editingDoc.convertedFormat}
                                onChange={(e) => setEditingDoc({...editingDoc, convertedFormat: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88734]"
                            />
                            <select
                                value={editingDoc.status}
                                onChange={(e) => setEditingDoc({...editingDoc, status: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A88734]"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                            </select>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#A88734] text-white py-3 rounded-lg font-semibold hover:bg-[#8B5E3C] transition"
                                >
                                    Update Document
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingDoc(null)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteDoc && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md">
                        <h3 className="text-2xl font-bold mb-4 text-[#6F4E37]">Delete Document</h3>
                        <p className="mb-6 text-gray-600">
                            Are you sure you want to delete "<strong>{deleteDoc.filename}</strong>"? This action cannot be undone.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={handleDeleteDocument}
                                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setDeleteDoc(null)}
                                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}