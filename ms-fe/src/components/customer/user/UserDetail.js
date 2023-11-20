import { useEffect, useState } from "react";
import styles from "./UserDetail.module.css";
import NavUser from "./nav/NavUser";
import ProfileHeader from "./profile/ProfileHeader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../../service/Token";

const baseUrl = "http://localhost:8080/api/client/user";

function UserDetail() {
  const token = getToken(false);
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [isRender, setIsRender] = useState(true);

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
  }, [decodeData, isRender]);

  if (!token) {
    navigate("/ms-shop/home");
  }

  return (
    <div>
      <div>
        <ProfileHeader user={user} />
        <NavUser user={user} setIsRender={setIsRender} />
      </div>
    </div>
  );
}

export default UserDetail;
