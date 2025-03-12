import "../../assets/styles/partner.css";
import Visa from "../../assets/images/visa.svg";
import MasterCard from "../../assets/images/mastercard.svg";
import Arabic from "../../assets/images/image 18.svg";
import Bangla from "../../assets/images/bacngla-bank.svg";
import EasternBank from "../../assets/images/eastern-bank.svg";
import CityBank from "../../assets/images/city-bank.svg";

const PaymentPartner = () => {
  return (
    <section className="partner-section">
      <div className="container">
        <h3>Payment Partners</h3>
        <div className="partner-images">
          <img src={Visa} alt="" />
          <img src={MasterCard} alt="" />
          <img src={Arabic} alt="" />
          <img src={Bangla} alt="" />
          <img src={EasternBank} alt="" />
          <img src={CityBank} alt="" />
        </div>
      </div>
    </section>
  );
};

export default PaymentPartner;
