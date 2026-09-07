import { useContext } from 'react';
import { EchoContext, EchoContextType } from '../context/echoContextInstance';

export function useEcho(): EchoContextType {
  const context = useContext(EchoContext);
  if (!context) {
    throw new Error('useEcho must be used within an EchoProvider');
  }
  return context;
}
