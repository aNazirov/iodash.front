import { useCallback } from "react";
import { IRole } from "../../../helpers/utils/enums";
import { ISubscriptionType } from "../../../interfaces";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { subscribeThunk, unsubscribeThunk } from "../../../store/subscriptions";
import { CImg } from "../img";
import { CLink } from "../link";
import { PrivateComponent } from "../private";

interface IPriceItemProps {
  className?: "price-item" | "price-item price-item_changed";
  currentSubscriptionId?: number;
  subscription: ISubscriptionType;
}

export const PriceItem: React.FC<IPriceItemProps> = ({
  className = "price-item",
  subscription,
  currentSubscriptionId,
}) => {
  const isCurrentSubscription = currentSubscriptionId === subscription.id;
  const points = (subscription.points?.split(",") as string[]) ?? [];
  const dispatch = useAppDispatch();

  const onClick = useCallback(async () => {
    isCurrentSubscription
      ? await dispatch(unsubscribeThunk({ id: subscription.id }))
      : await dispatch(subscribeThunk({ id: subscription.id }));
  }, [dispatch, isCurrentSubscription]);

  return (
    <div className={className}>
      <div className="price-item__top-col">
        <div className="price-item__top-panel">
          <h3 className="price-item__title">{subscription.title}</h3>
        </div>
        <span className="price-item__sub-title">
          {subscription.downloadsPerDay} downloads per day
        </span>
        <div className="price-item__number">
          <strong>${subscription.price}</strong>
          <i></i>
          <span>
            {subscription.months} month{subscription.months > 1 ? "s" : ""}
          </span>
        </div>
        <p className="price-item__text">{subscription.description}</p>
      </div>
      <div className="price-item__bottom-col">
        <ul className="price-item__list">
          {points.map((x, i) => (
            <li key={`point-${x}-${i}`}>{x}</li>
          ))}
        </ul>
        <span className="program-name">
          <CImg
            className="program-name__logo"
            src="/img/src/figma.svg"
            alt="Figma"
          />
          <span className="program-name__text">Figma</span>
        </span>
        <PrivateComponent
          accessRoles={[IRole.admin, IRole.user]}
          alternative={
            <CLink
              href="/auth/sign-in"
              className="btn btn_big-size btn__blue-color"
            >
              Login
            </CLink>
          }
        >
          {!isCurrentSubscription ? (
            <button
              className="btn btn_big-size btn__blue-color"
              onClick={onClick}
            >
              Get started
            </button>
          ) : (
            <button
              className="btn btn_big-size btn__blue-color"
              onClick={onClick}
            >
              Unsubscribe
            </button>
          )}
        </PrivateComponent>
      </div>
    </div>
  );
};

export const PriceList = () => {
  const { user } = useAppSelector((state) => state.global);
  const { subscriptions } = useAppSelector((state) => state.subscriptions);

  return (
    <div className="pricing">
      {subscriptions.map((x, i) => (
        <PriceItem
          key={`price-item-${x}-${i}`}
          subscription={x}
          currentSubscriptionId={user?.subscriptionType?.id}
        />
      ))}
    </div>
  );
};
