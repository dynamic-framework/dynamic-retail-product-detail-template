import {
  useCallback,
  useMemo,
} from 'react';
import {
  MCarousel,
  MCarouselSlide,
} from '@dynamic-framework/ui-react';

import AccountSelectorLoader from './loaders/AccountSelectorLoader';
import useAccountCallback from '../services/hooks/useAccountCallback';
import { useAppSelector } from '../store/hooks';
import { getAccounts } from '../store/selectors';

import type { Account } from '../services/interface';
import AccountCard from './AccountCard';

export default function AccountSlider() {
  const accounts = useAppSelector(getAccounts);
  const {
    loading,
    selected,
    callback,
  } = useAccountCallback();

  const handlerSelect = useCallback(async (account: Account) => {
    if (selected && selected.id !== account.id) {
      await callback(account.baseType, account.id);
    }
  }, [callback, selected]);

  const currentAccountIndex = useMemo(() => {
    if (accounts && selected) {
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < accounts.length; index++) {
        if (accounts[index].id === selected.id) {
          return index;
        }
      }
    }
    return 0;
  }, [accounts, selected]);

  if (loading) {
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
      <MCarousel
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
        onMoved={(_, index) => handlerSelect(accounts[index])}
      >
        {accounts.map((account: Account) => (
          <MCarouselSlide
            key={account.id}
          >
            <AccountCard
              account={account}
            />
          </MCarouselSlide>
        ))}
      </MCarousel>
    </div>
  );
}
