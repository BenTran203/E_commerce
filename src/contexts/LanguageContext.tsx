'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'vi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.collections': 'Collections',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',
    'nav.account': 'Account',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Hero Section
    'hero.title': 'Timeless',
    'hero.subtitle': 'Elegance Redefined',
    'hero.description': 'Discover curated collections of premium clothing that transcend seasonal trends. Each piece is carefully selected to embody sophistication and lasting style.',
    'hero.cta.explore': 'Explore Collection',
    'hero.cta.story': 'Our Story',
    
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.price': 'Price',
    'common.rating': 'Rating',
    'common.reviews': 'Reviews',
    'common.addToCart': 'Add to Cart',
    'common.viewDetails': 'View Details',
    'common.readMore': 'Read More',
    'common.showMore': 'Show More',
    'common.showLess': 'Show Less',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.apply': 'Apply',
    'common.clear': 'Clear',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.success': 'Success',
    'common.error': 'Error',
    'common.warning': 'Warning',
    'common.info': 'Info',
    
    // Shop Page
    'shop.title': 'Our Collection',
    'shop.description': 'Discover our carefully curated selection of premium fashion pieces',
    'shop.searchPlaceholder': 'Search products...',
    'shop.sortBy': 'Sort by',
    'shop.filters': 'Filters',
    'shop.priceRange': 'Price Range',
    'shop.categories': 'Categories',
    'shop.brands': 'Brands',
    'shop.colors': 'Colors',
    'shop.sizes': 'Sizes',
    'shop.applyFilters': 'Apply Filters',
    'shop.clearAll': 'Clear All',
    'shop.noResults': 'No products found',
    'shop.sortOptions.newest': 'Newest',
    'shop.sortOptions.priceLow': 'Price: Low to High',
    'shop.sortOptions.priceHigh': 'Price: High to Low',
    'shop.sortOptions.name': 'Name A-Z',
    
    // Collections Page
    'collections.title': 'Our Collections',
    'collections.description': 'Discover our carefully curated collections that blend timeless elegance with contemporary style.',
    'collections.featured': 'Featured Collections',
    'collections.featuredDescription': 'Our most popular and seasonally relevant collections, handpicked for their exceptional design and quality',
    'collections.all': 'All Collections',
    'collections.allDescription': 'Explore our complete range of collections, each designed to cater to different styles and occasions',
    'collections.explore': 'Explore',
    'collections.items': 'items',
    'collections.featured.badge': 'Featured',
    'collections.popular': 'Popular',
    'collections.newsletter.title': 'Stay Updated',
    'collections.newsletter.description': 'Be the first to know about new collections, exclusive offers, and style inspiration.',
    'collections.newsletter.placeholder': 'Enter your email',
    'collections.newsletter.subscribe': 'Subscribe',
    
    // About Page
    'about.title': 'Our Story',
    'about.heroDescription': 'Born from a passion for timeless elegance and authentic craftsmanship, Timeless represents more than fashion—it\'s a celebration of heritage, quality, and the art of thoughtful design.',
    'about.mission.title': 'Crafting Timeless Elegance',
    'about.mission.description1': 'At Timeless, we believe that true style transcends seasonal trends. Our mission is to curate and create pieces that embody lasting elegance, superior quality, and authentic craftsmanship.',
    'about.mission.description2': 'Each item in our collection tells a story—of skilled artisans, premium materials, and a commitment to excellence that spans generations. We\'re not just selling clothing; we\'re preserving traditions and celebrating the art of fine fashion.',
    'about.stats.title': 'Our Impact',
    'about.stats.description': 'Numbers that reflect our commitment to excellence and the trust our customers place in us',
    'about.stats.customers': 'Happy Customers',
    'about.stats.products': 'Products Sold',
    'about.stats.countries': 'Countries',
    'about.stats.years': 'Years of Excellence',
    'about.values.title': 'Our Values',
    'about.values.description': 'The principles that guide every decision we make and every product we create',
    'about.journey.title': 'Our Journey',
    'about.journey.description': 'From humble beginnings to global recognition—the milestones that shaped our story',
    'about.team.title': 'The Team Behind Timeless',
    'about.team.description': 'Meet the passionate individuals who bring our vision to life every day',
    'about.cta.title': 'Join Our Story',
    'about.cta.description': 'Become part of the Timeless community and discover fashion that celebrates authenticity, quality, and timeless style.',
    'about.cta.shop': 'Shop Collections',
    'about.cta.contact': 'Contact Us',
    
    // Contact Page
    'contact.title': 'Get in Touch',
    'contact.description': 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    'contact.form.title': 'Send us a Message',
    'contact.form.autoFill': '✨ We\'ve pre-filled your information since you\'re logged in!',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone Number',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.namePlaceholder': 'Your full name',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.phonePlaceholder': '+84 123 456 789',
    'contact.form.messagePlaceholder': 'Tell us how we can help you...',
    'contact.form.agreeTerms': 'I agree to the Terms of Service and Privacy Policy',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success.title': 'Message Sent Successfully!',
    'contact.form.success.description': 'Thank you for contacting us. We\'ll get back to you within 24 hours.',
    'contact.form.success.sendAnother': 'Send Another Message',
    'contact.info.email.title': 'Email Us',
    'contact.info.email.description': 'Send us an email and we\'ll respond within 24 hours',
    'contact.info.phone.title': 'Call Us',
    'contact.info.phone.description': 'Mon-Fri from 8am to 6pm (GMT+7)',
    'contact.info.address.title': 'Visit Us',
    'contact.info.address.description': 'Come visit our flagship store',
    'contact.faq.title': 'Frequently Asked Questions',
    'contact.faq.stillQuestions': 'Still have questions?',
    'contact.faq.cantFind': 'Can\'t find the answer you\'re looking for? Please chat with us.',
    'contact.faq.liveChat': 'Start Live Chat',
    
    // Footer
    'footer.description': 'Timeless fashion that transcends trends. Discover curated collections of premium clothing and accessories.',
    'footer.quickLinks': 'Quick Links',
    'footer.customerService': 'Customer Service',
    'footer.connect': 'Connect',
    'footer.newsletter.title': 'Stay in Style',
    'footer.newsletter.description': 'Subscribe to get special offers, exclusive updates and amazing deals.',
    'footer.newsletter.placeholder': 'Enter your email',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved',
    
    // Language
    'language.english': 'English',
    'language.vietnamese': 'Tiếng Việt',
    'language.switch': 'Switch Language',
  },
  vi: {
    // Navigation
    'nav.home': 'Trang Chủ',
    'nav.shop': 'Cửa Hàng',
    'nav.collections': 'Bộ Sưu Tập',
    'nav.about': 'Giới Thiệu',
    'nav.contact': 'Liên Hệ',
    'nav.cart': 'Giỏ Hàng',
    'nav.account': 'Tài Khoản',
    'nav.login': 'Đăng Nhập',
    'nav.logout': 'Đăng Xuất',
    
    // Hero Section
    'hero.title': 'Timeless',
    'hero.subtitle': 'Định Nghĩa Lại Sự Thanh Lịch',
    'hero.description': 'Khám phá các bộ sưu tập thời trang cao cấp được tuyển chọn kỹ lưỡng, vượt qua xu hướng theo mùa. Mỗi sản phẩm được lựa chọn cẩn thận để thể hiện sự tinh tế và phong cách bền vững.',
    'hero.cta.explore': 'Khám Phá Bộ Sưu Tập',
    'hero.cta.story': 'Câu Chuyện Của Chúng Tôi',
    
    // Common
    'common.loading': 'Đang tải...',
    'common.search': 'Tìm kiếm',
    'common.filter': 'Lọc',
    'common.sort': 'Sắp xếp',
    'common.price': 'Giá',
    'common.rating': 'Đánh giá',
    'common.reviews': 'Nhận xét',
    'common.addToCart': 'Thêm Vào Giỏ',
    'common.viewDetails': 'Xem Chi Tiết',
    'common.readMore': 'Đọc Thêm',
    'common.showMore': 'Xem Thêm',
    'common.showLess': 'Thu Gọn',
    'common.next': 'Tiếp Theo',
    'common.previous': 'Trước',
    'common.close': 'Đóng',
    'common.apply': 'Áp Dụng',
    'common.clear': 'Xóa',
    'common.save': 'Lưu',
    'common.cancel': 'Hủy',
    'common.edit': 'Chỉnh Sửa',
    'common.delete': 'Xóa',
    'common.confirm': 'Xác Nhận',
    'common.success': 'Thành Công',
    'common.error': 'Lỗi',
    'common.warning': 'Cảnh Báo',
    'common.info': 'Thông Tin',
    
    // Shop Page
    'shop.title': 'Bộ Sưu Tập Của Chúng Tôi',
    'shop.description': 'Khám phá bộ sưu tập thời trang cao cấp được tuyển chọn kỹ lưỡng',
    'shop.searchPlaceholder': 'Tìm kiếm sản phẩm...',
    'shop.sortBy': 'Sắp xếp theo',
    'shop.filters': 'Bộ Lọc',
    'shop.priceRange': 'Khoảng Giá',
    'shop.categories': 'Danh Mục',
    'shop.brands': 'Thương Hiệu',
    'shop.colors': 'Màu Sắc',
    'shop.sizes': 'Kích Thước',
    'shop.applyFilters': 'Áp Dụng Bộ Lọc',
    'shop.clearAll': 'Xóa Tất Cả',
    'shop.noResults': 'Không tìm thấy sản phẩm',
    'shop.sortOptions.newest': 'Mới Nhất',
    'shop.sortOptions.priceLow': 'Giá: Thấp đến Cao',
    'shop.sortOptions.priceHigh': 'Giá: Cao đến Thấp',
    'shop.sortOptions.name': 'Tên A-Z',
    
    // Collections Page
    'collections.title': 'Bộ Sưu Tập Của Chúng Tôi',
    'collections.description': 'Khám phá các bộ sưu tập được tuyển chọn kỹ lưỡng, kết hợp sự thanh lịch vượt thời gian với phong cách hiện đại.',
    'collections.featured': 'Bộ Sưu Tập Nổi Bật',
    'collections.featuredDescription': 'Các bộ sưu tập phổ biến nhất và phù hợp với mùa, được chọn lọc vì thiết kế và chất lượng đặc biệt',
    'collections.all': 'Tất Cả Bộ Sưu Tập',
    'collections.allDescription': 'Khám phá toàn bộ bộ sưu tập của chúng tôi, mỗi bộ được thiết kế để phù hợp với các phong cách và dịp khác nhau',
    'collections.explore': 'Khám Phá',
    'collections.items': 'sản phẩm',
    'collections.featured.badge': 'Nổi Bật',
    'collections.popular': 'Phổ Biến',
    'collections.newsletter.title': 'Cập Nhật Tin Tức',
    'collections.newsletter.description': 'Hãy là người đầu tiên biết về các bộ sưu tập mới, ưu đãi độc quyền và cảm hứng phong cách.',
    'collections.newsletter.placeholder': 'Nhập email của bạn',
    'collections.newsletter.subscribe': 'Đăng Ký',
    
    // About Page
    'about.title': 'Câu Chuyện Của Chúng Tôi',
    'about.heroDescription': 'Sinh ra từ đam mê về sự thanh lịch vượt thời gian và tay nghề thủ công chính thống, Timeless đại diện cho nhiều hơn cả thời trang—đó là sự tôn vinh di sản, chất lượng và nghệ thuật thiết kế chu đáo.',
    'about.mission.title': 'Tạo Nên Sự Thanh Lịch Vượt Thời Gian',
    'about.mission.description1': 'Tại Timeless, chúng tôi tin rằng phong cách thực sự vượt qua xu hướng theo mùa. Sứ mệnh của chúng tôi là tuyển chọn và tạo ra những sản phẩm thể hiện sự thanh lịch bền vững, chất lượng vượt trội và tay nghề chính thống.',
    'about.mission.description2': 'Mỗi sản phẩm trong bộ sưu tập của chúng tôi kể một câu chuyện—về nghệ nhân tài ba, vật liệu cao cấp và cam kết hoàn hảo trải qua nhiều thế hệ. Chúng tôi không chỉ bán quần áo; chúng tôi bảo tồn truyền thống và tôn vinh nghệ thuật thời trang cao cấp.',
    'about.stats.title': 'Tác Động Của Chúng Tôi',
    'about.stats.description': 'Những con số phản ánh cam kết của chúng tôi về sự xuất sắc và niềm tin mà khách hàng dành cho chúng tôi',
    'about.stats.customers': 'Khách Hàng Hài Lòng',
    'about.stats.products': 'Sản Phẩm Đã Bán',
    'about.stats.countries': 'Quốc Gia',
    'about.stats.years': 'Năm Xuất Sắc',
    'about.values.title': 'Giá Trị Của Chúng Tôi',
    'about.values.description': 'Những nguyên tắc định hướng mọi quyết định chúng tôi đưa ra và mọi sản phẩm chúng tôi tạo ra',
    'about.journey.title': 'Hành Trình Của Chúng Tôi',
    'about.journey.description': 'Từ khởi đầu khiêm tốn đến sự công nhận toàn cầu—những cột mốc định hình câu chuyện của chúng tôi',
    'about.team.title': 'Đội Ngũ Đằng Sau Timeless',
    'about.team.description': 'Gặp gỡ những cá nhân đầy đam mê mang tầm nhìn của chúng tôi thành hiện thực mỗi ngày',
    'about.cta.title': 'Tham Gia Câu Chuyện Của Chúng Tôi',
    'about.cta.description': 'Trở thành một phần của cộng đồng Timeless và khám phá thời trang tôn vinh tính chân thực, chất lượng và phong cách vượt thời gian.',
    'about.cta.shop': 'Mua Sắm Bộ Sưu Tập',
    'about.cta.contact': 'Liên Hệ Với Chúng Tôi',
    
    // Contact Page
    'contact.title': 'Liên Hệ',
    'contact.description': 'Chúng tôi rất mong được nghe từ bạn. Gửi tin nhắn cho chúng tôi và chúng tôi sẽ phản hồi sớm nhất có thể.',
    'contact.form.title': 'Gửi Tin Nhắn Cho Chúng Tôi',
    'contact.form.autoFill': '✨ Chúng tôi đã điền sẵn thông tin của bạn vì bạn đã đăng nhập!',
    'contact.form.name': 'Họ Tên',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Số Điện Thoại',
    'contact.form.subject': 'Chủ Đề',
    'contact.form.message': 'Tin Nhắn',
    'contact.form.namePlaceholder': 'Họ và tên đầy đủ',
    'contact.form.emailPlaceholder': 'email@của-bạn.com',
    'contact.form.phonePlaceholder': '+84 123 456 789',
    'contact.form.messagePlaceholder': 'Cho chúng tôi biết chúng tôi có thể giúp bạn như thế nào...',
    'contact.form.agreeTerms': 'Tôi đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật',
    'contact.form.send': 'Gửi Tin Nhắn',
    'contact.form.sending': 'Đang gửi...',
    'contact.form.success.title': 'Gửi Tin Nhắn Thành Công!',
    'contact.form.success.description': 'Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi trong vòng 24 giờ.',
    'contact.form.success.sendAnother': 'Gửi Tin Nhắn Khác',
    'contact.info.email.title': 'Email Cho Chúng Tôi',
    'contact.info.email.description': 'Gửi email và chúng tôi sẽ phản hồi trong 24 giờ',
    'contact.info.phone.title': 'Gọi Cho Chúng Tôi',
    'contact.info.phone.description': 'Thứ 2-6 từ 8h sáng đến 6h chiều (GMT+7)',
    'contact.info.address.title': 'Đến Thăm Chúng Tôi',
    'contact.info.address.description': 'Hãy đến thăm cửa hàng chính của chúng tôi',
    'contact.faq.title': 'Câu Hỏi Thường Gặp',
    'contact.faq.stillQuestions': 'Vẫn còn thắc mắc?',
    'contact.faq.cantFind': 'Không tìm thấy câu trả lời bạn đang tìm kiếm? Hãy chat với chúng tôi.',
    'contact.faq.liveChat': 'Bắt Đầu Chat Trực Tiếp',
    
    // Footer
    'footer.description': 'Thời trang vượt thời gian, vượt qua xu hướng. Khám phá các bộ sưu tập quần áo và phụ kiện cao cấp được tuyển chọn.',
    'footer.quickLinks': 'Liên Kết Nhanh',
    'footer.customerService': 'Dịch Vụ Khách Hàng',
    'footer.connect': 'Kết Nối',
    'footer.newsletter.title': 'Luôn Thời Trang',
    'footer.newsletter.description': 'Đăng ký để nhận ưu đãi đặc biệt, cập nhật độc quyền và giao dịch tuyệt vời.',
    'footer.newsletter.placeholder': 'Nhập email của bạn',
    'footer.newsletter.subscribe': 'Đăng Ký',
    'footer.rights': 'Bảo lưu mọi quyền',
    
    // Language
    'language.english': 'English',
    'language.vietnamese': 'Tiếng Việt',
    'language.switch': 'Đổi Ngôn Ngữ',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'vi')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}