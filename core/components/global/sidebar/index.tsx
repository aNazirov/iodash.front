import { useRouter } from "next/router";
import { classNames } from "../../../helpers/utils";
import { ICategory } from "../../../interfaces";
import { useAppSelector } from "../../../store/hooks";
import { CImg, CLink } from "../../shared";

interface ISidebarItemProps {
  category: ICategory;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({ category }) => {
  const { pathname } = useRouter();
  const href = `/category/${category.id}`;

  return (
    <li className={classNames(pathname === href && "highlighted")}>
      <CLink
        href={{
          pathname: `/category/[id]`,
          query: { id: category.id, title: category.title },
        }}
      >
        <span className="products-nav__text">{category.title}</span>
        <span className="products-nav__number">{category._count?.lessons}</span>
      </CLink>
    </li>
  );
};

export const Sidebar: React.FC = () => {
  const { categories } = useAppSelector((state) => state.categories);
  const allProducts = categories.reduce(
    (total, x) => total + (x._count?.lessons ?? 0),
    0
  );

  return (
    <aside className="sidebar">
      <div className="sidebar__in">
        <nav className="products-nav">
          <ul>
            <li className="highlighted">
              <a href="#">
                <span className="products-nav__text">All products</span>
                <span className="products-nav__number">{allProducts}</span>
              </a>
            </li>

            {categories.map((x, i) => (
              <SidebarItem key={`sidebar-item-${x.id}-${i}`} category={x} />
            ))}
          </ul>
        </nav>
        <div className="discount">
          <div className="discount__icon">
            <CImg src="/img/bg/discount.svg" alt="icon" />
          </div>
          <span className="discount__text">
            20% on all
            <br /> Premium plans
          </span>
          <a href="#" className="btn btn_big-size">
            Apply discount
          </a>
        </div>
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
              <CImg src="/img/bg/telegram.svg" alt="telegram" />
            </a>
          </dd>
        </dl>
      </div>
    </aside>
  );
};
