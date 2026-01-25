import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Custom providers wrapper for tests
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

// Custom render function with providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
};

// Re-export everything from Testing Library
export * from '@testing-library/react';

// Override render with custom render
export { customRender as render };

// Test utility functions
export const mockLocalStorage = (data: Record<string, string> = {}) => {
  const getItem = (key: string) => data[key] || null;
  const setItem = (key: string, value: string) => {
    data[key] = value;
  };
  const removeItem = (key: string) => {
    delete data[key];
  };
  const clear = () => {
    Object.keys(data).forEach((key) => delete data[key]);
  };

  Object.defineProperty(window, 'localStorage', {
    value: { getItem, setItem, removeItem, clear },
    writable: true,
  });

  return { getItem, setItem, removeItem, clear };
};

// Wait for async updates
export const waitForAsync = () => new Promise((resolve) => setTimeout(resolve, 0));

// Create mock timer for workout tests
export const createMockTimer = () => {
  let currentTime = 0;
  let callbacks: Array<{ time: number; callback: () => void }> = [];

  return {
    advanceTime: (ms: number) => {
      currentTime += ms;
      callbacks
        .filter((cb) => cb.time <= currentTime)
        .forEach((cb) => cb.callback());
      callbacks = callbacks.filter((cb) => cb.time > currentTime);
    },
    scheduleCallback: (ms: number, callback: () => void) => {
      callbacks.push({ time: currentTime + ms, callback });
    },
    getCurrentTime: () => currentTime,
    reset: () => {
      currentTime = 0;
      callbacks = [];
    },
  };
};
