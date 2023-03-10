import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { classNames } from "../../../helpers/utils";
import { IRole } from "../../../helpers/utils/enums";
import { userLogout } from "../../../store/global";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CImg, CLink } from "../../shared";
import { PrivateComponent } from "../../shared/private";

export const Header: FC = () => {
  const { pathname } = useRouter();
  const { user, newAssets } = useAppSelector((state) => state.global);

  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useAppDispatch();

  const toggleMenu = useCallback(
    () => setMenuOpen((prev) => !prev),
    [setMenuOpen]
  );

  const logout = () => dispatch(userLogout());

  return (
    <header className="header">
      <div className="container">
        <div className="header__in">
          <div className="logo">
            <CLink href={pathname !== "/" ? "/" : ""}>
              <CImg src="/img/bg/logo.svg" alt="iodash" />
            </CLink>
          </div>
          <button
            className={classNames("menu-btn", menuOpen ? "open" : "")}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div
            className={classNames("header__right-col", menuOpen ? "show" : "")}
          >
            <nav className="main-nav">
              <ul>
                <li className={classNames(pathname === "/price" && "active")}>
                  <CLink href={pathname !== "/price" ? "/price" : ""}>
                    Pricing
                  </CLink>
                </li>
                <li className={classNames(pathname === "/info" && "active")}>
                  <CLink href={pathname !== "/info" ? "/info" : ""}>
                    Privacy Policy
                  </CLink>
                </li>
                <li
                  className={classNames(pathname === "/about-us" && "active")}
                >
                  <CLink href={pathname !== "/about-us" ? "/about-us" : ""}>
                    About us
                  </CLink>
                </li>
                <li className={classNames(pathname === "/support" && "active")}>
                  <CLink href={pathname !== "/support" ? "/support" : ""}>
                    Support
                  </CLink>
                </li>
              </ul>
            </nav>
            <div className="header__col">
              <PrivateComponent
                accessRoles={[IRole.admin, IRole.user]}
                alternative={
                  <CLink
                    href="/auth/sign-in"
                    className="btn btn_big-size btn__blue-color"
                  >
                    Login
                  </CLink>
                }
              >
                <CLink href="/new-assets" className="btn">
                  New assets<span className="btn__number">{newAssets}</span>
                </CLink>
                <div className="user-panel">
                  <div className="favourites">
                    <CLink
                      href={pathname !== "/favourites" ? "/favourites" : ""}
                    >
                      <span className="favourites__number">
                        {user?._count.favourites}
                      </span>
                      <span className="gl-icon">
                        <div className="icon">
                          <CImg src="/img/bg/heart.svg" alt="icon" />
                        </div>
                      </span>
                    </CLink>
                  </div>
                  <div className="account">
                    <div className="account__in">
                      <span className="gl-icon">
                        <div className="icon">
                          <CImg src="/img/bg/user.svg" alt="icon" />
                        </div>
                      </span>
                      <div className="account__info">
                        <span className="account__name">{user?.name}</span>
                        <span className="account__text">My Account</span>
                      </div>
                    </div>
                    <div className="account__dropdown">
                      <div className="account__dropdown-in">
                        <span className="account__user">{user?.name}</span>
                        <ul className="account__list">
                          <li>
                            <CLink
                              href={pathname !== "/profile" ? "/profile" : ""}
                            >
                              <span className="account__icon">
                                <CImg
                                  src="/img/bg/account-icon-1.svg"
                                  alt="icon"
                                />
                              </span>
                              <span className="account__link">My profile</span>
                            </CLink>
                          </li>
                          <li>
                            <CLink
                              href={
                                pathname !== "/purchases" ? "/purchases" : ""
                              }
                            >
                              <span className="account__icon">
                                <CImg
                                  src="/img/bg/account-icon-2.svg"
                                  alt="icon"
                                />
                              </span>
                              <span className="account__link">Purchases</span>
                            </CLink>
                          </li>
                          <li>
                            <CLink
                              href={pathname !== "/profile" ? "/profile" : ""}
                            >
                              <span className="account__icon">
                                <CImg
                                  src="/img/bg/account-icon-3.svg"
                                  alt="icon"
                                />
                              </span>
                              <span className="account__link">
                                Account Settings
                              </span>
                            </CLink>
                          </li>
                          <li onClick={logout}>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <span className="account__icon">
                                <CImg
                                  src="/img/bg/account-icon-4.svg"
                                  alt="icon"
                                />
                              </span>
                              <span className="account__link">Disconnect</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </PrivateComponent>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
