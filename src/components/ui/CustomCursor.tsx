import React from 'react';

interface CustomCursorProps {
  cursorRef: React.RefObject<HTMLDivElement>;
  followerRef: React.RefObject<HTMLDivElement>;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ cursorRef, followerRef }) => {
  return (
    <>
      {/* Primary cursor dot */}
      <div
        ref={cursorRef}
        className="fixed z-[9999] top-0 left-0 w-2 h-2 rounded-full bg-off-white/50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-difference flex items-center justify-center text-center overflow-hidden"
      ></div>
      {/* Follower cursor circle */}
      <div
        ref={followerRef}
        className="fixed z-[9998] top-0 left-0 w-8 h-8 rounded-full border border-off-white/20 bg-off-white/10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-difference"
      ></div>
    </>
  );
};

export default CustomCursor;