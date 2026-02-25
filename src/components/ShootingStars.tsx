import React, { useEffect, useState } from 'react';

const ShootingStars = () => {
  const [stars, setStars] = useState<Array<{ id: number; top: string; right: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    // Limit to 3 stars for elegance
    const newStars = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      // Wide distribution: top -10% to 50%, right -20% to 100%
      top: `${Math.random() * 60 - 10}%`, 
      right: `${Math.random() * 120 - 20}%`,
      // Long delays for occasional appearance
      delay: `${Math.random() * 15}s`,
      // Slow, elegant duration (4s to 7s)
      duration: `${4 + Math.random() * 3}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map(star => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            top: star.top,
            right: star.right,
            animation: `shooting ${star.duration} linear infinite`,
            animationDelay: star.delay
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStars;
