import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CImg, CLink } from "../../core/components/shared";
import { LessonList } from "../../core/components/shared/lesson";
import { PrivateComponent } from "../../core/components/shared/private";
import { TechnologyItem } from "../../core/components/shared/technology";
import { IRole } from "../../core/helpers/utils/enums";
import { IFile } from "../../core/interfaces";
import { download, favourite } from "../../core/services";
import { wrapper } from "../../core/store";
import { autoLogIn, updateUser } from "../../core/store/global";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import { clearLessons, getLesson, getLessons } from "../../core/store/lessons";
import { getMainPageData } from "../../core/store/main";

const Lesson: React.FC = () => {
  const { pathname } = useRouter();
  const { token } = useAppSelector((state) => state.global);
  const { lesson } = useAppSelector((state) => state.lessons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(
      getLessons({
        token: token ?? "",
        params: {
          tag: lesson?.tags[+(Math.random() * 100).toFixed(2)],
        },
      })
    );

    return () => {
      promise.abort();
      dispatch(clearLessons());
    };
  }, [lesson]);

  const onDownload = (id: number) => async () => {
    const file: IFile = await download(id, token ?? "");

    if (file) {
      axios.get(file.url, { responseType: "blob" }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.name); //or any other extension
        document.body.appendChild(link);

        link.click();

        link.parentNode?.removeChild(link);
        URL.revokeObjectURL(url);
      });
    }
  };

  const onFavoutrite = (id: number) => async () => {
    const res = await favourite(id, token ?? "");

    dispatch(updateUser({ user: res }));
  };

  return (
    <section className="main-content">
      <h2 className="title">{lesson?.title}</h2>
      <div className="card">
        <div className="card__photo">
          <CImg
            src={lesson?.poster?.url ?? "/img/src/card-img-1.jpg"}
            alt="photo"
          />
        </div>
        <div className="card__description">
          {lesson?.technologies.map((x, i) => (
            <TechnologyItem
              key={`lesson-${x.id}-tag-${x.id}-${i}`}
              technology={x}
            />
          ))}
          <div className="statistics">
            <div className="statistics-item">
              <div className="statistics-item__icon">
                <CImg src="/img/bg/download.svg" alt="icon" />
              </div>
              <span className="statistics-item__text">
                <span>{lesson?._count?.downloads}</span>Download
              </span>
            </div>
            <div className="statistics-item">
              <div className="statistics-item__icon">
                <CImg src="/img/bg/views.svg" alt="icon" />
              </div>
              <span className="statistics-item__text">
                <span>{lesson?._count?.views}</span>Views
              </span>
            </div>
          </div>
          <p>{lesson?.description}</p>
          <hr />
          <dl className="social">
            <dt>Follow us</dt>
            <dd>
              <a href="#">
                <CImg src="/img/bg/instagram.svg" alt="instagram" />
              </a>
            </dd>
            <dd>
              <a href="#">
                <CImg src="/img/bg/twitter.svg" alt="twitter" />
              </a>
            </dd>
            <dd>
              <a href="#">
                <CImg src="/img/bg/facebook.svg" alt="facebook" />
              </a>
            </dd>
            <dd>
              <a href="#">
                <CImg src="/img/bg/telegram.svg" alt="telegram" />
              </a>
            </dd>
            <dd>
              <a href="#">
                <CImg src="/img/bg/vkontakte.svg" alt="vkontakte" />
              </a>
            </dd>
            <dd>
              <a href="#">
                <CImg src="/img/bg/pinterest.svg" alt="pinterest" />
              </a>
            </dd>
          </dl>
          <div className="widget">
            <div className="price-panel">
              <div className="price-panel__logo">
                <CImg src="/img/bg/w-logo.svg" alt="logo" />
              </div>
              <div className="price-panel__description">
                <span>Price:</span>
                <strong>${lesson?.price} USD</strong>
              </div>
            </div>
            <div className="widget__btn-panel">
              <PrivateComponent
                accessRoles={[IRole.admin, IRole.user]}
                alternative={
                  <CLink
                    href={"/price"}
                    className="btn btn_big-size btn_big-radius"
                  >
                    Update Plan
                  </CLink>
                }
              >
                <button
                  onClick={onDownload(lesson?.id ?? 0)}
                  className="btn btn_big-size btn_big-radius"
                >
                  Download
                </button>
              </PrivateComponent>
              {/* <a
                href="#"
                className="btn btn_big-size btn_big-radius btn_transparent-color"
              >
                Add to Cart
              </a> */}
              <PrivateComponent
                accessRoles={
                  lesson?.isFavourite ? [] : [IRole.admin, IRole.user]
                }
              >
                <button
                  onClick={onFavoutrite(lesson?.id ?? 0)}
                  className="like"
                >
                  like
                </button>
              </PrivateComponent>
            </div>
            <div className="discount-panel">
              <span>20%</span>
              <a href="#">on all Premium plans</a>
            </div>
          </div>
        </div>
      </div>
      <dl className="tags">
        <dt>Tags</dt>
        <dd>
          {lesson?.tags.map((x, i) => {
            const href = `/tag/${x.id}`;

            return (
              <CLink
                key={`lesson-${x.id}-tag-${x.id}-${i}`}
                className="tag"
                href={
                  pathname !== href
                    ? {
                        pathname: "/tag/[id]",
                        query: { id: x.id, title: x.title },
                      }
                    : ""
                }
              >
                {x.title}
              </CLink>
            );
          })}
        </dd>
      </dl>
      <h2 className="title">You may also like</h2>
      <LessonList classNames="works works_changed" />
    </section>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req: { cookies }, query }: GetServerSidePropsContext) => {
      const {
        global: { token },
      } = store.getState();

      if (cookies["token"] && !token) {
        await store.dispatch(autoLogIn(cookies["token"]));
      }

      await store.dispatch(getMainPageData({}));
      await store.dispatch(
        getLesson({ id: +(query.id ?? 0), token: token ?? "" })
      );

      return {
        props: {},
      };
    }
);

export default Lesson;
