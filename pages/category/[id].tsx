import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LessonList } from "../../core/components/shared/lesson";
import { wrapper } from "../../core/store";
import { autoLogIn } from "../../core/store/global";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import { clearLessons, getLessons } from "../../core/store/lessons";
import { getMainPageData } from "../../core/store/main";

const Category: React.FC = () => {
  const { query } = useRouter();
  const { token } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(
      getLessons({
        token: token ?? "",
        params: { categoryId: +(query.id ?? 0) },
      })
    );

    return () => {
      promise.abort();
      dispatch(clearLessons());
    };
  }, [query.id]);

  return (
    <section className="main-content">
      <h2 className="title">{query.title}</h2>
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

export default Category;
