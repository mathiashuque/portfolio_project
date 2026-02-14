export default function AboutStyles() {
  return (
    <style>{`
      @keyframes aboutbar {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }

      @keyframes fadeSlide {
        from { opacity: 0; transform: translateY(6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  );
}
