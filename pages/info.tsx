import { GetServerSidePropsContext } from "next";
import { useCallback, useState } from "react";
import { classNames } from "../core/helpers/utils";
import { wrapper } from "../core/store";
import { autoLogIn } from "../core/store/global";
import { getMainPageData } from "../core/store/main";

type ITab = "License" | "Term" | "Privacy";

const Info: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ITab>("License");

  const _setActiveTab = useCallback(
    (tab: ITab) => () => setActiveTab(tab),
    [setActiveTab]
  );

  return (
    <section className="main-content">
      <div className="tabs">
        <nav className="tabs__nav">
          <ul>
            <li
              className={classNames(activeTab === "License" && "active")}
              onClick={_setActiveTab("License")}
            >
              <span>License</span>
            </li>
            <li
              className={classNames(activeTab === "Term" && "active")}
              onClick={_setActiveTab("Term")}
            >
              <span>Terms & Conditions</span>
            </li>
            <li
              className={classNames(activeTab === "Privacy" && "active")}
              onClick={_setActiveTab("Privacy")}
            >
              <span>Privacy & Policy</span>
            </li>
          </ul>
        </nav>
        <div className="tabs__content">
          <div
            className={classNames(
              "tabs__item",
              activeTab === "License" && "active"
            )}
          >
            <h2 className="small-title">License</h2>
            <p>
              Here&apos;s what our UI8 License allows for, for each Item
              available for purchase or download on ui8.net. If you are
              purchasing for multiple individuals in your team, please support
              the authors and add the appropriate team size license to your cart
              during checkout.
            </p>
            <ul className="list">
              <li>
                The UI8 License grants the user an ongoing, non-exclusive,
                worldwide license to utilize the digital work (“Item”).
              </li>
              <li>
                You are licensed to use the Item to create unlimited end
                projects for yourself or for your clients and the end projects
                may be sold, licensed, sub-licensed or freely distributed.
              </li>
            </ul>
            <h2 className="small-title">You can:</h2>
            <ul className="list">
              <li>
                <li>Create End Products for clients or personal projects</li>
                <li>
                  License, sub-license and make any number of copies of end
                  projects for personal or client engagements.
                </li>
                <li>
                  You may modify or manipulate the Item. You may combine the
                  Item with other works and make a derivative work from it. The
                  resulting works are subject to the terms of this license.
                </li>
                <li>
                  This is a &apos;multi-use&apos; license, which means you may
                  use an Item multiple times, in multiple projects.
                </li>
              </li>
            </ul>
            <h2 className="small-title">You cannot:</h2>
            <ul className="list">
              <li>
                Re-distribute the Item as a stock image or it’s source files,
                regardless of any modifications, under any circumstances. In
                other words, you cannot replicate or make modifications to the
                item and sell it on UI8 or other marketplaces as your own, even
                if the source files are not included.
              </li>
              <li>
                Make a theme, template or derivative work of any product to sell
                on any marketplace.
              </li>
              <li>
                Use illustrations or images as part of your products or
                presentations to be sold in any marketplace including UI8.net
                unless you are the rightful owner/creator.
              </li>
              <li>
                Resell or otherwise distribute downloaded assets on any
                marketplace including UI8, as well as via private channels and
                bots under any circumstances.
              </li>
              <li>
                Note: Violation of these terms will be pursued to the fullest
                extent of the law.
              </li>
            </ul>
            <h2 className="small-title">Sample End Products:</h2>
            <ul className="list">
              <li>
                End Products include but are not limited to: Commercial or
                personal websites, mobile apps, web apps, games, illustrations,
                wireframes, presentations and videos.
              </li>
            </ul>
            <h2 className="small-title">Other license terms:</h2>
            <ul className="list">
              <li>
                For some Items, a component of the Item will be sourced by the
                author from elsewhere and different license terms may apply to
                the component, such as someone else’s license or an open source
                or creative commons license. If so, the component will be
                identified by the author in the Item’s description page or in
                the Item’s downloaded files. The other license will apply to
                that component instead of this license. This license will apply
                to the rest of the Item.
              </li>
              <li>
                The author of the Item retains ownership of the Item but grants
                you the license on these terms. This license is between the
                author of the Item and you. UI8.net(UI8) is not a party to this
                license or the one giving you the license.
              </li>
            </ul>
          </div>
          <div
            className={classNames(
              "tabs__item",
              activeTab === "Term" && "active"
            )}
          >
            <h2 className="small-title">Terms & Conditions</h2>
            <p>
              Here&apos;s what our UI8 License allows for, for each Item
              available for purchase or download on ui8.net. If you are
              purchasing for multiple individuals in your team, please support
              the authors and add the appropriate team size license to your cart
              during checkout.
            </p>
            <ul className="list">
              <li>
                The UI8 License grants the user an ongoing, non-exclusive,
                worldwide license to utilize the digital work (“Item”).
              </li>
              <li>
                You are licensed to use the Item to create unlimited end
                projects for yourself or for your clients and the end projects
                may be sold, licensed, sub-licensed or freely distributed.
              </li>
            </ul>
            <h2 className="small-title">You can:</h2>
            <ul className="list">
              <li>
                <li>Create End Products for clients or personal projects</li>
                <li>
                  License, sub-license and make any number of copies of end
                  projects for personal or client engagements.
                </li>
                <li>
                  You may modify or manipulate the Item. You may combine the
                  Item with other works and make a derivative work from it. The
                  resulting works are subject to the terms of this license.
                </li>
                <li>
                  This is a &apos;multi-use&apos; license, which means you may
                  use an Item multiple times, in multiple projects.
                </li>
              </li>
            </ul>
            <h2 className="small-title">You cannot:</h2>
            <ul className="list">
              <li>
                Re-distribute the Item as a stock image or it’s source files,
                regardless of any modifications, under any circumstances. In
                other words, you cannot replicate or make modifications to the
                item and sell it on UI8 or other marketplaces as your own, even
                if the source files are not included.
              </li>
              <li>
                Make a theme, template or derivative work of any product to sell
                on any marketplace.
              </li>
              <li>
                Use illustrations or images as part of your products or
                presentations to be sold in any marketplace including UI8.net
                unless you are the rightful owner/creator.
              </li>
              <li>
                Resell or otherwise distribute downloaded assets on any
                marketplace including UI8, as well as via private channels and
                bots under any circumstances.
              </li>
              <li>
                Note: Violation of these terms will be pursued to the fullest
                extent of the law.
              </li>
            </ul>
            <h2 className="small-title">Sample End Products:</h2>
            <ul className="list">
              <li>
                End Products include but are not limited to: Commercial or
                personal websites, mobile apps, web apps, games, illustrations,
                wireframes, presentations and videos.
              </li>
            </ul>
            <h2 className="small-title">Other license terms:</h2>
            <ul className="list">
              <li>
                For some Items, a component of the Item will be sourced by the
                author from elsewhere and different license terms may apply to
                the component, such as someone else’s license or an open source
                or creative commons license. If so, the component will be
                identified by the author in the Item’s description page or in
                the Item’s downloaded files. The other license will apply to
                that component instead of this license. This license will apply
                to the rest of the Item.
              </li>
              <li>
                The author of the Item retains ownership of the Item but grants
                you the license on these terms. This license is between the
                author of the Item and you. UI8.net(UI8) is not a party to this
                license or the one giving you the license.
              </li>
            </ul>
          </div>
          <div
            className={classNames(
              "tabs__item",
              activeTab === "Privacy" && "active"
            )}
          >
            <h2 className="small-title">Privacy & Policy</h2>
            <p>
              Here&apos;s what our UI8 License allows for, for each Item
              available for purchase or download on ui8.net. If you are
              purchasing for multiple individuals in your team, please support
              the authors and add the appropriate team size license to your cart
              during checkout.
            </p>
            <ul className="list">
              <li>
                The UI8 License grants the user an ongoing, non-exclusive,
                worldwide license to utilize the digital work (“Item”).
              </li>
              <li>
                You are licensed to use the Item to create unlimited end
                projects for yourself or for your clients and the end projects
                may be sold, licensed, sub-licensed or freely distributed.
              </li>
            </ul>
            <h2 className="small-title">You can:</h2>
            <ul className="list">
              <li>
                <li>Create End Products for clients or personal projects</li>
                <li>
                  License, sub-license and make any number of copies of end
                  projects for personal or client engagements.
                </li>
                <li>
                  You may modify or manipulate the Item. You may combine the
                  Item with other works and make a derivative work from it. The
                  resulting works are subject to the terms of this license.
                </li>
                <li>
                  This is a &apos;multi-use&apos; license, which means you may
                  use an Item multiple times, in multiple projects.
                </li>
              </li>
            </ul>
            <h2 className="small-title">You cannot:</h2>
            <ul className="list">
              <li>
                Re-distribute the Item as a stock image or it’s source files,
                regardless of any modifications, under any circumstances. In
                other words, you cannot replicate or make modifications to the
                item and sell it on UI8 or other marketplaces as your own, even
                if the source files are not included.
              </li>
              <li>
                Make a theme, template or derivative work of any product to sell
                on any marketplace.
              </li>
              <li>
                Use illustrations or images as part of your products or
                presentations to be sold in any marketplace including UI8.net
                unless you are the rightful owner/creator.
              </li>
              <li>
                Resell or otherwise distribute downloaded assets on any
                marketplace including UI8, as well as via private channels and
                bots under any circumstances.
              </li>
              <li>
                Note: Violation of these terms will be pursued to the fullest
                extent of the law.
              </li>
            </ul>
            <h2 className="small-title">Sample End Products:</h2>
            <ul className="list">
              <li>
                End Products include but are not limited to: Commercial or
                personal websites, mobile apps, web apps, games, illustrations,
                wireframes, presentations and videos.
              </li>
            </ul>
            <h2 className="small-title">Other license terms:</h2>
            <ul className="list list_indent-bt-none">
              <li>
                For some Items, a component of the Item will be sourced by the
                author from elsewhere and different license terms may apply to
                the component, such as someone else’s license or an open source
                or creative commons license. If so, the component will be
                identified by the author in the Item’s description page or in
                the Item’s downloaded files. The other license will apply to
                that component instead of this license. This license will apply
                to the rest of the Item.
              </li>
              <li>
                The author of the Item retains ownership of the Item but grants
                you the license on these terms. This license is between the
                author of the Item and you. UI8.net(UI8) is not a party to this
                license or the one giving you the license.
              </li>
            </ul>
          </div>
        </div>
      </div>
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

export default Info;
