import { useEffect, useState } from 'react';

export function useMobileDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return {
    open,
    openDrawer: () => setOpen(true),
    closeDrawer: () => setOpen(false),
  };
}
