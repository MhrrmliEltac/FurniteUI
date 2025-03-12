import { motion } from "framer-motion";
import Visa from "../../assets/images/visa.svg";
import MasterCard from "../../assets/images/mastercard.svg";
import Arabic from "../../assets/images/image 18.svg";
import Bangla from "../../assets/images/bacngla-bank.svg";
import EasternBank from "../../assets/images/eastern-bank.svg";
import CityBank from "../../assets/images/city-bank.svg";
import "../../assets/styles/partner.css";

const PaymentPartner = () => {
  return (
    <section className="partner-section">
      <div className="container">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          Payment Partners
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="partner-images"
        >
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 * 0.2 }}
            src={Visa}
            alt=""
          />
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 * 0.4 }}
            src={MasterCard}
            alt=""
          />
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 * 0.6 }}
            src={Arabic}
            alt=""
          />
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 * 0.8 }}
            src={Bangla}
            alt=""
          />
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 * 1 }}
            src={EasternBank}
            alt=""
          />
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 * 1.2 }}
            src={CityBank}
            alt=""
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentPartner;
