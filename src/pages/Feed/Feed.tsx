import clsx from 'clsx';
import { useRef, useState } from 'react';
import { AllIcon, ListIcon } from '@components';
import { api } from '@shared/api';
import { useInfiniteScroll } from '@utils';
import { Feed } from '@widgets/Feed';
import { SearchInput } from 'components/SearchInput';
import { useLang } from 'context';
import styles from './Feed.module.scss';

export const FeedPage = () => {
  const lang = useLang().feed;
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  const { data: posts } = useInfiniteScroll({
    scrollableContainerRef: ref,
    fetchFn: page => api.useGetFeedQuery({ page, size: 8 }),
  });

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span className={styles.headerText}>{lang.title}</span>
        <AllIcon className={clsx(styles.icon, view === 'grid' && styles.active)} onClick={() => setView('grid')} />
        <ListIcon className={clsx(styles.icon, view === 'list' && styles.active)} onClick={() => setView('list')} />
      </header>

      <div className={styles.searchWrapper}>
        <SearchInput value={search} onUpdate={setSearch} placeholder={lang.search} />
      </div>

      <div className={styles.feedWrapper} ref={ref}>
        <Feed posts={posts} className={clsx(view === 'list' && styles.listFeed)} />
      </div>
    </div>
  );
};
