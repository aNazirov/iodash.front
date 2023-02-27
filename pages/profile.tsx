import { GetServerSidePropsContext } from "next";
import { useCallback, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { CImg } from "../core/components/shared";
import { PriceItem } from "../core/components/shared/price";
import { classNames, formatData, imageUpload } from "../core/helpers/utils";
import { fileDelete, filesUpload, updateService } from "../core/services";
import { wrapper } from "../core/store";
import { autoLogIn, updateUser } from "../core/store/global";
import { useAppDispatch, useAppSelector } from "../core/store/hooks";
import { getMainPageData } from "../core/store/main";

const defaultAvatar = "/img/src/user.jpg";
type ITab = "Profile" | "Payment";

type IFormData = {
  name?: string;
  email?: string;
  password?: string;
  avatarId?: string;
};

const Profile: React.FC = () => {
  const { token, user } = useAppSelector((state) => state.global);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: { name: user?.name, email: user?.contact.email },
  });

  const [activeTab, setActiveTab] = useState<ITab>("Profile");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(
    user?.avatar?.url ?? defaultAvatar
  );

  const id = useId();
  const dispatch = useAppDispatch();
  const _setActiveTab = useCallback(
    (tab: ITab) => () => setActiveTab(tab),
    [setActiveTab]
  );

  const update = async (data: IFormData) => {
    let avatarId = undefined;

    if (file) {
      avatarId = (await filesUpload(formatData({ files: [file] })))[0].id;
    }

    const res = await updateService(
      user!.id,
      token!,
      { ...data, avatarId },
      "user"
    );

    dispatch(updateUser({ user: res }));
  };

  const imageDelete = async (id: number) => {
    setLoading(true);

    await fileDelete(id);

    setLoading(false);
  };

  const onDelete = (id?: number) => async () => {
    setPreview(defaultAvatar);
    setFile(null);
    id && (await imageDelete(id));
  };

  return (
    <section className="main-content">
      <div className="profile">
        <div className="profile-nav">
          <nav>
            <ul>
              <li
                className={classNames(activeTab === "Profile" && "active")}
                onClick={_setActiveTab("Profile")}
              >
                <div className="profile-nav__icon profile-nav__icon_user"></div>
                <span className="profile-nav__text">My profile</span>
              </li>
              <li
                className={classNames(activeTab === "Payment" && "active")}
                onClick={_setActiveTab("Payment")}
              >
                <div className="profile-nav__icon profile-nav__icon_card"></div>
                <span className="profile-nav__text">Payment pending</span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="profile__content">
          <div
            className={classNames(
              "profile__item",
              activeTab === "Profile" && "active"
            )}
          >
            <div className="profile-panel">
              <div className="profile-panel__photo">
                <CImg src={preview} alt="photo" />
              </div>
              <div className="profile-panel__description">
                <span className="profile-panel__name">Profile Picture</span>
                <div className="profile-panel__btns">
                  <label htmlFor={id} className="btn btn_violet-color">
                    Replace image
                  </label>
                  <button
                    onClick={onDelete(user?.avatar?.id)}
                    className="btn btn_violet-color"
                  >
                    Delete image
                  </button>
                  <input
                    id={id}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={loading}
                    onChange={imageUpload(setPreview, setFile)}
                  />
                </div>
              </div>
            </div>
            <h2 className="md-title">My profile</h2>
            <div className="profile-form">
              <form onSubmit={handleSubmit(update)}>
                <fieldset>
                  <ul className="profile-form__list">
                    <li>
                      <label htmlFor="name">Full name</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name", { required: "Name is required" })}
                      />
                      <p>{errors.name && errors.name.message}</p>
                    </li>
                    <li>
                      <label htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                      <p>{errors.email && errors.email.message}</p>
                    </li>
                    <li>
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        {...register("password", { required: false })}
                      />
                    </li>
                  </ul>
                </fieldset>
                <fieldset>
                  <button
                    className="btn btn_big-size btn__blue-color"
                    type="submit"
                  >
                    Update
                  </button>
                </fieldset>
              </form>
            </div>
            <h2 className="md-title">You can delete your account</h2>
          </div>
          <div
            className={classNames(
              "profile__item",
              activeTab === "Payment" && "active"
            )}
          >
            <h2 className="md-title">Current Plan</h2>
            {user?.subscriptionType && (
              <PriceItem
                subscription={user.subscriptionType}
                currentSubscriptionId={user.subscriptionType.id}
                className="price-item price-item_changed"
              />
            )}
            {/* <h2 className="md-title">Payment method</h2>
            <div className="card-panel">
              <div className="card-panel__in">
                <div className="card-panel__col">
                  <dl>
                    <dt>Select payment account</dt>
                    <dd>Debit Card **** 7890</dd>
                  </dl>
                  <div className="payment">
                    <div className="payment__item">
                      <CImg src="/img/src/visa.svg" alt="visa" />
                    </div>
                    <div className="payment__item">
                      <CImg src="/img/src/mastercard.svg" alt="mastercard" />
                    </div>
                  </div>
                </div>
                <a href="#" className="btn btn_big-size btn__blue-color">
                  Update card
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req: { cookies } }: GetServerSidePropsContext) => {
      const {
        global: { token, user },
      } = store.getState();

      if (cookies["token"] && !token) {
        await store.dispatch(autoLogIn(cookies["token"]));
      } else if (!cookies["token"] && !user && !token) {
        return {
          redirect: {
            permanent: false,
            destination: "/auth/sign-in",
          },
        };
      }

      await store.dispatch(getMainPageData({}));

      return {
        props: {},
      };
    }
);

export default Profile;
