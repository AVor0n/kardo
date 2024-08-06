import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Button, ExitIcon, HammerIcon, ToolsIcon } from '@components';
import { api, useFindUserByIdQuery } from '@shared/api';
import { format } from '@utils';
import { useAppSelector } from 'app/store';
import { useLang } from 'context';
import styles from './Profile.module.scss';

export const Profile = () => {
  const lang = useLang().profile;
  const userId = useAppSelector(state => state.auth.userId);
  const { data: user } = useFindUserByIdQuery({ userId: Number(userId) });
  const [logout] = api.useLogoutMutation();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <HammerIcon className={clsx(styles.icon, styles.hammerIcon)} />
        <Link to="/settings">
          <ToolsIcon className={styles.icon} />
        </Link>
        <Link to="/auth">
          <ExitIcon className={styles.icon} onClick={() => logout()} />
        </Link>
      </div>

      <div className={styles.mainUserInfo}>
        <img className={styles.avatar} src={user?.profilePicture?.filePath} alt="avatar" width={80} height={80} />
        <div>
          <div className={styles.name}>{user?.username}</div>
          <div className={styles.email}>{user?.email}</div>
          <div className={styles.date}>{user?.dateOfBirth}</div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.publications}>{format(lang.countPublications, '85')}</div>
        <div className={styles.friends}>{format(lang.countFriends, '100')}</div>
      </div>

      <Button className={styles.addFriend} view="action" wide size="l" disabled>
        {lang.addFriends}
      </Button>
    </div>
  );
};
