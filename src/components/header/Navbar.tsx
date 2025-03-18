import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../../assets/images/Logo.png";
import LogoDark from "../../assets/images/Logo-fill.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation, useNavigate } from "react-router-dom";
import Category from "../home/Category";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteProfileToken } from "../store/slice/UserSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "../../assets/styles/navbar.css";

const Navbar = () => {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);
  const navRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isUser = useAppSelector((state) => state.userReducer.user);
  const path = location.pathname;

  useEffect(() => {
    const handleScroll = () => [setScroll(window.scrollY)];
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpen = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  const handleClose = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  const logOut = async () => {
    toast.success("Logged out successfully");
    dispatch(deleteProfileToken());
  };

  const itemVariant = {
    initial: { opacity: 0, translateX: -20, translateY: -20 },
    animate: (index: number) => ({
      opacity: 1,
      translateX: 0,
      translateY: 0,
      transition: { delay: 0.2 * index },
    }),
  };

  return (
    <motion.section
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar-section"
      ref={navRef}
      style={{
        backgroundColor:
          scroll === 0 && path === "/" ? "rgba(255, 255, 255, 0.02)" : "#fff",
        backdropFilter: "blur(5px)",
        height: path !== "/" && scroll === 0 ? "150px" : "80px",
      }}
    >
      <motion.nav className="navbar">
        <div className="left-side">
          <img
            src={scroll === 0 && path === "/" ? Logo : LogoDark}
            alt="logo"
            className="logo"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="right-side">
          <ul className="menu-list">
            <li>
              <Icon
                icon="lucide:search"
                width="28"
                height="28"
                className="icon"
                style={{
                  color: scroll === 0 && path === "/" ? "#DAF1F3" : "#284551",
                }}
              />
            </li>
            <li>
              <Icon
                icon="mingcute:shopping-bag-2-line"
                width="30"
                height="30"
                className="icon"
                style={{
                  color: scroll === 0 && path === "/" ? "#DAF1F3" : "#284551",
                }}
              />
            </li>
            <li>
              <Icon
                icon="mdi:heart-outline"
                width="30"
                height="30"
                className="icon"
                style={{
                  color: scroll === 0 && path === "/" ? "#DAF1F3" : "#284551",
                }}
                onClick={() => navigate("/wishlist")}
              />
            </li>
          </ul>
          {isUser.id ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Icon
                    className="cursor-pointer"
                    icon="solar:user-linear"
                    width="28"
                    height="28"
                    style={{ color: "#B0BFC9" }}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-20 bg-white ">
                  <DropdownMenuLabel className="mx-2">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem  onClick={logOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <motion.button
                className="btn first-btn"
                style={{
                  backgroundColor:
                    scroll === 0 && path === "/" ? "#EBF8F9" : "#284551",
                  color: scroll === 0 && path === "/" ? "#284551" : "#EBF8F9",
                }}
                onClick={() => navigate("/login")}
              >
                Log In
              </motion.button>
              <motion.button
                className="btn primary-btn"
                style={{
                  color: scroll === 0 && path === "/" ? "#EBF8F9" : "#284551",
                  border:
                    scroll === 0 && path === "/"
                      ? "1px solid #EBF8F9"
                      : "1px solid #284551",
                }}
                onClick={() => navigate("/register")}
              >
                Create an Account
              </motion.button>
            </>
          )}
          <div className="burger-menu">
            {!burgerMenuOpen ? (
              <Icon
                icon="iconamoon:menu-burger-horizontal"
                width="30"
                height="30"
                style={{ color: "#284551" }}
                onClick={handleOpen}
                className="icon"
              />
            ) : (
              <Icon
                icon="proicons:cancel"
                width="30"
                height="30"
                style={{ color: "#284551" }}
                onClick={handleClose}
                className="icon"
              />
            )}
          </div>
        </div>

        <AnimatePresence>
          {burgerMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              key="burger-menu-list"
              className="burger-menu-list"
            >
              <ul className="burger-menu-list-item">
                {[
                  "lucide:search",
                  "mingcute:shopping-bag-2-line",
                  "mdi:heart-outline",
                ].map((tab, index) => (
                  <motion.li
                    variants={itemVariant}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0, translateY: -10 }}
                    key={index}
                    custom={index}
                  >
                    <Icon
                      icon={tab}
                      width="28"
                      height="28"
                      className="icon"
                      style={{ color: "#DAF1F3" }}
                    />
                  </motion.li>
                ))}
              </ul>
              <motion.button
                initial={{ translateX: -20, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ opacity: 0, translateX: -20 }}
                transition={{ duration: 0.3 }}
                className="btn first-btn"
                onClick={() => navigate("/login")}
              >
                Log in
              </motion.button>
              <motion.button
                initial={{ translateX: -20, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ opacity: 0, translateX: -20 }}
                transition={{ duration: 0.6 }}
                className="btn primary-btn"
                onClick={() => navigate("/register")}
              >
                Create an Account
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      {path !== "/" && scroll === 0 && <Category />}
    </motion.section>
  );
};

export default Navbar;
