import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CImg, CLink } from "../../core/components/shared";
import { wrapper } from "../../core/store";
import { loginByPassword } from "../../core/store/global";
import { useAppDispatch } from "../../core/store/hooks";
import { getMainPageData } from "../../core/store/main";

type IFormData = {
  login: string;
  password: string;
};

const Registration: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormData>();

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(async (data: IFormData) => {
    const res = await dispatch(loginByPassword(data));

    if (res) {
      push("/");
    }
  });

  return (
    <section className="main-content">
      <div className="registration">
        <div className="registration__photo">
          <CImg src="/img/src/registration-img.jpg" alt="photo" />
        </div>
        <div className="registration-form">
          <h2 className="registration-form__title">Sign in</h2>
          {/* <a
            href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=312328952233-b50m26lpvl0q282jkv8kc5v9niv02kdj.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Faliexpress.ru%2Foauth%2Fcallback%3Fsns_type%3Dgoogle&state=7840921395905041922&service=lso&o2v=2&flowName=GeneralOAuthFlow"
            target="blank"
            className="google-btn"
          >
            <span className="google-btn__icon">
              <CImg src="/img/bg/google.svg" alt="icon" />
            </span>
            <span className="google-btn__text">Sign Up with Google</span>
          </a>
          <span className="registration-form__sub-title">
            <span>Or sign up with email</span>
          </span> */}
          <form onSubmit={onSubmit}>
            {/* <fieldset>
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                {...register("name", { required: "Should not be empty" })}
              />
            </fieldset> */}
            <fieldset>
              <label htmlFor="login">Email Address</label>
              <input
                id="login"
                type="email"
                placeholder="Enter email address"
                {...register("login", { required: "Should not be empty" })}
              />
              <p>{errors.login ? errors.login.message : ""}</p>
            </fieldset>
            <fieldset>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password", { required: "Should not be empty" })}
              />
              <p>{errors.password ? errors.password.message : ""}</p>
            </fieldset>
            <fieldset>
              <button className="registration-form__btn" type="submit">
                SIGN IN
              </button>
            </fieldset>
          </form>
          <p>
            Create an account<CLink href="/auth/sign-up">Sign up</CLink>
          </p>
          <small className="registration__small-text">
            By clicking &apos;Continue&apos;, you acknowledge that you have read
            and accept the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </small>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req: { cookies } }: GetServerSidePropsContext) => {
      const {
        global: { token },
      } = store.getState();

      if (cookies["token"] && !token) {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }

      await store.dispatch(getMainPageData({}));

      return {
        props: {},
      };
    }
);

export default Registration;
