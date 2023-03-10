import axios from "axios";
import { Toast } from "../../../helpers/utils";
import { IRole } from "../../../helpers/utils/enums";
import { defaultImage } from "../../../helpers/_data/datas";
import { IFile, ILesson } from "../../../interfaces";
import { download, favourite } from "../../../services";
import { updateUser } from "../../../store/global";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CImg } from "../img";
import { CLink } from "../link";
import { PrivateComponent } from "../private";
import { TechnologyItem } from "../technology";

interface ILessonItemProps {
  token: string;
  lesson: ILesson;
}

export const LessonItem: React.FC<ILessonItemProps> = ({ token, lesson }) => {
  const href = `/work/${lesson.id}`;
  const dispatch = useAppDispatch();

  const onDownload = (id: number) => async () => {
    const file: IFile = await download(id, token);

    if (file) {
      Toast.promise(
        axios.get(file.url, { responseType: "blob" }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", file.name); //or any other extension
          document.body.appendChild(link);

          link.click();

          link.parentNode?.removeChild(link);
          URL.revokeObjectURL(url);
        }),
        {
          pending: "Start downloading ...",
          success: "Downloaded",
        }
      );
    }
  };

  const onFavoutrite = (id: number) => async () => {
    const res = await favourite(id, token);

    dispatch(updateUser({ user: res }));
  };

  return (
    <div className="work">
      <div className="work__photo">
        <CLink href={href}>
          <CImg src={lesson.poster?.url ?? defaultImage} alt={lesson.title} />
        </CLink>
      </div>
      <h3 className="work__title">
        <CLink href={href}>{lesson.title} </CLink>
      </h3>
      <div className="programs">
        {lesson.technologies.map((x, i) => (
          <TechnologyItem
            key={`lesson-${lesson.id}-technology-${x.id}-${i}`}
            technology={x}
          />
        ))}
      </div>
      <div className="work__bottom-panel">
        <span className="work__price">${lesson.price}</span>

        <div className="work__right-col">
          <PrivateComponent
            accessRoles={lesson.isFavourite ? [] : [IRole.admin, IRole.user]}
          >
            <button onClick={onFavoutrite(lesson.id)} className="like">
              like
            </button>
          </PrivateComponent>
          <PrivateComponent
            accessRoles={[IRole.admin, IRole.user]}
            alternative={
              <CLink
                href={"/price"}
                className="btn btn_big-size btn__blue-color"
              >
                Update Plan
              </CLink>
            }
          >
            <button
              onClick={onDownload(lesson.id)}
              className="btn btn_big-size btn__blue-color"
            >
              Download
            </button>
          </PrivateComponent>
        </div>
      </div>
    </div>
  );
};

interface ILessonListProps {
  classNames?: "works" | "works works_changed";
}

export const LessonList: React.FC<ILessonListProps> = ({
  classNames = "works",
}) => {
  const { token } = useAppSelector((state) => state.global);
  const { lessons } = useAppSelector((state) => state.lessons);
  return (
    <div className={classNames}>
      {lessons.map((x, i) => (
        <LessonItem
          key={`lesson-item-${x}-${i}`}
          token={token ?? ""}
          lesson={x}
        />
      ))}
    </div>
  );
};
