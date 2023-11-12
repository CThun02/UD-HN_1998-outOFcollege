import styles from "./UserDetail.module.css";
import NavUser from "./nav/NavUser";
import ProfileHeader from "./profile/ProfileHeader";

function UserDetail() {
  return (
    <div>
      <div>
        <ProfileHeader />
        <NavUser />
      </div>
    </div>
  );
}

export default UserDetail;
