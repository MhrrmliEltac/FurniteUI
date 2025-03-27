import { Icon } from "@iconify/react/dist/iconify.js";
import Vector from "../../assets/images/Vector 51.png";
import Overrlay from "../../assets/images/White-Minimalist-Elegant-Interior-Design-Instagram-Post-1.png";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import "../../assets/styles/subscription.css";
import { animation } from "../../utils/Animations";

const Subscription = () => {
  const [email, setEmail] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  const sendEmail = async () => {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      toast.error("Enter email");
      return;
    }

    if (!regex.test(email)) {
      toast.error("Email is not valid!");
      return;
    }

    try {
      setIsPending(true);
      const response = await axios.post(
        "https://furniture-server-two.vercel.app/api/send-email",
        {
          email: email,
        }
      );

      if (response.status === 200) {
        toast.success("Email sent successfully!");
        setIsPending(false);
      } else {
        toast.error("Failed to send email. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.");
    }
  };

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
  };

  return (
    <motion.section
      variants={animation}
      initial="initial"
      whileInView="animate"
      transition={{ duration: 1 }}
      className="subscription-section"
    >
      <div className="subs-box">
        <img src={Overrlay} alt="" loading="lazy" />
        <div className="overlay">
          <div className="subs-info">
            <span>We can Customize</span>
            <span>Your Space Tool</span>
          </div>
          <div className="image-box">
            <img src={Vector} alt="" />
          </div>
          <div className="subs-email">
            <div className="subs-email-info">
              <span>
                Get a call from our Team and confirm your Custom design Space
                solution.
              </span>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email address"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    changeEmail(e)
                  }
                />
                {isPending ? (
                  <span className="loader"></span>
                ) : (
                  <Icon
                    icon="iconoir:nav-arrow-right"
                    width="28"
                    height="28"
                    style={{ color: "#668091" }}
                    onClick={sendEmail}
                    className="arrow-icon"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Subscription;
