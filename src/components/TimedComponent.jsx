// TimedComponent dient dazu, ihre Kinderkomponenten für eine bestimmte Zeitdauer anzuzeigen und sie dann automatisch auszublenden.

import React, { useState, useEffect } from "react";

export default function TimedComponent({ children, duration }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return visible ? <div>{children}</div> : null;
}
