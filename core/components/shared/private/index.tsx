import { PropsWithChildren } from "react";
import { IRole } from "../../../helpers/utils/enums";
import { useAppSelector } from "../../../store/hooks";

interface Props extends PropsWithChildren {
  accessRoles: IRole[];
  alternative?: React.ReactNode | null;
}

export const PrivateComponent: React.FC<Props> = ({
  accessRoles,
  alternative = null,
  children = null,
}) => {
  const { user } = useAppSelector((state) => state.global);

  const access = user && accessRoles.includes(user.role.id);

  return <>{access ? children : alternative}</>;
};
