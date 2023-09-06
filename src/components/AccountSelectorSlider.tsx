import {
  useCallback,
  useMemo,
} from 'react';
import {
  DCarousel,
  DCarouselSlide,
} from '@dynamic-framework/ui-react';

import AccountSelectorLoader from './loaders/AccountSelectorLoader';
import useAccountCallback from '../services/hooks/useAccountCallback';
import { useAppSelector } from '../store/hooks';
import { getAccounts, getIsLoadingAccountList } from '../store/selectors';
import AccountCard from './AccountCard';

import type { Account } from '../services/interface';

export default function AccountSelectorSlider() {
  const loading = useAppSelector(getIsLoadingAccountList);
  const accounts = useAppSelector(getAccounts);
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
      <div className="px-3 pt-3">
        <AccountSelectorLoader />
        <br />
      </div>
    );
  }

  if (accounts.length === 1) {
    return (
      <div className="p-3">
        <AccountCard account={selected} />
      </div>
    );
  }

  return (
    <div className="account-slider">
      <DCarousel
        options={{
          arrows: true,
          padding: 16,
          gap: 8,
          start: currentAccountIndex,
          updateOnMove: true,
          rewind: true,
          mediaQuery: 'max',
          breakpoints: {
            576: {
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
            <AccountCard
              account={account}
            />
          </DCarouselSlide>
        ))}
      </DCarousel>
    </div>
  );
}
