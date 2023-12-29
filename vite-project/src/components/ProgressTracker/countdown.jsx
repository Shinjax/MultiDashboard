import { useState, useEffect } from 'react';

// note: 
// -need to add: 
// -start and stop timer 
// -changing the intervals manually
// -reset timer

const Countdown = ({ hours, minutes, seconds }) => {
  const [remainingHours, setRemainingHours] = useState(hours);
  const [remainingMinutes, setRemainingMinutes] = useState(minutes);
  const [remainingSeconds, setRemainingSeconds] = useState(seconds);
 
  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingSeconds > 0) {
        setRemainingSeconds((prev) => prev - 1);
      } else if (remainingMinutes > 0) {
        setRemainingMinutes((prev) => prev - 1);
        setRemainingSeconds(59);
      } else if (remainingHours > 0) {
        setRemainingHours((prev) => prev - 1);
        setRemainingMinutes(59);
        setRemainingSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingHours, remainingMinutes, remainingSeconds]);

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');

    return d;
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  return (
    <div>
      <div className="countdownWrapper">
        <div className="countdownItem">
          <svg className="countdownSvg" width="100" height="100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#333" strokeWidth="4" />
            <path
              fill="none"
              stroke="#61dafb"
              strokeWidth="4"
              d={describeArc(50, 50, 48, 0, (remainingHours / hours) * 360)}
            />
          </svg>
          {String(remainingHours).padStart(2, '0')}
          <span>hours</span>
        </div>
        <div className="countdownItem">
          <svg className="countdownSvg" width="100" height="100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#333" strokeWidth="4" />
            <path
              fill="none"
              stroke="#61dafb"
              strokeWidth="4"
              d={describeArc(50, 50, 48, 0, (remainingMinutes / 60) * 360)}
            />
          </svg>
            {String(remainingMinutes).padStart(2, '0')}
            <span>minutes</span>
        </div>
        <div className="countdownItem">
          <svg className="countdownSvg" width="100" height="100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#333" strokeWidth="4" />
            <path
              fill="none"
              stroke="#61dafb"
              strokeWidth="4"
              d={describeArc(50, 50, 48, 0, (remainingSeconds / 60) * 360)}
            />
          </svg>
          {String(remainingSeconds).padStart(2, '0')}
          <span>seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
