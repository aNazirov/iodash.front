import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { LessonList } from "../core/components/shared/lesson";
import { wrapper } from "../core/store";
import { autoLogIn } from "../core/store/global";
import { useAppDispatch, useAppSelector } from "../core/store/hooks";
import { clearLessons, getLessons } from "../core/store/lessons";
import { getMainPageData } from "../core/store/main";
import { clearSubscriptions } from "../core/store/subscriptions";

const AboutUs: React.FC = () => {
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
      <h2 className="title title_indent-bt-small">About Us</h2>
      <p className="sub-title">
        Design better websites and spend less time without restricting creative
        freedom
      </p>
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

export default AboutUs;
