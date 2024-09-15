import logo from "../assets/logo.svg";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
  FaTiktok,
} from "react-icons/fa";

type Props = {};

const links = [
  {
    title: "Categories",
    items: [
      { name: "Tea", href: "#" },
      { name: "TeaWear", href: "#" },
      { name: "Blends", href: "#" },
      { name: "Gifts", href: "#" },
      { name: "Gift Certification", href: "#" },
      { name: "Pantry", href: "#" },
    ],
  },
  {
    title: "Shop",
    items: [
      { name: "Shipping", href: "#" },
      { name: "Best Sellers", href: "#" },
      { name: "Best Reviewed", href: "#" },
      { name: "New Arrivals", href: "#" },
      { name: "Advanced Search", href: "#" },
      { name: "Helping you Decide", href: "#" },
      { name: "Teavana Alternatives", href: "#" },
      { name: "Davids Tea Alternatives", href: "#" },
    ],
  },
  {
    title: "Learn",
    items: [
      { name: "Our Story", href: "#" },
      { name: "Tea Info", href: "#" },
      { name: "Carbon Offset", href: "#" },
      { name: "Roots Campaign", href: "#" },
      { name: "Tea Blog", href: "#" },
      { name: "FAQs", href: "#" },
    ],
  },
  {
    title: "Adadagiogio teas",
    items: [
      { name: "Join Our Mailing List", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Stores", href: "#" },
      { name: "Media / Press", href: "#" },
      { name: "Wholesale", href: "#" },
      { name: "Help / Contact", href: "#" },
    ],
  },
  {
    title: "Tea Blog",
    items: [{ name: "Blog", href: "#" }],
  },
];

const Footer = (props: Props) => {
  return (
    <>
      <footer id="footer">
        <div className="pt-[75px] ">
          <div className="container grid grid-cols-1 lg:grid-cols-5">
            {links.map((section) => (
              <div key={section.title}>
                <h2 className="text-[14px] lg:text-[15px] lg:pb-[20px] leading-5 font-semibold text-[#7E792A]">
                  {section.title}
                </h2>
                <ul className="inline text-black text-sm leading-[1.2em] pr-[10px] pb-[7px]">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <a href={item.href}>{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
      {/* Carbon offset */}
      <div
        tabIndex={0}
        id="carbonOffset"
        className="hidden lg:block bg-custom-fall w-full h-[225px] bg-[center_bottom] bg-contain"
      >
        <div></div>
      </div>

      {/* satellites */}
      <div id="satellites" className="bg-[#37372d] pt-[10px] ">
        <div className="container flex items-center flex-col">
          <div className="text-white">
            <img
              src={logo}
              alt="logo"
              className="object-contain w-20 h-20 bg-white"
            />
          </div>

          {/* Line */}
          <div className="opacity-20 clear-both w-full h-[1px] my-[20px] bg-[#d7d9dd]"></div>

          <div className="lg:w-[calc(100%-100px)] px-[20px] pb-[30px] lg:px-[50px] lg:pb-[30px] max-w-[850px] mx-auto flex justify-between items-center gap-5">
            <div>
              <p className="text-[13px] text-white opacity-[0.8] ">
                @Teaware - copyright {new Date().getFullYear()}
              </p>
            </div>
            <div className="hidden lg:flex text-white opacity-[0.8]">
              <div className="cursor-pointer mx-5">
                <a href="">
                  <FaFacebookF className="w-[20px] h-[20px]" />
                </a>
              </div>
              <div className="cursor-pointer mx-5">
                <a href="">
                  <FaTwitter className="w-[20px] h-[20px]" />
                </a>
              </div>
              <div className="cursor-pointer mx-5">
                <a href="">
                  <FaInstagram className="w-[20px] h-[20px]" />
                </a>
              </div>
              <div className="cursor-pointer mx-5">
                <a href="">
                  <FaYoutube className="w-[20px] h-[20px]" />
                </a>
              </div>
              <div className="cursor-pointer mx-5">
                <a href="">
                  <FaPinterest className="w-[20px] h-[20px]" />
                </a>
              </div>
              <div className="cursor-pointer mx-5">
                <a href="">
                  <FaTiktok className="w-[20px] h-[20px]" />
                </a>
              </div>
            </div>
            <div className="text-white opacity-[0.8] hover:text-[#a66920] duration-75 transition-all	text-[13px]">
              <a href="">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
