import { Helmet } from "react-helmet";
import Breadcrumb from "components/layouts/breadcrumb";
import UserProfile from "components/app/userProfiles/index";
import ButtonComp from "components/layouts/button/button";

const nestedPath = [
  "Home",
  "People",
];

const UserProfilePage = () => (
  <>
    <Helmet title="User Profile" />
    <div className="flex flex-col space-y-12">
      <div className="flex justify-between">
        <div className="space-y-2 w-1/2" style={{ marginLeft: "3%" }}>
          <span className="font-quicksand-semi-bold text-4xl">
            User Profile
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="w-1/2 justify-items-end">
          <ButtonComp label="Add User Profile +" stylesCss="right" />
        </div>
      </div>
      <UserProfile />
    </div>
  </>
);

export default UserProfilePage;
