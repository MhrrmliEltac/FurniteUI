import Logo from "../../assets/images/Logo.png";
import LogoDark from "../../assets/images/Logo-fill.png";
import Category from "../home/Category";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteProfileToken } from "../store/slice/UserSlice";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios, { isAxiosError } from "axios";
import { Button } from "@mui/material";
import { debounce } from "lodash";
import "../../assets/styles/navbar.css";
import { ProductDataType } from "@/types/Type";

const Navbar = () => {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);
  const [profileDropdown, setProfileDropdown] = useState<boolean>(false);
  const [searchInp, setSearchInp] = useState<string>("");
  const [result, setResult] = useState<ProductDataType[] | null>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isUser = useAppSelector((state) => state.userReducer.user);
  const path = location.pathname;

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getSearchData = async (name: string) => {
    try {
      const res = await axios.get(
        `https://furniture-server-two.vercel.app/api/search?query=${name}`
      );
      const product = await res.data.product;
      setResult(product);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      getSearchData(query);
    }, 500),
    []
  );

  const handleOpen = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  const handleClose = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };

  const logOut = async () => {
    await dispatch(deleteProfileToken());
    toast.success("Logged out successfully");
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

  const navigateLink = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const tab = e.currentTarget;
    if (tab.innerText === "Search") {
      console.log("isledi");
    } else if (tab.innerText === "Basket") {
      navigate("/check-out");
    } else if (tab.innerText === "Favourite") {
      navigate("/wishlist");
    }
  };

  const handleChangeSearchInp = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInp(e.target.value);
    if (e.target.value) {
      debouncedSearch(e.target.value);
    }
  };

  const handleNavigate = (id: string) => {
    navigate({
      pathname: "/product-detail",
      search: `${createSearchParams({
        id: id,
      })}`,
    });
    setResult(null);
    setSearchInp("");
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
      <motion.nav className="navbar relative">
        <div className="left-side">
          <img
            src={scroll === 0 && path === "/" ? Logo : LogoDark}
            alt="logo"
            className="logo"
            onClick={() => navigate("/")}
          />
        </div>

        {showSearch && (
          <AnimatePresence>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 0.5 }}
              exit={{ width: 0 }}
              className="w-[50%] flex justify-end"
            >
              <input
                className={`w-full ${
                  location.pathname === "/" && scroll === 0
                    ? "placeholder:text-white"
                    : "placeholder:text-[#284551]"
                } border-b-2 outline-none ${
                  location.pathname === "/" ? "text-white" : "text-[#284551]"
                } appearance-none`}
                type="search"
                name="search"
                id="search"
                placeholder="Search"
                value={searchInp}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeSearchInp(e)
                }
              />
            </motion.div>
          </AnimatePresence>
        )}

        {result && result.length > 0 && searchInp && (
          <div className=" absolute left-[0%] top-[100%] w-full rounded-md search-product shadow-md z-[9999]">
            {result?.map((product: ProductDataType) => (
              <div
                key={product._id}
                className="flex gap-5 items-center justify-between product-box"
              >
                <div className="w-fit flex items-center gap-5">
                  <div className="w-16 h-16">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="object-cover h-full w-full rounded-lg"
                    />
                  </div>
                  <p className="text-white font-bold text-xl">{product.name}</p>
                </div>
                <Button
                  sx={{
                    display: "flex",
                    padding: "0.5rem 2rem",
                    background: "white",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "15px",
                    "&:hover": {
                      boxShadow: "2px 2px 4px 2px rgba(133, 88, 170, 1)",
                      transition: "all 0.2s ease-in",
                    },
                  }}
                  onClick={() => handleNavigate(product._id)}
                >
                  More
                </Button>
              </div>
            ))}
          </div>
        )}

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
                onClick={() => setShowSearch(!showSearch)}
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
                onClick={() => navigate("/check-out")}
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
          {isUser?._id ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Icon
                    icon="lucide:user-round"
                    width="28"
                    height="28"
                    style={{
                      color:
                        scroll === 0 && path === "/" ? "#DAF1F3" : "#284551",
                      cursor: "pointer",
                    }}
                    className="lg:flex hidden"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 z-20 bg-white"
                  style={{
                    padding: "20px 10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <DropdownMenuLabel style={{ fontSize: "15px" }}>
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer hover:bg-red border-none rounded-none"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer rounded-none">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logOut}
                    className="cursor-pointer rounded-none"
                  >
                    {" "}
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
                style={{
                  color: scroll === 0 && path === "/" ? "#DAF1F3" : "#284551",
                }}
                onClick={handleOpen}
                className="icon cursor-pointer"
              />
            ) : (
              <Icon
                icon="proicons:cancel"
                width="30"
                height="30"
                style={{
                  color: scroll === 0 && path === "/" ? "#DAF1F3" : "#284551",
                }}
                onClick={handleClose}
                className="icon cursor-pointer"
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
              <ul className="burger-menu-list-item items-start justify-start">
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
                    className="flex gap-2 items-center"
                  >
                    <Icon
                      icon={tab}
                      width="28"
                      height="28"
                      className="icon"
                      style={{ color: "#DAF1F3" }}
                    />
                    {tab === "lucide:search" ? (
                      <p
                        onClick={(e: React.MouseEvent<HTMLParagraphElement>) =>
                          navigateLink(e)
                        }
                        className="text-[#DAF1F3]"
                      >
                        Search
                      </p>
                    ) : tab === "mingcute:shopping-bag-2-line" ? (
                      <p
                        onClick={(e: React.MouseEvent<HTMLParagraphElement>) =>
                          navigateLink(e)
                        }
                        className="text-[#DAF1F3]"
                      >
                        Basket
                      </p>
                    ) : tab === "mdi:heart-outline" ? (
                      <p
                        onClick={(e: React.MouseEvent<HTMLParagraphElement>) =>
                          navigateLink(e)
                        }
                        className="text-[#DAF1F3]"
                      >
                        Favourite
                      </p>
                    ) : null}
                  </motion.li>
                ))}
                {isUser?._id ? (
                  <div className="flex flex-col items-start justify-start">
                    <div
                      className="flex justify-start gap-2 items-center"
                      onClick={() => setProfileDropdown(!profileDropdown)}
                    >
                      <Icon
                        icon="lucide:user-round"
                        width="28"
                        height="28"
                        style={{
                          color: "#DAF1F3",
                          cursor: "pointer",
                        }}
                      />
                      <p className="text-[#DAF1F3]">User</p>
                    </div>
                    <AnimatePresence>
                      {profileDropdown && (
                        <motion.ul className="flex flex-col gap-5 text-white profile-list">
                          <motion.li
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.01 }}
                            exit={{ opacity: 0 }}
                            onClick={() => navigate("/profile")}
                          >
                            Profile
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.07 }}
                            exit={{ opacity: 0 }}
                          >
                            Settings
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.13 }}
                            exit={{ opacity: 0 }}
                            onClick={logOut}
                          >
                            Log out
                          </motion.li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      {path !== "/" && scroll === 0 && <Category />}
    </motion.section>
  );
};

export default Navbar;
