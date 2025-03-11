import "../../assets/styles/footer.css";
import Logo from "../../assets/images/Logo.png";
import { Icon } from "@iconify/react/dist/iconify.js";

const Footer = () => {
  return (
    <footer className="footer">
      <section
        style={{ maxWidth: "1560px", margin: "0 auto" }}
        className="footer-top-section"
      >
        <div className="left-side">
          <img src={Logo} alt="Logo-image" />
          <span>Decorate your Space with Us</span>
        </div>
        <div className="right-side">
          <ul>
            <li>Company</li>
            <li>Blog</li>
            <li>Career</li>
            <li>Pricing</li>
          </ul>
          <ul>
            <li>Legal</li>
            <li>Terms of service</li>
            <li>Privacy & Policies</li>
            <li>Cookies Policy</li>
            <li>Data Processing</li>
          </ul>
          <ul>
            <li>Resources</li>
            <li>Documentations</li>
            <li>Papers</li>
            <li>Events Details</li>
          </ul>
        </div>
      </section>
      <section
        style={{ maxWidth: "1560px", margin: "0 auto" }}
        className="footer-bottom-section"
      >
        <span>Eltac Maharramli 2025</span>
        <ul className="footer-bottom-list">
          <li>
            <Icon
              icon="ic:baseline-facebook"
              width="32"
              height="32"
              style={{ color: "#F9FAFB", cursor: "pointer" }}
            />
          </li>
          <li>
            <Icon
              icon="mdi:youtube"
              width="32"
              height="32"
              style={{ color: "#F9FAFB", cursor: "pointer" }}
            />
          </li>
          <li>
            <Icon
              icon="mdi:instagram"
              width="32"
              height="32"
              style={{ color: "#F9FAFB", cursor: "pointer" }}
            />
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
