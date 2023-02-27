import { GetServerSidePropsContext } from "next";
import { FC, useEffect } from "react";
import { LessonList } from "../core/components/shared/lesson";
import { wrapper } from "../core/store";
import { autoLogIn } from "../core/store/global";
import { useAppDispatch, useAppSelector } from "../core/store/hooks";
import { clearLessons, getLessons } from "../core/store/lessons";
import { getMainPageData } from "../core/store/main";

const Main: FC = () => {
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
      dispatch(clearLessons());
    };
  }, []);

  return (
    <section className="main-content">
      <div className="search">
        <h1 className="search__title">
          Everything you need to
          <br /> build your site
        </h1>
        <p>Amaizing UI Elements for your web design</p>
        <div className="search__form">
          <form>
            <input
              type="text"
              name="search"
              placeholder="Search items, collections, and accounts"
            />
            <button type="submit" className="search__btn">
              search
            </button>
          </form>
        </div>
      </div>
      <h2 className="title">Works</h2>
      <LessonList />
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

export default Main;
