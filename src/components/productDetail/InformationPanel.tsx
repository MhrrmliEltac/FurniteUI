import { Link } from "react-router-dom";
import Refuned from "../../assets/images/image 12.svg";
import Delivery from "../../assets/images/image 11.svg";
import Customer from "../../assets/images/image 9.svg";
import "../../assets/styles/informationpanel.css";

const InformationPanel = () => {
  return (
    <section className="information-panel-section">
      <div className="container">
        <div className="information-refuned information">
          <img src={Refuned} alt="refuned_image" />
          <Link className="info-link" to="/">
            Return & Refund Policy
          </Link>
        </div>
        <div className="information-delivery information">
          <img src={Delivery} alt="delivery_image" />
          <Link className="info-link" to="/">
            Delivery & Assembling
          </Link>
        </div>
        <div className="information-customer information">
          <img src={Customer} alt="customer_image" />
          <Link className="info-link" to="/">
            Contact Customer Care
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InformationPanel;
