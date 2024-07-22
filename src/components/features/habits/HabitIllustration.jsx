/* eslint-disable react/prop-types */
const HabitIllustration = ({ width = 100, height = 100 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 200 200">
      <style>
        {`
          @keyframes grow {
            0% { transform: scale(0); }
            100% { transform: scale(1); }
          }
          .plant { animation: grow 2s ease-out forwards; transform-origin: bottom center; }
        `}
      </style>
      <rect width="200" height="200" fill="#f0f0f0" />
      <path d="M100 180 L100 120" stroke="#8B4513" strokeWidth="4" />
      <g className="plant">
        <path d="M70 120 Q100 80 130 120" fill="#4CAF50" />
        <path d="M80 100 Q100 60 120 100" fill="#4CAF50" />
        <path d="M90 80 Q100 40 110 80" fill="#4CAF50" />
      </g>
    </svg>
  );
};

export default HabitIllustration;
