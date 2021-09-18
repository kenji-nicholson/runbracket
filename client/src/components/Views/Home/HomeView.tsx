import { Helmet } from "react-helmet-async";
import { HeroSection } from "./HeroSection";

const HomeView = () => {
  return (
    <>
      <Helmet>
        <title>RunBracket</title>
      </Helmet>
      <HeroSection></HeroSection>
    </>
  );
};

export default HomeView;
