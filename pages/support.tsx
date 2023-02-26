import { GetServerSidePropsContext } from "next";
import { CImg } from "../core/components/shared";
import { wrapper } from "../core/store";
import { autoLogIn } from "../core/store/global";
import { getMainPageData } from "../core/store/main";

const Support: React.FC = () => {
  return (
    <section className="main-content">
      <h2 className="title title_indent-bt-small">Get In Touch</h2>
      <p className="sub-title">
        Design better websites and spend less time without restricting creative
        freedom
      </p>
      <div className="support-form">
        <form>
          <fieldset>
            <ul className="support-form__list">
              <li>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
              </li>
              <li>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  className="phone-input"
                  type="tel"
                  name="phone"
                  placeholder="(+12) 345 - 678"
                />
              </li>
              <li>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </li>
            </ul>
          </fieldset>
          <fieldset>
            <label htmlFor="message">Message</label>
            <div className="textarea-wrap">
              <textarea
                id="message"
                className="textarea"
                placeholder="Hi there! I would like to get in touch because..."
                maxLength={100}
              ></textarea>
              <div className="count">
                <span className="current">0</span>
                <span className="maximum">/100</span>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <button className="btn btn_md-size btn_shadow" type="submit">
              Send Message
            </button>
          </fieldset>
        </form>
      </div>
      <h2 className="title">You may also like</h2>
      <div className="works works_changed">
        <div className="work">
          <div className="work__photo">
            <a href="#">
              <CImg
                src="img/src/work-img.jpg"
                alt="Hero Header for Web design"
              />
            </a>
          </div>
          <h3 className="work__title">
            <a href="#">Hero Header for Web design</a>
          </h3>
          <span className="program-name">
            <CImg
              className="program-name__logo"
              src="img/src/figma.svg"
              alt="Figma"
            />
            <span className="program-name__text">Figma</span>
          </span>
          <div className="work__bottom-panel">
            <span className="work__price">$5</span>
            <div className="work__right-col">
              <span className="like">like</span>
              <a href="#" className="btn btn_big-size btn__blue-color">
                Download
              </a>
            </div>
          </div>
        </div>
        <div className="work">
          <div className="work__photo">
            <a href="#">
              <CImg
                src="img/src/work-img.jpg"
                alt="Hero Header for Web design"
              />
            </a>
          </div>
          <h3 className="work__title">
            <a href="#">Hero Header for Web design</a>
          </h3>
          <span className="program-name">
            <CImg
              className="program-name__logo"
              src="img/src/figma.svg"
              alt="Figma"
            />
            <span className="program-name__text">Figma</span>
          </span>
          <div className="work__bottom-panel">
            <span className="work__price">$5</span>
            <div className="work__right-col">
              <span className="like">like</span>
              <a href="#" className="btn btn_big-size btn__blue-color">
                Download
              </a>
            </div>
          </div>
        </div>
        <div className="work">
          <div className="work__photo">
            <a href="#">
              <CImg
                src="img/src/work-img.jpg"
                alt="Hero Header for Web design"
              />
            </a>
          </div>
          <h3 className="work__title">
            <a href="#">Hero Header for Web design</a>
          </h3>
          <span className="program-name">
            <CImg
              className="program-name__logo"
              src="img/src/figma.svg"
              alt="Figma"
            />
            <span className="program-name__text">Figma</span>
          </span>
          <div className="work__bottom-panel">
            <span className="work__price">$5</span>
            <div className="work__right-col">
              <span className="like">like</span>
              <a href="#" className="btn btn_big-size btn__blue-color">
                Download
              </a>
            </div>
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

export default Support;
