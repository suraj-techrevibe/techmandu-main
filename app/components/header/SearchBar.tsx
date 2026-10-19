import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Form, Link, useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { action } from '~/routes/api.search';
import { SearchQuery } from '~/generated/graphql';
import SearchIcon from '~/assets/svgs/TopNav/recent-search-icon.svg';
import DeleteIcon from '~/assets/svgs/TopNav/recent-search-delete.svg';

const STORAGE_KEY = 'tm_recent_searches';

interface SearchResultItemProps {
  to: string;
  icon: string;
  text: string;
  onDelete?: (e: React.MouseEvent) => void;
  onClick?: () => void;
}

const SearchResultItem = ({
  to,
  icon,
  text,
  onDelete,
  onClick,
}: SearchResultItemProps) => (
  <Link
    to={to}
    className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 text-sm transition-colors"
    onClick={onClick}
    onMouseDown={(e) => {
      // Prevent dropdown from closing before navigation
    }}
  >
    <div className="flex items-center gap-2">
      <img src={icon} alt="" className="flex-shrink-0" />
      <span className="truncate">{text}</span>
    </div>
    {onDelete && (
      <button
        type="button"
        onClick={onDelete}
        className="text-xs text-gray-500 px-2 py-1 hover:text-gray-700 transition-colors"
        aria-label={`Delete search: ${text}`}
      >
        <img src={DeleteIcon} alt="Delete" />
      </button>
    )}
  </Link>
);

export function SearchBar() {
  const { t } = useTranslation();
  const fetcher = useFetcher<typeof action>();

  const [isSearching, setIsSearching] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [recent, setRecent] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<
    SearchQuery['search']['items']
  >([]);

  let initialQuery = '';
  if (typeof window !== 'undefined') {
    initialQuery = new URL(window.location.href).searchParams.get('q') ?? '';
  }

  // Load recent searches
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setRecent(raw ? JSON.parse(raw) : []);
    } catch {
      setRecent([]);
    }
  }, []);

  // Update search results when fetcher data changes
  useEffect(() => {
    if (fetcher?.data?.data && fetcher.data.data.length > 0) {
      setSearchResults(fetcher.data.data);
    } else {
      setSearchResults([]);
    }
  }, [fetcher?.data]);

  const deleteRecentSearch = useCallback((index: number) => {
    if (typeof window === 'undefined') return;
    try {
      const existing: string[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]',
      );
      const updated = existing.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setRecent(updated);
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = new FormData(e.currentTarget);
    const q = (form.get('q') as string | null)?.trim() ?? '';
    if (!q || typeof window === 'undefined') return;
    try {
      const existing: string[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]',
      );
      const updated = [q, ...existing.filter((s) => s !== q)].slice(0, 5);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setRecent(updated);
    } catch {
      // ignore
    }
    setIsSearching(false);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsInputEmpty(value.trim().length === 0);

    if (e.target.form) {
      const formData = new FormData(e.target.form);
      fetcher.submit(formData, { method: 'post', action: '/api/search' });
    } else {
      fetcher.submit({ q: value }, { method: 'post', action: '/api/search' });
    }
  };

  const showRecentSearches = isSearching && isInputEmpty && recent.length > 0;
  const showSearchResults =
    isSearching && !isInputEmpty && searchResults.length > 0;

  return (
    <div className="relative w-full">
      <Form
        method="get"
        action="/search"
        onSubmit={handleSubmit}
        key={initialQuery}
        className="relative w-full rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden px-3 py-1"
      >
        <div className="flex items-center">
          <input
            type="search"
            name="q"
            onFocus={() => setIsSearching(true)}
            onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            defaultValue={initialQuery}
            onChange={changeHandler}
            autoComplete="off"
            placeholder={t('common.search')}
            className="flex-1 border-none outline-none focus-visible:ring-0 shadow-none block w-full text-sm [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
          />
          <button
            type="submit"
            className="p-1 rounded-md hover:bg-gray-100 transition-colors group"
            aria-label="Submit search"
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </Form>

      {/* Search Suggestions & Results Dropdown */}
      {(showRecentSearches || showSearchResults) && (
        <div className="absolute left-0 right-0 mt-2 z-[99] bg-white max-h-60 overflow-auto rounded-md shadow-lg border border-gray-100">
          {showRecentSearches &&
            recent.map((s, index) => (
              <SearchResultItem
                key={`${s}-${index}`}
                to={`/search?q=${encodeURIComponent(s)}`}
                icon={SearchIcon}
                text={s}
                onDelete={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteRecentSearch(index);
                }}
                onClick={() => setIsSearching(false)}
              />
            ))}

          {showSearchResults &&
            searchResults.map((item) => (
              <SearchResultItem
                key={item.productId}
                to={`/products/${item.slug}`}
                icon={SearchIcon}
                text={item.productName}
                onClick={() => setIsSearching(false)}
              />
            ))}
        </div>
      )}
    </div>
  );
}
