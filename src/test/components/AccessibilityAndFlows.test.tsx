import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { EchoProvider } from '../../context/EchoContext';
import App from '../../App';
import { Header } from '../../components/Header';
import { EvaluatorMode } from '../../components/EvaluatorMode';

describe('ECHO Integration & Accessibility Workflows', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Primary Navigation & View Transitions', () => {
    it('switches between The Sky and Constellation views cleanly', async () => {
      render(<App />);

      // Initially in Sky view
      expect(screen.getByRole('region', { name: /The Sky/i })).toBeInTheDocument();

      // Click Constellation in Navigation Dock
      const constellationNavBtn = screen.getByRole('button', {
        name: /Constellation/i,
      });
      fireEvent.click(constellationNavBtn);

      // Should transition to Constellation graph view asynchronously via React Suspense
      const constellationRegion = await screen.findByRole('region', {
        name: /Constellation - Relationship Memory Field/i,
      });
      expect(constellationRegion).toBeInTheDocument();
    });

    it('renders ambient audio sound toggle in Header', () => {
      const handleSelectView = () => {};
      render(
        <EchoProvider>
          <Header currentView="sky" onSelectView={handleSelectView} />
        </EchoProvider>
      );

      const audioBtn = screen.getByRole('button', {
        name: /Mute ambient harmonic audio/i,
      });
      expect(audioBtn).toBeInTheDocument();

      // Toggle audio
      fireEvent.click(audioBtn);
      expect(screen.getByRole('button', { name: /Unmute ambient harmonic audio/i })).toBeInTheDocument();
    });
  });

  describe('Evaluator Mode Suite (Ctrl+Shift+E)', () => {
    it('opens Evaluator Mode via keyboard shortcut and handles quick actions', () => {
      render(
        <EchoProvider>
          <EvaluatorMode />
        </EchoProvider>
      );

      // Trigger Ctrl+Shift+E
      fireEvent.keyDown(window, {
        key: 'E',
        ctrlKey: true,
        shiftKey: true,
      });

      // Dialog should open
      const dialog = screen.getByRole('dialog', { name: /Evaluator Quick Suite/i });
      expect(dialog).toBeInTheDocument();

      // Verify actions exist
      expect(screen.getByText(/Trigger Mutual Resonance Reveal/i)).toBeInTheDocument();
      expect(screen.getByText(/Simulate Full Constellation/i)).toBeInTheDocument();
      expect(screen.getByText(/Trigger Dissolving Letter Demo/i)).toBeInTheDocument();
    });
  });

  describe('Mood Filter Spectrum', () => {
    it('allows filtering moments by mood pills', () => {
      render(<App />);

      const filterNav = screen.getByRole('navigation', { name: /Filter moments by mood spectrum/i });
      const reflectivePill = within(filterNav).getByRole('button', { name: /Reflective/i });
      expect(reflectivePill).toBeInTheDocument();

      fireEvent.click(reflectivePill);
      expect(reflectivePill).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
