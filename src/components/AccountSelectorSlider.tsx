import {
  DCarousel,
  DCarouselSlide,
  DCreditCard,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import {
  useCallback,
  useMemo,
} from 'react';

import useAccountCallback from '../services/hooks/useAccountCallback';
import type { Account } from '../services/interface';
import { useAppSelector } from '../store/hooks';
import { getAccountsWithFreeze, getIsLoadingAccountList } from '../store/selectors';

import AccountCard from './AccountCard';
import AccountSelectorLoader from './loaders/AccountSelectorLoader';

export default function AccountSelectorSlider() {
  const loading = useAppSelector(getIsLoadingAccountList);
  const accounts = useAppSelector(getAccountsWithFreeze);
  const {
    callback,
    selected,
  } = useAccountCallback();

  const handleSelect = useCallback(async (account: Account) => {
    await callback(account);
  }, [callback]);

  const currentAccountIndex = useMemo(() => {
    if (accounts && selected) {
      const index = accounts.findIndex(({ id }) => id === selected.id);
      return index > 0 ? index : 0;
    }
    return 0;
  }, [accounts, selected]);

  if (loading || !selected) {
    return (
      <div className="px-4 pt-4">
        <AccountSelectorLoader />
      </div>
    );
  }

  if (accounts.length === 1) {
    return (
      <div className="p-4">
        <AccountCard account={selected} />
      </div>
    );
  }

  return (
    <div className="account-slider">
      <DCarousel
        options={{
          perPage: 1,
          gap: 8,
          start: currentAccountIndex,
          updateOnMove: true,
          rewind: true,
          padding: '16px',
          breakpoints: {
            1200: {
              arrows: true,
            },
            640: {
              arrows: false,
            },
          },
        }}
        onMoved={(_, index) => handleSelect(accounts[index])}
      >
        {accounts.map((account: Account) => (
          <DCarouselSlide
            key={account.id}
          >
            <DCreditCard
              name={account.name}
              brand={account.type}
              className={classNames(
                { 'card-freeze': account.freeze },
                account.type,
              )}
              number={account.accountNumber}
            />
          </DCarouselSlide>
        ))}
      </DCarousel>
    </div>
  );
}
