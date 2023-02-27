import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { LessonList } from "../core/components/shared/lesson";
import { wrapper } from "../core/store";
import { autoLogIn } from "../core/store/global";
import { useAppDispatch, useAppSelector } from "../core/store/hooks";
import { clearLessons, getLessons } from "../core/store/lessons";
import { getMainPageData } from "../core/store/main";
import { clearSubscriptions } from "../core/store/subscriptions";

const Support: React.FC = () => {
  const { token } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(
      getLessons({
        token: token ?? "",
      })
    );
    return () => {
      promise.abort();
      dispatch(clearSubscriptions());
      dispatch(clearLessons());
    };
  }, []);

  return (
    <section className="main-content">
      <h2 className="title title_indent-bt-small">Get In Touch</h2>
      <p className="sub-title">
        Design better websites and spend less time without restricting creative
        freedom
      </p>
      <div className="support-form">
        <form>
          <fieldset>
            <ul className="support-form__list">
              <li>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
              </li>
              <li>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  className="phone-input"
                  type="tel"
                  name="phone"
                  placeholder="(+12) 345 - 678"
                />
              </li>
              <li>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </li>
            </ul>
          </fieldset>
          <fieldset>
            <label htmlFor="message">Message</label>
            <div className="textarea-wrap">
              <textarea
                id="message"
                className="textarea"
                placeholder="Hi there! I would like to get in touch because..."
                maxLength={100}
              ></textarea>
              <div className="count">
                <span className="current">0</span>
                <span className="maximum">/100</span>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <button className="btn btn_md-size btn_shadow" type="submit">
              Send Message
            </button>
          </fieldset>
        </form>
      </div>
      <h2 className="title">You may also like</h2>
      <LessonList classNames="works works_changed" />
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
        await store.dispatch(autoLogIn(cookies["token"]));
      }

      await store.dispatch(getMainPageData({}));

      return {
        props: {},
      };
    }
);

export default Support;
