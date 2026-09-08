import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { EchoProvider } from '../../context/EchoContext';
import App from '../../App';
import { Header } from '../../components/Header';

describe('Official REIMAGINE SOCIAL Alignment Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('30-Second Judge Onboarding & Manifesto', () => {
    it('renders "What is ECHO?" button and opens the philosophy manifesto modal', () => {
      const handleSelectView = () => {};
      render(
        <EchoProvider>
          <Header currentView="sky" onSelectView={handleSelectView} />
        </EchoProvider>
      );

      const whatIsEchoBtn = screen.getByRole('button', { name: /What is ECHO\?/i });
      expect(whatIsEchoBtn).toBeInTheDocument();

      fireEvent.click(whatIsEchoBtn);

      const modalTitle = screen.getByText(/ECHO: Reimagined Social Model/i);
      expect(modalTitle).toBeInTheDocument();

      // Check all 4 30-second judge answers
      expect(screen.getByText(/1. What is ECHO\?/i)).toBeInTheDocument();
      expect(screen.getByText(/2. What do I do here\?/i)).toBeInTheDocument();
      expect(screen.getByText(/3. How do I interact with another person\?/i)).toBeInTheDocument();
      expect(screen.getByText(/4. What makes this different from a normal social network\?/i)).toBeInTheDocument();
    });

    it('renders atmospheric orientation whispers directly on Sky Canvas', () => {
      render(<App />);

      expect(screen.getByText(/Ambient Spatial Field \(No Feeds\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Mutual Resonance \(No Likes\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Constellation Circle \(Cap 15\)/i)).toBeInTheDocument();
    });
  });

  describe('Hero Mutual Attunement Mechanics', () => {
    it('triggers Mutual Resonance Hero Reveal when resonating with secret mutual moment', async () => {
      render(<App />);

      // Find Elena's moment-1 (secret mutual moment: Watching the morning light slant)
      const elenaMomentBtn = screen.getByRole('button', {
        name: /Watching the morning light slant/i,
      });
      expect(elenaMomentBtn).toBeInTheDocument();

      // Click to open Moment Card
      fireEvent.click(elenaMomentBtn);

      // Find Floating Card dialog
      const dialog = screen.getByRole('dialog', { name: /Moment by Elena Vance/i });
      expect(dialog).toBeInTheDocument();

      // Click "Resonate quietly" inside card
      const resonateBtn = within(dialog).getByRole('button', { name: /Resonate/i });
      fireEvent.click(resonateBtn);

      // Hero reveal modal should pop up with assertive ARIA alert
      const mutualAlert = await screen.findByRole('alert');
      expect(mutualAlert).toBeInTheDocument();
      expect(screen.getByText(/Something here answered back/i)).toBeInTheDocument();
      expect(screen.getByText(/Your resonance is mutual/i)).toBeInTheDocument();
    });
  });
});
