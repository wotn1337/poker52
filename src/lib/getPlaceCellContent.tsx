import Image from "next/image";
import FirstPlaceIcon from "../../public/first-place-icon.svg";
import SecondPlaceIcon from "../../public/second-place-icon.svg";
import ThirdPlaceIcon from "../../public/third-place-icon.svg";

const placeIconMap: Record<number, any> = {
  0: FirstPlaceIcon,
  1: SecondPlaceIcon,
  2: ThirdPlaceIcon,
};

export const getPlaceCellContent = (index: number) => {
  if (index >= 0 && index <= 2) {
    return (
      <Image
        src={placeIconMap[index]}
        alt={`${index + 1} place icon`}
        width={40}
        height={40}
      />
    );
  }

  return index + 1;
};
