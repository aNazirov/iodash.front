import { defaultImage } from "../../../helpers/_data/datas";
import { ITag } from "../../../interfaces";
import { CImg } from "../img";

interface ITagItemProps {
  tag: ITag;
}

export const TagItem: React.FC<ITagItemProps> = ({ tag }) => {
  return (
    <span className="program-name">
      <CImg
        className="program-name__logo"
        src={tag.icon?.url ?? defaultImage}
        alt="Figma"
      />
      <span className="program-name__text">{tag.title}</span>
    </span>
  );
};
