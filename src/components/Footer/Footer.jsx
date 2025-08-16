import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 px-6 py-12">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* 1. Links Section */}
      <div>
        <h3 className="text-white font-semibold mb-4">Company</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white transition">About Us</a></li>
          <li><a href="#" className="hover:text-white transition">Careers</a></li>
          <li><a href="#" className="hover:text-white transition">Press</a></li>
          <li><a href="#" className="hover:text-white transition">Blog</a></li>
        </ul>
      </div>

      {/* 2. Support Section */}
      <div>
        <h3 className="text-white font-semibold mb-4">Support</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white transition">Help Center</a></li>
          <li><a href="#" className="hover:text-white transition">Cancellation & Returns</a></li>
          <li><a href="#" className="hover:text-white transition">Payment Options</a></li>
          <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
        </ul>
      </div>

      {/* 3. Social & Legal */}
      <div>
        <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
        <div className="flex space-x-4 mb-4">
          <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebookF /></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter /></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram /></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><FaYoutube /></a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} T-Shirt. All rights reserved.</p>
        <p className="text-xs mt-2">Terms of Use | Privacy Policy | Sitemap</p>
      </div>
    </div>
  </footer>
);

export default Footer;
