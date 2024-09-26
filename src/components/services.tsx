import { useTranslations } from "next-intl";

import { FaUserFriends } from "react-icons/fa";
import { FaRegCommentDots, FaBookOpen } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import Wrapper from "./wrapper";

const serviceData = [
  { icon: <FaUserFriends color="white" size={80} />, title: "friendship.title", description: "friendship.description" },
  {
    icon: <FaRegCommentDots color="white" size={80} />,
    title: "networking.title",
    description: "networking.description",
  },
  { icon: <FaBookOpen color="white" size={80} />, title: "learning.title", description: "learning.description" },
  {
    icon: <MdCelebration color="white" size={80} />,
    title: "entertainment.title",
    description: "entertainment.description",
  },
];

export default function Services() {
  const t = useTranslations("homepage.services");

  return (
    <Wrapper>
      <div className="flex flex-col xl:flex-row justify-center items-center xl:items-start gap-10 text-center mt-[-120px]">
        {serviceData.map((service) => (
          <div key={service.title} className="flex-1 flex flex-col justify-center items-center">
            <div className="bg-primary h-40 w-40 rounded-full flex justify-center items-center mb-10 shadow-xl">
              {service.icon}
            </div>
            <h3>{t(service.title)}</h3>
            <p>{t(service.description)}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
