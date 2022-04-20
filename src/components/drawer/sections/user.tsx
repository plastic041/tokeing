import UserInfo from "~/components/user/user-info";
import Section from "~/components/drawer/sections/section";

const UserSection = () => {
  return (
    <Section title="사용자 정보">
      <UserInfo />
    </Section>
  );
};

export default UserSection;
