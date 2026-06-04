import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Trash2, Minus, Plus, ArrowLeft, CreditCard, 
  Send, CheckCircle, MapPin, Navigation, Locate, X
} from 'lucide-react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    latitude: '11.5796538',
    longitude: '104.7250317'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isPickingLocation, setIsPickingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [mapKey, setMapKey] = useState(Date.now());

  // Telegram Bot Configuration
  const BOT_TOKEN = '8989500899:AAEtfPJqbOl7uhFKRfkUtpk8-xRVC-ZCFX4';
  const CHAT_ID = '1362036331';

  useEffect(() => {
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    if (window.confirm('Remove this item from cart?')) {
      const updatedCart = cart.filter(item => item.id !== productId);
      saveCart(updatedCart);
    }
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      saveCart([]);
    }
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getShipping = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 50 ? 0 : 5.99;
  };

  const getTotal = () => {
    return getSubtotal() + getShipping();
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Get current location
  const getCurrentLocation = () => {
    setLocationError('');
    setIsPickingLocation(true);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsPickingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCustomerInfo({
          ...customerInfo,
          latitude: latitude.toString(),
          longitude: longitude.toString()
        });
        
        fetchAddressFromCoordinates(latitude, longitude);
        setIsPickingLocation(false);
        setShowLocationPicker(false);
      },
      (error) => {
        let errorMessage = '';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Please allow location access to use this feature';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = 'An unknown error occurred';
        }
        setLocationError(errorMessage);
        setIsPickingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const fetchAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.display_name) {
        setCustomerInfo(prev => ({
          ...prev,
          address: data.display_name
        }));
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setLocationError('Could not fetch address from coordinates');
    }
  };

  // Search location by address
  const searchLocation = async (searchQuery) => {
    if (!searchQuery) return;
    
    setIsPickingLocation(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setCustomerInfo({
          ...customerInfo,
          latitude: lat,
          longitude: lon,
          address: display_name
        });
        setLocationError('');
        setShowLocationPicker(false);
      } else {
        setLocationError('Location not found. Please try again.');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      setLocationError('Failed to search location');
    } finally {
      setIsPickingLocation(false);
    }
  };

  // Format cart items for Telegram message
  const formatCartItems = () => {
    let itemsText = '';
    cart.forEach((item, index) => {
      itemsText += `\n${index + 1}. *${item.title.substring(0, 40)}*\n`;
      itemsText += `   📦 Quantity: ${item.quantity}\n`;
      itemsText += `   💰 Price: $${item.price.toFixed(2)}\n`;
      itemsText += `   📊 Subtotal: $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    return itemsText;
  };

  const getGoogleMapsLink = (lat, lng) => {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  const sendToTelegram = async (orderData) => {
    const locationInfo = orderData.customer.latitude && orderData.customer.longitude
      ? `\n📍 *Location:* ${getGoogleMapsLink(orderData.customer.latitude, orderData.customer.longitude)}\n📍 *Coordinates:* ${orderData.customer.latitude}, ${orderData.customer.longitude}`
      : '';

    const message = `
🎉 *NEW ORDER RECEIVED!* 🎉

━━━━━━━━━━━━━━━━━━━━
*👤 CUSTOMER INFORMATION*
━━━━━━━━━━━━━━━━━━━━
*Name:* ${orderData.customer.name}
*Phone:* ${orderData.customer.phone}
*Address:* ${orderData.customer.address}
${locationInfo}
${orderData.customer.note ? `*Note:* ${orderData.customer.note}` : ''}

━━━━━━━━━━━━━━━━━━━━
*🛍️ ORDER DETAILS*
━━━━━━━━━━━━━━━━━━━━
${formatCartItems()}

━━━━━━━━━━━━━━━━━━━━
*💰 PAYMENT SUMMARY*
━━━━━━━━━━━━━━━━━━━━
*Subtotal:* $${orderData.summary.subtotal.toFixed(2)}
*Shipping:* ${orderData.summary.shipping === 0 ? 'FREE' : `$${orderData.summary.shipping.toFixed(2)}`}
*Total:* *$${orderData.summary.total.toFixed(2)}*

━━━━━━━━━━━━━━━━━━━━
*📦 Total Items:* ${orderData.summary.itemCount}
*🕐 Order Time:* ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━

✅ *Order Status:* Pending Confirmation
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      const data = await response.json();
      if (data.ok) {
        if (orderData.customer.latitude && orderData.customer.longitude) {
          await sendLocationToTelegram(
            parseFloat(orderData.customer.latitude),
            parseFloat(orderData.customer.longitude)
          );
        }
        return true;
      } else {
        throw new Error(data.description);
      }
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      throw error;
    }
  };

  const sendLocationToTelegram = async (latitude, longitude) => {
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendLocation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          latitude: latitude,
          longitude: longitude
        })
      });
    } catch (error) {
      console.error('Error sending location:', error);
    }
  };

  const sendProductImages = async () => {
    for (const item of cart) {
      try {
        const imageResponse = await fetch(item.image);
        const blob = await imageResponse.blob();
        const formData = new FormData();
        formData.append('chat_id', CHAT_ID);
        formData.append('photo', blob, 'product.jpg');
        formData.append('caption', `${item.title.substring(0, 50)} - $${item.price} x ${item.quantity}`);

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
          method: 'POST',
          body: formData
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Error sending image:', error);
      }
    }
  };

  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all required fields!');
      return;
    }

    setLoading(true);

    const orderData = {
      customer: customerInfo,
      items: cart,
      summary: {
        subtotal: getSubtotal(),
        shipping: getShipping(),
        total: getTotal(),
        itemCount: getCartItemCount()
      },
      orderId: 'ORD-' + Date.now(),
      orderDate: new Date().toISOString()
    };

    try {
      await sendToTelegram(orderData);
      await sendProductImages();
      
      setOrderPlaced(true);
      
      setTimeout(() => {
        saveCart([]);
        setShowCheckoutModal(false);
        setOrderPlaced(false);
        setCustomerInfo({ name: '', phone: '', address: '', note: '', latitude: '11.5796538', longitude: '104.7250317' });
        alert('🎉 Order placed successfully! Our team will contact you soon.');
      }, 2000);
      
    } catch (error) {
      alert('Failed to place order. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !showCheckoutModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-7xl mb-4 animate-bounce">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
            <Link 
              to="/all-products" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            You have {getCartItemCount()} item{getCartItemCount() !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items - Left Column */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <div className="flex items-center justify-between text-white">
                  <h2 className="font-semibold flex items-center gap-2">
                    <ShoppingBag size={18} />
                    Cart Items
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    Clear All
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-5">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 w-28 h-28 flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 line-clamp-2 pr-4">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 capitalize">
                              {item.category || 'Uncategorized'}
                            </p>
                          </div>
                          <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all hover:scale-105"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-semibold min-w-[32px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all hover:scale-105"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 text-sm"
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                        
                        <div className="mt-3 text-right">
                          <p className="text-sm text-gray-500">
                            Item total: <span className="font-semibold text-gray-700">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <Link to="/all-products" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors">
                  <ArrowLeft size={16} />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <h2 className="font-semibold text-white">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Items ({getCartItemCount()})</span>
                  <span className="font-semibold">${getSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Shipping</span>
                  {getShipping() === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="font-semibold">${getShipping().toFixed(2)}</span>
                  )}
                </div>
                
                {getSubtotal() < 50 && getSubtotal() > 0 && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 text-center">
                      Add ${(50 - getSubtotal()).toFixed(2)} more to get free shipping!
                    </p>
                    <div className="mt-2 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((getSubtotal() / 50) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center mb-6 pt-2">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>
                
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} />
                  Proceed to Checkout
                </button>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center mb-3">Secure payment methods</p>
                  <div className="flex justify-center gap-3">
                    <span className="text-2xl">💳</span>
                    <span className="text-2xl">💵</span>
                    <span className="text-2xl">🏦</span>
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    Your information is sent securely to Telegram
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Complete Your Order</h2>
                <button 
                  onClick={() => setShowCheckoutModal(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {orderPlaced ? (
              <div className="p-8 text-center">
                <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Order Placed!</h3>
                <p className="text-gray-500">
                  Your order has been sent to our team. We'll contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitOrder} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2 mb-2">
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      disabled={isPickingLocation}
                      className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition disabled:opacity-50"
                    >
                      <Locate size={16} />
                      {isPickingLocation ? 'Getting location...' : 'Get Current Location'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const query = prompt('Enter location (city, street, or landmark):');
                        if (query) searchLocation(query);
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition"
                    >
                      <Navigation size={16} />
                      Search Location
                    </button>
                  </div>
                  {locationError && (
                    <p className="text-xs text-red-500 mb-2">{locationError}</p>
                  )}
                  <textarea
                    required
                    rows="3"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your complete address"
                  />
                  {customerInfo.latitude && customerInfo.longitude && (
                    <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                      <MapPin size={12} />
                      Location captured! 
                      <a 
                        href={getGoogleMapsLink(customerInfo.latitude, customerInfo.longitude)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline"
                      >
                        View on map →
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Note (Optional)
                  </label>
                  <textarea
                    rows="2"
                    value={customerInfo.note}
                    onChange={(e) => setCustomerInfo({...customerInfo, note: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Special instructions or notes"
                  />
                </div>

                {/* Order Summary in Modal */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Order Summary</p>
                  <div className="space-y-1 text-sm">
                    <p className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${getSubtotal().toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{getShipping() === 0 ? 'Free' : `$${getShipping().toFixed(2)}`}</span>
                    </p>
                    <p className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-purple-600">${getTotal().toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending Order...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Place Order
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce {
            animation: bounce 0.5s ease-out;
          }
        `
      }} />
    </div>
  );
};

export default Cart;