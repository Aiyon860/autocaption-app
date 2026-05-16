import type { FC } from "react";
import type MainContentProps from "../../types/MainContent";

const MainContent: FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex flex-col gap-12">
      {children}
    </main>
  )
};

export default MainContent;