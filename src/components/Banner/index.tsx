import { isMobile } from "react-device-detect";
import { StyledBanner } from "./styles";

interface BannerProps {
  imageSrc: string;
  imageSrcMobile: string;
  alt: string;
}

const Banner: React.FC<BannerProps> = ({ imageSrc, imageSrcMobile, alt }) => {
  return (
    <StyledBanner>
      <img src={isMobile ? imageSrcMobile : imageSrc} alt={alt} />
      <h1>Doenças não transmissíveis</h1>
    </StyledBanner>
  );
};

export default Banner;
