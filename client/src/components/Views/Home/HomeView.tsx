import { Helmet } from "react-helmet";
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
