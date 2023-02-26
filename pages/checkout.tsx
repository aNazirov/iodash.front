import { GetServerSidePropsContext } from "next";
import { CImg } from "../core/components/shared";
import { wrapper } from "../core/store";
import { autoLogIn } from "../core/store/global";
import { getMainPageData } from "../core/store/main";

const Checkout: React.FC = () => {
  return (
    <section className="main-content">
      <h2 className="title">Pricing</h2>
      <div className="checkout">
        <div className="checkout__billing">
          <h3 className="checkout__title">Billing information</h3>
          <div className="checkout__content">
            <p>
              We’ll use this information to issue the first invoice. You’ll be
              able to update the details for future invoices from your account
              profile.
            </p>
            <div className="billing-form">
              <form>
                <fieldset>
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" name="name" placeholder="Name" />
                </fieldset>
                <fieldset>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="country">Country</label>
                  <div className="select">
                    <select id="country">
                      <option>Country</option>
                      <option>Country</option>
                      <option>Country</option>
                    </select>
                  </div>
                </fieldset>
                <fieldset>
                  <button type="submit" className="btn btn_md-size">
                    Confirm & Pay
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <div className="checkout__payment">
          <h3 className="checkout__title">Payment method</h3>
          <div className="checkout__content">
            <div className="checkout__form">
              <dl className="checkout__price">
                <dt>Basic Plan:</dt>
                <dd>$ 20</dd>
              </dl>
              <span className="checkout__text">10 downloads per day</span>
              <dl className="checkout__pay">
                <dt>Pay by card below</dt>
                <dd>
                  <div className="payment">
                    <div className="payment__item">
                      <CImg src="/img/src/visa.svg" alt="visa" />
                    </div>
                    <div className="payment__item">
                      <CImg src="/img/src/mastercard.svg" alt="mastercard" />
                    </div>
                  </div>
                </dd>
              </dl>
              <div className="payment-form">
                <form>
                  <fieldset>
                    <ul className="payment-form__list">
                      <li>
                        <label htmlFor="card-name">Card name</label>
                        <div className="input-field">
                          <div className="input-field__icon">
                            <CImg src="/img/bg/user-i.svg" alt="icon" />
                          </div>
                          <input
                            id="card-name"
                            type="text"
                            name="card-name"
                            placeholder="Name"
                          />
                        </div>
                      </li>
                      <li>
                        <label htmlFor="card-number">Card number</label>
                        <div className="input-field">
                          <div className="input-field__icon">
                            <CImg src="/img/bg/card-i.svg" alt="icon" />
                          </div>
                          <input
                            id="card-number"
                            type="text"
                            name="card-number"
                            placeholder="Number"
                          />
                        </div>
                      </li>
                    </ul>
                  </fieldset>
                  <fieldset>
                    <ul className="payment-form__list payment-form__list_three-col">
                      <li>
                        <label htmlFor="month">Month</label>
                        <input
                          id="month"
                          type="text"
                          name="month"
                          placeholder="Month"
                        />
                      </li>
                      <li>
                        <label htmlFor="years">Years</label>
                        <input
                          id="years"
                          type="text"
                          name="years"
                          placeholder="Years"
                        />
                      </li>
                      <li>
                        <label htmlFor="cvv">CVV</label>
                        <input
                          id="cvv"
                          type="text"
                          name="cvv"
                          placeholder="000"
                        />
                      </li>
                    </ul>
                  </fieldset>
                </form>
              </div>
              <dl className="checkout__info">
                <dt>AUTOMATIC RENEWAL:</dt>
                <dd>
                  Your subscription will renew automatically every year as one
                  payment of 108.00 EUR. You may cancel your subscription
                  anytime from <a href="#">My subscription</a> section in your
                  profile.
                </dd>
                <dd>
                  By clicking &quot;Confirm and pay&quot; you agree to the{" "}
                  <a href="#">Terms and Conditions.</a>
                </dd>
              </dl>
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

export default Checkout;
