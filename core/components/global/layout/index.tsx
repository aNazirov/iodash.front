import { PropsWithChildren } from "react";
import { Header } from "../header";
import { Sidebar } from "../sidebar";

interface LayoutProps extends PropsWithChildren {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />

      <main className="page">
        <div className="container">
          <div className="page__in">
            <Sidebar />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
