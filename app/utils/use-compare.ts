import { useState, useEffect } from 'react';

export interface CompareItem {
  productSlug: string;
  productVariantId: string;
}

const STORAGE_KEY = 'compare_list';
const MAX_COMPARE_ITEMS = 3;

export function useCompare() {
  const [items, setItems] = useState<CompareItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse compare list from localStorage', e);
      }
    }
  }, []);

  const persistItems = (newItems: CompareItem[]) => {
    setItems(newItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    window.dispatchEvent(new Event('storage'));
  };

  const addItem = (item: CompareItem) => {
    if (!item.productSlug || !item.productVariantId) {
      console.warn('Cannot add item to compare list: missing slug or variant ID', item);
      return false;
    }
    
    if (items.some((i) => i.productVariantId === item.productVariantId)) {
      return false;
    }
    
    let newItems = [...items, item];
    if (newItems.length > MAX_COMPARE_ITEMS) {
      newItems = newItems.slice(1);
    }
    
    persistItems(newItems);
    return true;
  };

  const removeItem = (productVariantId: string) => {
    const newItems = items.filter((i) => i.productVariantId !== productVariantId);
    persistItems(newItems);
  };

  const isInCompare = (productVariantId: string) => {
    return items.some((i) => i.productVariantId === productVariantId);
  };

  const clearCompare = () => {
    persistItems([]);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        setItems([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    items,
    addItem,
    removeItem,
    isInCompare,
    clearCompare,
  };
}
