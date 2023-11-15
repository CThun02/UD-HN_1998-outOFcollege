import { useEffect, useState } from "react";
import styles from "./UserDetail.module.css";
import NavUser from "./nav/NavUser";
import ProfileHeader from "./profile/ProfileHeader";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://localhost:8080/api/client/user";

function UserDetail() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const convertData = username.replace(/-----/g, "/");
  const decode64 = atob(convertData);
  const decodeData = JSON.parse(decode64);
  useEffect(() => {
    async function getUserDetail() {
      const res = await axios.get(baseUrl + "/" + decodeData);
      const data = await res.data;

      setUser(data);
    }
    return () => getUserDetail();
  }, [decodeData]);

  return (
    <div>
      <div>
        <ProfileHeader user={user} />
        <NavUser user={user} />
      </div>
    </div>
  );
}

export default UserDetail;
