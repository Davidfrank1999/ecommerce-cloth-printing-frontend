import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => (
  <footer
    id="footer"
    className="bg-gray-900 text-gray-300 px-6 py-12 mt-12 border-t border-gray-700"
  >
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      
      {/* Company Section */}
      <div>
        <h3 className="text-white font-semibold mb-4">Company</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#footer" className="hover:text-white transition">About Us</a></li>
          <li><a href="#" className="hover:text-white transition">Careers</a></li>
          <li><a href="#" className="hover:text-white transition">Press</a></li>
          <li><a href="#" className="hover:text-white transition">Blog</a></li>
        </ul>
      </div>

      {/* Support Section */}
      <div>
        <h3 className="text-white font-semibold mb-4">Support</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white transition">Help Center</a></li>
          <li><a href="#" className="hover:text-white transition">Returns & Refunds</a></li>
          <li><a href="#" className="hover:text-white transition">Payment Options</a></li>
          <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
        </ul>
      </div>

      {/* Contact Section */}
      <div>
        <h3 className="text-white font-semibold mb-4">Contact</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="mailto:support@tshirt.com" className="hover:text-white transition">support@tshirt.com</a></li>
          <li><a href="tel:+911234567890" className="hover:text-white transition">+91 12345 67890</a></li>
          <li><a href="#" className="hover:text-white transition">Locate Us</a></li>
        </ul>
      </div>

      {/* Social + Legal */}
      <div>
        <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
        <div className="flex space-x-4 mb-4 text-lg">
          <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebookF /></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter /></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram /></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><FaYoutube /></a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} T-Shirt. All rights reserved.</p>
        <p className="text-xs mt-2 text-gray-400">
          <a href="#" className="hover:text-white transition">Terms of Use</a> | 
          <a href="#" className="hover:text-white transition"> Privacy Policy</a> | 
          <a href="#" className="hover:text-white transition"> Sitemap</a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
