import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../utils/render';
import BreathworkTimer from '@/components/BreathworkTimer';

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: ({ children, ...props }: any) => {
        const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
        return <div {...rest}>{children}</div>;
      },
      button: ({ children, ...props }: any) => {
        const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
        return <button {...rest}>{children}</button>;
      },
    },
  };
});

describe('BreathworkTimer Component', () => {
  beforeEach(() => {
    // Mock localStorage
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('0');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initial Render', () => {
    it('should render the timer component', () => {
      render(<BreathworkTimer />);
      // Component renders with breathing pattern text
      expect(screen.getByText('Box Breathing')).toBeInTheDocument();
    });

    it('should display breathing pattern selector', () => {
      render(<BreathworkTimer />);
      expect(screen.getByText('Box Breathing')).toBeInTheDocument();
    });

    it('should show initial phase as inhale', () => {
      render(<BreathworkTimer />);
      expect(screen.getByText('Inhale')).toBeInTheDocument();
    });

    it('should display play button when not active', () => {
      render(<BreathworkTimer />);
      // Find play button by its accessible role
      const playButtons = screen.getAllByRole('button');
      expect(playButtons.length).toBeGreaterThan(0);
    });

    it('should display inhale countdown number', () => {
      render(<BreathworkTimer />);
      // Countdown should show 4 for Box Breathing
      expect(screen.getByText('4')).toBeInTheDocument();
    });
  });

  describe('Breathing Patterns', () => {
    it('should display Pre-Fight pattern option', () => {
      render(<BreathworkTimer />);
      // All patterns should be visible in the component
      expect(screen.getByText('Pre-Fight (4-7-8)')).toBeInTheDocument();
    });

    it('should have correct timing display for Box Breathing', () => {
      render(<BreathworkTimer />);
      // Box breathing is 4-4-4-4, countdown should show 4
      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('should display all pattern options', () => {
      render(<BreathworkTimer />);
      expect(screen.getByText('Box Breathing')).toBeInTheDocument();
      expect(screen.getByText('Pre-Fight (4-7-8)')).toBeInTheDocument();
      expect(screen.getByText('Recovery')).toBeInTheDocument();
      expect(screen.getByText('Power')).toBeInTheDocument();
      expect(screen.getByText('Corner Break')).toBeInTheDocument();
    });
  });

  describe('Timer Controls', () => {
    it('should have a start/pause button', () => {
      render(<BreathworkTimer />);
      const buttons = screen.getAllByRole('button');
      // Should have at least play, reset, and audio toggle buttons
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });

    it('should have a reset button with accessible label', () => {
      render(<BreathworkTimer />);
      const resetButton = screen.getByLabelText('Reset');
      expect(resetButton).toBeInTheDocument();
    });

    it('should have an audio toggle button', () => {
      render(<BreathworkTimer />);
      const audioButton = screen.getByLabelText(/audio/i);
      expect(audioButton).toBeInTheDocument();
    });

    it('should have Start text in play button', () => {
      render(<BreathworkTimer />);
      expect(screen.getByText('Start')).toBeInTheDocument();
    });
  });

  describe('Round Configuration', () => {
    it('should display round target buttons', () => {
      render(<BreathworkTimer />);
      // Target round options should be visible
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should show 5 as default target rounds', () => {
      render(<BreathworkTimer />);
      // Find the target rounds display
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  describe('Session Tracking', () => {
    it('should load total sessions from localStorage', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('10');
      render(<BreathworkTimer />);
      // The component should have loaded the sessions
      expect(localStorage.getItem).toHaveBeenCalledWith('breathworkSessions');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible buttons with proper labels', () => {
      render(<BreathworkTimer />);
      // Check for aria-labels on buttons
      expect(screen.getByLabelText('Reset')).toBeEnabled();
      expect(screen.getByLabelText(/audio/i)).toBeEnabled();
    });

    it('should have visible phase label', () => {
      render(<BreathworkTimer />);
      // Phase label should be visible for screen readers
      const phaseLabel = screen.getByText('Inhale');
      expect(phaseLabel).toBeVisible();
    });

    it('should have countdown number visible', () => {
      render(<BreathworkTimer />);
      const countdownNumber = screen.getByText('4');
      expect(countdownNumber).toBeVisible();
    });
  });
});
