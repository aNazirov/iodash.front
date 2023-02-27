import { defaultImage } from "../../../helpers/_data/datas";
import { ITechnology } from "../../../interfaces";
import { CImg } from "../img";

interface ITechnologyItemProps {
  technology: ITechnology;
}

export const TechnologyItem: React.FC<ITechnologyItemProps> = ({
  technology,
}) => {
  return (
    <span className="program-name">
      <CImg
        className="program-name__logo"
        src={technology.icon?.url ?? defaultImage}
        alt="Figma"
      />
      <span className="program-name__text">{technology.title}</span>
    </span>
  );
};
