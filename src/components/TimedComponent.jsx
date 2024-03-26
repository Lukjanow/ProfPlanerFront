// TimedComponent dient dazu, ihre Kinderkomponenten für eine bestimmte Zeitdauer anzuzeigen und sie dann automatisch auszublenden.

import React, { useState, useEffect } from "react";

export default function TimedComponent({ children, duration, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onClose()
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return visible ? <>{children}</> : null;
}
