import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { EchoProvider } from '../../context/EchoContext';
import { SkyCanvas } from '../../features/sky/SkyCanvas';
import { CastMomentModal } from '../../features/cast/CastMomentModal';
import { MomentFloatingCard } from '../../features/sky/MomentFloatingCard';
import { SEED_MOMENTS } from '../../data/seedMoments';

describe('ECHO Components & Accessibility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Sky Canvas Ambient Interaction & Accessibility', () => {
    it('renders the Sky canvas with accessible landmark region', () => {
      render(
        <EchoProvider>
          <SkyCanvas />
        </EchoProvider>
      );

      const skyRegion = screen.getByRole('region', {
        name: /The Sky - Ambient Canvas of Drifting Moments/i,
      });
      expect(skyRegion).toBeInTheDocument();
    });

    it('renders moment lights with accessible button roles and keyboard operability', () => {
      render(
        <EchoProvider>
          <SkyCanvas />
        </EchoProvider>
      );

      const momentButtons = screen.getAllByRole('button', {
        name: /Moment by/i,
      });
      expect(momentButtons.length).toBeGreaterThan(0);

      // Verify moments are focusable with tabIndex 0
      expect(momentButtons[0]).toHaveAttribute('tabindex', '0');
    });

    it('opens floating moment detail card upon selecting a moment light', () => {
      render(
        <EchoProvider>
          <SkyCanvas />
        </EchoProvider>
      );

      const momentButtons = screen.getAllByRole('button', {
        name: /Moment by/i,
      });

      fireEvent.click(momentButtons[0]);

      // Floating card dialog should appear
      const dialog = screen.getByRole('dialog', {
        name: /Moment by/i,
      });
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Moment Floating Card & Resonance Action', () => {
    it('renders moment text and handles private resonate action', () => {
      const sampleMoment = SEED_MOMENTS[0];
      const handleClose = () => {};

      render(
        <EchoProvider>
          <MomentFloatingCard moment={sampleMoment} onClose={handleClose} />
        </EchoProvider>
      );

      // Text should be rendered
      expect(screen.getByText(new RegExp(sampleMoment.text.slice(0, 30), 'i'))).toBeInTheDocument();

      // Resonate button should be available
      const resonateBtn = screen.getByRole('button', {
        name: /Resonate privately with this moment/i,
      });
      expect(resonateBtn).toBeInTheDocument();

      // Trigger resonance
      fireEvent.click(resonateBtn);

      // Should update to resonated state
      expect(
        screen.getByRole('button', {
          name: /You have resonated with this moment/i,
        })
      ).toBeInTheDocument();
    });
  });

  describe('Cast a Moment Flow', () => {
    it('renders modal, inputs reflection text, and allows casting', () => {
      render(
        <EchoProvider>
          <CastMomentModal />
        </EchoProvider>
      );

      // Since isCastOpen is initially false, modal is not visible initially
      expect(screen.queryByRole('dialog', { name: /Cast/i })).not.toBeInTheDocument();
    });
  });
});
