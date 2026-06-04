import React, { useState, useEffect } from 'react';
import { 
    User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, 
    ShoppingBag, Heart, Settings, LogOut, Camera, Check,
    CreditCard, Truck, Bell, Shield, Moon, Sun, Loader,
    Package, TrendingUp, Award
} from 'lucide-react';

const Account = () => {
    const [user, setUser] = useState({
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Fashion Avenue, New York, NY 10001',
        joinDate: 'March 2024',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);
    const [activeTab, setActiveTab] = useState('profile');
    const [orders, setOrders] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load data
    useEffect(() => {
        loadOrders();
        loadWishlist();
    }, []);

    const loadOrders = () => {
        // Sample orders data
        const sampleOrders = [
            { id: 'ORD-001', date: 'May 15, 2024', total: 89.99, status: 'Delivered', items: 2 },
            { id: 'ORD-002', date: 'May 20, 2024', total: 149.99, status: 'Shipped', items: 1 },
            { id: 'ORD-003', date: 'May 25, 2024', total: 199.99, status: 'Processing', items: 3 },
        ];
        setOrders(sampleOrders);
    };

    const loadWishlist = () => {
        // Sample wishlist data
        const sampleWishlist = [
            { id: 1, title: 'Premium Headphones', price: 99.99, image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' },
            { id: 2, title: 'Smart Watch', price: 199.99, image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg' },
        ];
        setWishlist(sampleWishlist);
    };

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setUser(editedUser);
            setIsEditing(false);
            setLoading(false);
        }, 500);
    };

    const getStatusBadge = (status) => {
        const styles = {
            Delivered: 'bg-emerald-50 text-emerald-700',
            Shipped: 'bg-blue-50 text-blue-700',
            Processing: 'bg-amber-50 text-amber-700'
        };
        return styles[status] || 'bg-gray-50 text-gray-700';
    };

    const stats = [
        { label: 'Total Orders', value: orders.length, icon: Package, color: 'purple' },
        { label: 'Wishlist', value: wishlist.length, icon: Heart, color: 'pink' },
        { label: 'Total Spent', value: `$${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`, icon: CreditCard, color: 'emerald' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        My Account
                    </h1>
                    <p className="text-gray-500">
                        Manage your profile and track your orders
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Sidebar - Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
                            {/* Cover */}
                            <div className="h-24 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                            
                            {/* Avatar */}
                            <div className="px-6 pb-6">
                                <div className="relative -mt-12 mb-4">
                                    <img 
                                        src={user.avatar} 
                                        alt={user.name}
                                        className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                                    />
                                    <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md hover:shadow-lg transition">
                                        <Camera size={14} className="text-gray-600" />
                                    </button>
                                </div>
                                
                                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                                <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                                    <Calendar size={12} />
                                    <span>Joined {user.joinDate}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-px bg-gray-100">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="bg-white p-4 text-center">
                                        <stat.icon size={20} className={`mx-auto mb-1 text-${stat.color}-500`} />
                                        <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-xs text-gray-500">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation */}
                            <div className="p-4 space-y-1">
                                {[
                                    { id: 'profile', icon: User, label: 'Profile' },
                                    { id: 'orders', icon: ShoppingBag, label: 'Orders' },
                                    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
                                    { id: 'settings', icon: Settings, label: 'Settings' },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                            activeTab === item.id
                                                ? 'bg-purple-50 text-purple-700'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <item.icon size={18} />
                                        {item.label}
                                    </button>
                                ))}
                                
                                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all mt-4">
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition"
                                        >
                                            <Edit2 size={16} />
                                            Edit
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSave}
                                                disabled={loading}
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                            >
                                                {loading ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                                                Save
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditedUser(user);
                                                    setIsEditing(false);
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                            >
                                                <X size={16} />
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedUser.name}
                                                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{user.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={editedUser.email}
                                                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{user.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={editedUser.phone}
                                                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{user.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        {isEditing ? (
                                            <textarea
                                                value={editedUser.address}
                                                onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                                                rows="3"
                                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{user.address}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                                
                                {orders.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Package size={48} className="mx-auto text-gray-300 mb-3" />
                                        <p className="text-gray-500">No orders yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {orders.map((order) => (
                                            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                                <div>
                                                    <p className="font-medium text-gray-900">{order.id}</p>
                                                    <p className="text-sm text-gray-500 mt-0.5">{order.date}</p>
                                                    <p className="text-sm text-gray-500 mt-1">{order.items} items</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-semibold text-gray-900">${order.total}</p>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getStatusBadge(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Wishlist Tab */}
                        {activeTab === 'wishlist' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Wishlist</h3>
                                
                                {wishlist.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Heart size={48} className="mx-auto text-gray-300 mb-3" />
                                        <p className="text-gray-500">Your wishlist is empty</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {wishlist.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">{item.title}</p>
                                                    <p className="text-purple-600 font-semibold mt-1">${item.price}</p>
                                                </div>
                                                <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Bell size={20} className="text-gray-600" />
                                            <span className="text-gray-900">Email Notifications</span>
                                        </div>
                                        <button className="w-11 h-6 bg-purple-600 rounded-full relative">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Shield size={20} className="text-gray-600" />
                                            <span className="text-gray-900">Two-Factor Authentication</span>
                                        </div>
                                        <button className="w-11 h-6 bg-gray-300 rounded-full relative">
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </button>
                                    </div>

                                    <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;