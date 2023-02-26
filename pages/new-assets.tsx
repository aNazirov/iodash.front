import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { LessonList } from "../core/components/shared/lesson";
import { wrapper } from "../core/store";
import { autoLogIn } from "../core/store/global";
import { useAppSelector, useAppDispatch } from "../core/store/hooks";
import { getLessons, clearLessons } from "../core/store/lessons";
import { getMainPageData } from "../core/store/main";

const NewAssets: React.FC = () => {
  const { token } = useAppSelector((state) => state.global);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(
      getLessons({
        token: token!,
        params: { isFavourites: true },
      })
    );

    return () => {
      promise.abort();
      dispatch(clearLessons());
    };
  }, []);
  
  return (
    <section className="main-content">
      <h2 className="title">New assets page</h2>
      <LessonList  />
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

export default NewAssets;
