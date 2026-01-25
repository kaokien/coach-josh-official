import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
});

// Mock Web Worker (for timer workers)
class MockWorker {
  onmessage: ((e: MessageEvent) => void) | null = null;
  postMessage = vi.fn((data: any) => {
    // Simulate worker response
    if (this.onmessage) {
      setTimeout(() => {
        this.onmessage?.({ data: { type: 'tick' } } as MessageEvent);
      }, 0);
    }
  });
  terminate = vi.fn();
}

Object.defineProperty(window, 'Worker', {
  writable: true,
  value: MockWorker,
});

// Also define globally for direct Worker usage
(globalThis as any).Worker = MockWorker;

// Mock navigator.wakeLock (for screen wake lock)
Object.defineProperty(navigator, 'wakeLock', {
  writable: true,
  value: {
    request: vi.fn().mockResolvedValue({
      release: vi.fn(),
    }),
  },
});

// Mock navigator.vibrate (for haptic feedback)
Object.defineProperty(navigator, 'vibrate', {
  writable: true,
  value: vi.fn(() => true),
});

// Mock AudioContext (for audio features)
class MockAudioContext {
  createOscillator = vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    frequency: { setValueAtTime: vi.fn() },
  }));
  createGain = vi.fn(() => ({
    connect: vi.fn(),
    gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
  }));
  destination = {};
  currentTime = 0;
}

Object.defineProperty(window, 'AudioContext', {
  writable: true,
  value: MockAudioContext,
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    motion: {
      div: ({ children, ...props }: any) => <div {...props} > {children} </div>,
      button: ({ children, ...props }: any) => <button {...props} > {children} </button>,
      span: ({ children, ...props }: any) => <span {...props} > {children} </span>,
      p: ({ children, ...props }: any) => <p {...props} > {children} </p>,
      h1: ({ children, ...props }: any) => <h1 {...props} > {children} </h1>,
      h2: ({ children, ...props }: any) => <h2 {...props} > {children} </h2>,
      h3: ({ children, ...props }: any) => <h3 {...props} > {children} </h3>,
    },
  };
});
