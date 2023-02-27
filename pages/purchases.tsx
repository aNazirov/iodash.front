import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { LessonList } from "../core/components/shared/lesson";
import { wrapper } from "../core/store";
import { autoLogIn } from "../core/store/global";
import { useAppDispatch, useAppSelector } from "../core/store/hooks";
import { clearLessons, getLessons } from "../core/store/lessons";
import { getMainPageData } from "../core/store/main";

const Favourites: React.FC = () => {
  const { token } = useAppSelector((state) => state.global);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(
      getLessons({
        token: token!,
        params: { isDownloads: true },
      })
    );

    return () => {
      promise.abort();
      dispatch(clearLessons());
    };
  }, []);

  return (
    <section className="main-content">
      <h2 className="title">My Purchases</h2>
      <LessonList />
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

export default Favourites;
