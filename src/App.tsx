import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Users,
  MessageCircle,
  Share2,
  Menu,
  X,
  Bot,
  Hash,
  Download,
  Link,
  Send,
  AtSign,
  ThumbsUp,
  CalendarPlus,
  UserPlus,
  MessageSquare,
  ShoppingCart,
  Clock,
  CheckCircle2,
  Globe,
  Camera,
  Feather,
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  Video,
  Key,
  RefreshCcw,
} from "lucide-react";
import "./styles.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  // --- LINK GOOGLE SHEETS CỦA BẠN ---
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyats1ebB6scxYD162yB1sv4xgGlkSo0CX0dwKiXsRVyUfwvQeCR-5iOSl_DSMwln6d/exec";

  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const urlWithCacheBuster = `${scriptURL}?t=${new Date().getTime()}`;
      const response = await fetch(urlWithCacheBuster);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Lỗi khi tải đơn hàng:", error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const socialTools = [
    {
      id: 1,
      name: "AI Tạo Nội Dung",
      icon: <Bot className="w-6 h-6 text-purple-500" />,
      desc: "Tự động tạo bài viết chuẩn SEO",
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Quét Hashtag Top",
      icon: <Hash className="w-6 h-6 text-blue-500" />,
      desc: "Tìm kiếm hashtag đang trending",
      status: "Hoạt động",
    },
    {
      id: 3,
      name: "Tải Video",
      icon: <Download className="w-6 h-6 text-green-500" />,
      desc: "Tải video từ MXH không logo",
      status: "Bảo trì",
    },
    {
      id: 4,
      name: "Rút Gọn Link",
      icon: <Link className="w-6 h-6 text-orange-500" />,
      desc: "Rút gọn link hàng loạt",
      status: "Hoạt động",
    },
  ];

  const menuGroups = [
    {
      title: "Chung",
      items: [
        {
          id: "dashboard",
          name: "Tổng quan",
          icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
          id: "orders",
          name: "Quản lý Đơn hàng",
          icon: <ShoppingCart className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "Nền tảng Social",
      items: [
        {
          id: "telegram",
          name: "Telegram",
          icon: <Send className="w-5 h-5" />,
          subItems: [
            { id: "tele_autopost", name: "Auto Post (Đăng bài)" },
            // Đã xóa Puff Mem khỏi menu Telegram
          ],
        },
        {
          id: "facebook",
          name: "Facebook",
          icon: <Globe className="w-5 h-5" />,
          subItems: [{ id: "fb_autopost", name: "Auto Post (Đăng bài)" }],
        },
        {
          id: "threads",
          name: "Threads",
          icon: <AtSign className="w-5 h-5" />,
          subItems: [{ id: "threads_autopost", name: "Auto Post (Đăng bài)" }],
        },
        {
          id: "x",
          name: "X (Twitter)",
          icon: <Feather className="w-5 h-5" />,
          subItems: [{ id: "x_autopost", name: "Auto Tweet" }],
        },
        {
          id: "instagram",
          name: "Instagram",
          icon: <Camera className="w-5 h-5" />,
          subItems: [{ id: "ig_autopost", name: "Auto Post (Đăng bài)" }],
        },
      ],
    },
    {
      title: "Hệ thống",
      items: [
        {
          id: "settings",
          name: "Cài đặt",
          icon: <Settings className="w-5 h-5" />,
        },
      ],
    },
  ];

  const handleMenuClick = (item) => {
    if (item.subItems) {
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
    } else {
      setActiveTab(item.id);
      setIsMobileMenuOpen(false);
    }
  };

  const getActiveItem = () => {
    for (let group of menuGroups) {
      for (let item of group.items) {
        if (item.id === activeTab) return item;
        if (item.subItems) {
          let sub = item.subItems.find((s) => s.id === activeTab);
          if (sub)
            return {
              ...sub,
              icon: item.icon,
              name: `${item.name} - ${sub.name}`,
            };
        }
      }
    }
    return null;
  };

  const handleOrderSubmit = async (platform, action, extraData) => {
    setIsSubmitting(true);

    const orderId = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const time = new Date().toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const service = `Auto Post ${platform}`; // Đã tối giản vì không còn Puff Mem
    const status = "Chờ xử lý";
    const price = "Gói hệ thống";

    const payload = {
      platform,
      action,
      orderId,
      time,
      service,
      status,
      customer: "Khách hàng",
      price,
      ...extraData,
    };

    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert(
        `🎉 Lên lịch ${action} thành công! Đơn hàng đã được đẩy lên Google Sheets.`
      );
      setActiveTab("orders");
      setTimeout(() => {
        fetchOrders();
      }, 1500);
    } catch (error) {
      alert("❌ Lỗi gửi dữ liệu lên Google Sheets.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAutoPostForm = (platformName, colorClass, icon) => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="mb-6">
        <h2
          className={`text-2xl font-bold ${colorClass} flex items-center gap-3`}
        >
          {icon} {platformName} - Auto Post
        </h2>
        <p className="text-slate-500 mt-2">
          Lên lịch đăng tải nội dung tự động lên {platformName}.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 max-w-5xl">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleOrderSubmit(platformName, "Auto Post", {
              idPage: formData.get("idPage"),
              accessToken: formData.get("accessToken"),
              postType: formData.get("postType"),
              aiAgent: formData.get("aiAgent"),
              content: formData.get("content"),
              postTime: formData.get("postTime"),
              videoLink: formData.get("videoLink"),
              img1: formData.get("img1"),
              img2: formData.get("img2"),
              img3: formData.get("img3"),
              img4: formData.get("img4"),
              img5: formData.get("img5"),
              img6: formData.get("img6"),
              img7: formData.get("img7"),
              img8: formData.get("img8"),
              img9: formData.get("img9"),
              img10: formData.get("img10"),
            });
            e.target.reset();
          }}
        >
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  ID Trang/User <span className="text-red-500">*</span>
                </label>
                <input
                  name="idPage"
                  required
                  type="text"
                  placeholder="Nhập ID..."
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none text-sm shadow-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Access Token <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    name="accessToken"
                    required
                    type="text"
                    placeholder="Nhập Token..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none text-sm shadow-sm font-mono"
                  />
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Loại bài viết
                </label>
                <select
                  name="postType"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm shadow-sm outline-none"
                >
                  <option value="Chỉ văn bản">Chỉ văn bản</option>
                  <option value="Video">Video</option>
                  <option value="Một Ảnh">Một Ảnh</option>
                  <option value="Nhiều Ảnh (Album)">Nhiều Ảnh (Album)</option>
                  <option value="Media (Video + Ảnh)">
                    Media (Video + Ảnh)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Trợ lý AI
                </label>
                <select
                  name="aiAgent"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm shadow-sm outline-none"
                >
                  <option value="Không">Không</option>
                  <option value="Có">Có</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            {/* Đã bỏ dấu * màu đỏ và đổi placeholder để thể hiện rõ là Tùy chọn */}
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Nội dung bài viết (Tùy chọn)
            </label>
            {/* Đã xóa thuộc tính 'required' ở thẻ textarea bên dưới */}
            <textarea
              name="content"
              rows="4"
              placeholder="Nhập nội dung (có thể để trống)..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                <Clock className="w-4 h-4" /> Giờ đăng{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                name="postTime"
                required
                type="datetime-local"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                <Video className="w-4 h-4" /> Link Video
              </label>
              <input
                name="videoLink"
                type="text"
                placeholder="https://..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
              <ImageIcon className="w-4 h-4" /> Link Hình Ảnh (1-10)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <input
                  key={n}
                  name={`img${n}`}
                  type="text"
                  placeholder={`Link ảnh ${n}...`}
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                />
              ))}
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end space-x-3">
            <button
              type="button"
              className="px-6 py-2.5 text-sm text-slate-600 bg-slate-100 rounded-xl"
            >
              Lưu nháp
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 text-sm text-white rounded-xl shadow-sm transition-all ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              } ${colorClass.replace("text", "bg")} hover:opacity-90`}
            >
              {isSubmitting ? "Đang xử lý..." : "Lên lịch đăng"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* SIDEBAR BẢN ĐẦY ĐỦ */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <span className="text-xl font-bold text-indigo-600">SocialHubX</span>
        </div>
        <nav className="flex-1 px-4 mt-2 overflow-y-auto space-y-6 pb-6">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => handleMenuClick(item)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${
                        activeTab === item.id ||
                        item.subItems?.some((s) => s.id === activeTab)
                          ? "bg-indigo-50 text-indigo-600 font-semibold"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      {item.subItems &&
                        (expandedMenu === item.id ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        ))}
                    </button>
                    {item.subItems && expandedMenu === item.id && (
                      <div className="ml-9 mt-1 space-y-1">
                        {item.subItems.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => setActiveTab(sub.id)}
                            className={`w-full text-left px-4 py-2 text-sm rounded-lg ${
                              activeTab === sub.id
                                ? "text-indigo-600 font-medium"
                                : "text-slate-500 hover:text-indigo-600"
                            }`}
                          >
                            • {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="text-2xl font-bold text-slate-800">
            {getActiveItem()?.name || "Tổng quan"}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> Tạo Bài Viết
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {/* DASHBOARD ĐẦY ĐỦ */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    label: "Tổng Follow",
                    value: "124,500",
                    color: "blue",
                    icon: <Users className="w-6 h-6" />,
                  },
                  {
                    label: "Tương tác",
                    value: "8,234",
                    color: "purple",
                    icon: <MessageCircle className="w-6 h-6" />,
                  },
                  {
                    label: "Bài đã đăng",
                    value: "142",
                    color: "green",
                    icon: <Share2 className="w-6 h-6" />,
                  },
                  {
                    label: "Chuyển đổi",
                    value: "3.2%",
                    color: "orange",
                    icon: <TrendingUp className="w-6 h-6" />,
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 w-fit rounded-xl bg-${s.color}-50 text-${s.color}-500`}
                      >
                        {s.icon}
                      </div>
                      <span className="text-sm font-bold text-emerald-500">
                        +12%
                      </span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-800">
                        {s.value}
                      </h3>
                      <p className="text-slate-500 text-sm font-medium mt-1">
                        {s.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-6">
                  Công cụ thường dùng
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {socialTools.map((t) => (
                    <div
                      key={t.id}
                      className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="mb-4 bg-slate-50 w-12 h-12 flex items-center justify-center rounded-xl">
                        {t.icon}
                      </div>
                      <h3 className="font-bold text-lg text-slate-800 mb-2">
                        {t.name}
                      </h3>
                      <p className="text-slate-500 text-sm">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* QUẢN LÝ ĐƠN HÀNG CHUẨN XỊN */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <ShoppingCart className="w-8 h-8 text-indigo-600" /> Quản lý
                    Đơn hàng
                  </h2>
                  <p className="text-slate-500 mt-2">
                    Dữ liệu được đồng bộ trực tiếp từ Google Sheets.
                  </p>
                </div>
                <button
                  onClick={fetchOrders}
                  disabled={isLoadingOrders}
                  className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition-all"
                >
                  <RefreshCcw
                    className={`w-4 h-4 ${
                      isLoadingOrders ? "animate-spin" : ""
                    }`}
                  />
                  {isLoadingOrders ? "Đang tải..." : "Làm mới dữ liệu"}
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b">
                    <tr>
                      <th className="p-4">Mã Đơn</th>
                      <th className="p-4">Khách hàng</th>
                      <th className="p-4">Dịch vụ</th>
                      <th className="p-4">Số tiền</th>
                      <th className="p-4">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {orders.length === 0 && !isLoadingOrders && (
                      <tr>
                        <td
                          colSpan="5"
                          className="p-8 text-center text-slate-500"
                        >
                          Chưa có dữ liệu. Vui lòng Lên đơn để thử nghiệm.
                        </td>
                      </tr>
                    )}

                    {orders.map((o, i) => {
                      let statusStyle = "bg-orange-100 text-orange-700";
                      if (
                        o.status?.includes("Thành công") ||
                        o.status?.includes("Hoàn thành")
                      ) {
                        statusStyle = "bg-green-100 text-green-700";
                      } else if (
                        o.status?.includes("Lỗi") ||
                        o.status?.includes("Hủy")
                      ) {
                        statusStyle = "bg-red-100 text-red-700";
                      }

                      return (
                        <tr
                          key={i}
                          className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                        >
                          <td className="p-4 font-mono font-bold text-indigo-600">
                            {o.id} <br />
                            <span className="text-xs text-slate-400 font-normal">
                              {o.time}
                            </span>
                          </td>
                          <td className="p-4 font-semibold text-slate-800">
                            {o.customer}
                          </td>
                          <td className="p-4 font-medium text-slate-700">
                            {o.service}
                          </td>
                          <td className="p-4 font-bold text-slate-800">
                            {o.price}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-md text-xs font-bold ${statusStyle}`}
                            >
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CÁC TAB AUTO POST */}
          {activeTab === "fb_autopost" &&
            renderAutoPostForm("Facebook", "text-blue-600", <Globe />)}
          {activeTab === "tele_autopost" &&
            renderAutoPostForm("Telegram", "text-sky-500", <Send />)}
          {activeTab === "threads_autopost" &&
            renderAutoPostForm("Threads", "text-slate-900", <AtSign />)}
          {activeTab === "ig_autopost" &&
            renderAutoPostForm("Instagram", "text-pink-600", <Camera />)}
          {activeTab === "x_autopost" &&
            renderAutoPostForm("X (Twitter)", "text-slate-800", <Feather />)}
          {activeTab === "settings" && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
              <Settings className="w-16 h-16 mb-4 text-slate-300" />
              <h2 className="text-xl font-bold text-slate-700">
                Cài đặt hệ thống
              </h2>
              <p>Tính năng đang được phát triển...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
