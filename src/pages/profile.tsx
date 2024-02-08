import profile from "./profile.module.css";
import { Link, Outlet, useLocation } from "react-router-dom";

interface IProfilePageProps {
  handleLogoutButton: () => void;
}

const ProfilePage: React.FC<IProfilePageProps> = ({
  handleLogoutButton,
}: IProfilePageProps): JSX.Element => {
  const location: string = useLocation().pathname;

  return (
    <div className={`${profile.profile}`}>
      <div className={`${profile.menu} pl-5 mt-30`}>
        <Link to="/profile" className={profile.button}>
          <p
            className={
              location !== "/profile"
                ? "text text_type_main-medium text_color_inactive pt-6 pb-6"
                : "text text_type_main-medium pt-6 pb-6"
            }
          >
            Профиль
          </p>
        </Link>
        <Link to="orders" className={profile.button}>
          <button className={profile.button}>
            <p
              className={
                location !== "/profile/orders"
                  ? "text text_type_main-medium text_color_inactive pt-6 pb-6"
                  : "text text_type_main-medium pt-6 pb-6"
              }
            >
              История заказов
            </p>
          </button>
        </Link>

        <button className={profile.button} onClick={handleLogoutButton}>
          <p className="text text_type_main-medium text_color_inactive pt-6 pb-6">
            Выход
          </p>
        </button>
        {location === "/profile" && (
          <p
            className={`text text_type_main-default text_color_inactive mt-15`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default ProfilePage;
