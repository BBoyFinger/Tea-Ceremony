import logo from "../assets/logo.svg"
type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <footer id="footer">
        <div className="pt-[75px] ">
          <div className="container grid grid-cols-1 lg:grid-cols-5">
            <div>
              <h2 className="text-[14px] lg:text-[15px] lg:pb-[20px] leading-5 font-semibold text-[#7E792A]">
                Categories
              </h2>
              <ul>
                <li>Tea</li>
                <li>TeaWear</li>
                <li>Blends</li>
                <li>Gifts</li>
                <li>Gift Certification</li>
                <li>Pantry</li>
              </ul>
            </div>
            <div>
              <h2 className="text-[14px] lg:text-[15px] lg:pb-[20px] leading-5 font-semibold text-[#7E792A]">
                Shop
              </h2>
              <ul>
                <li>Shipping</li>
                <li>Best Sellers</li>
                <li>Best Reviewed</li>
                <li>New Arrivals</li>
                <li>Advanced Search</li>
                <li>Helping you Decide</li>
                <li>Teavana Alternatives</li>
                <li>Davids Tea Alternatives</li>
              </ul>
            </div>
            <div>
              <h2 className="text-[14px] lg:text-[15px] lg:pb-[20px] leading-5 font-semibold text-[#7E792A]">
                Learn
              </h2>
              <ul>
                <li>Our Story</li>
                <li>Tea Info</li>
                <li>Carbon Offset</li>
                <li>Roots Campain</li>
                <li>Tea Blog</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h2 className="text-[14px] lg:text-[15px] lg:pb-[20px] leading-5 font-semibold text-[#7E792A]">
                Adadagiogio teas
              </h2>
              <ul>
                <li>Join Our Mailling List</li>
                <li>Carrers</li>
                <li>Stores</li>
                <li>Media / Press</li>
                <li>Wholesale</li>
                <li>Help / Contact</li>
              </ul>
            </div>
            <div>
              <h2 className="text-[14px] lg:text-[15px] lg:pb-[20px] leading-5 font-semibold text-[#7E792A]">
                Tea blog
              </h2>
              <ul>
                <li>Blog</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* Carbon offset */}
      <div tabIndex={0} id="carbonOffset" className="bg-custom-fall w-full h-[225px] bg-[center_bottom] bg-contain">
        <div></div>
      </div>
      {/* satellites */}
      <div id="satellites">
        <div className="container flex items-center flex-col">
          <div className="">
            <img src={logo} alt="logo" className="bg-contain w-20 h-20" />
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <p>
                @Teaware - copyright { new Date().getFullYear()}
              </p>
            </div>
            <div>
              hello
            </div>
            <div>
              Privacy Policy
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Footer;
