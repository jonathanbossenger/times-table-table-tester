import { useRef, useCallback } from 'react';
import { useGame } from '../context/GameContext';

export function useFocus() {
  const { problems } = useGame();
  const inputRefs = useRef({});

  const registerRef = useCallback((id, ref) => {
    if (ref) {
      inputRefs.current[id] = ref;
    }
  }, []);

  const focusInput = useCallback((id) => {
    if (inputRefs.current[id]) {
      inputRefs.current[id].focus();
    }
  }, []);

  const focusNext = useCallback((currentId) => {
    const currentIndex = problems.findIndex(p => p.id === currentId);
    if (currentIndex < problems.length - 1) {
      const nextId = problems[currentIndex + 1].id;
      focusInput(nextId);
    }
  }, [problems, focusInput]);

  const focusPrevious = useCallback((currentId) => {
    const currentIndex = problems.findIndex(p => p.id === currentId);
    if (currentIndex > 0) {
      const previousId = problems[currentIndex - 1].id;
      focusInput(previousId);
    }
  }, [problems, focusInput]);

  return {
    registerRef,
    focusInput,
    focusNext,
    focusPrevious
  };
}
