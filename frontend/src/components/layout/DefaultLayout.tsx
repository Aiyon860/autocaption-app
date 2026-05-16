import TopBar from "./Navbar";
import Footer from "./Footer";
import MainContent from "./MainContent";
import HomePage from "../../pages/HomePage";
import { Route, Routes } from "react-router";
import ResultsPage from "../../pages/ResultsPage";

const DefaultLayout = () => {
  return (
    <div className="min-h-screen min-w-full flex flex-col gap-24">
      <TopBar 
        key="Autocaption App Header"
        title="AutoCaption"  
        githubUrl="https://github.com/Aiyon860/autocaption-app" 
      />
      <MainContent>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path="results" element={<ResultsPage />}/>
        </Routes>
      </MainContent>
      <Footer 
        key="Autocaption App Footer"
        year={new Date().getFullYear()}
        authorName="Daniel Aiyon"
        authorUrl="https://github.com/Aiyon860"
        description="All rights reserved."
      />
    </div>
  )
}

export default DefaultLayout;