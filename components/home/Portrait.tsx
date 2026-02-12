import Image from "next/image";

export default function Portrait() {
  return (
    <div className="relative flex justify-center lg:justify-end my-6 sm:my-7 lg:my-0">
      <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-96 md:h-96">
        {/* back rotated card */}
        <div
          className="
            absolute left-2 top-3 sm:left-3 sm:top-4 md:left-4 md:top-5
            w-52 h-52 sm:w-64 sm:h-64 md:w-96 md:h-96
            bg-text
            rounded-2xl
            rotate-3 sm:rotate-5 md:rotate-6
            animate-flip-up
            animate-duration-600
          "
        />
        {/* front card */}
        <div
          className="
            absolute left-0 top-0
            w-52 h-52 sm:w-64 sm:h-64 md:w-96 md:h-96
            bg-panel
            rounded-2xl
            shadow-[0_20px_55px_-28px_rgba(0,0,0,0.65)]
            overflow-hidden
            animate-flip-up
            animate-duration-600
          "
        >
          <div className="w-full h-full grid place-items-center p-4 sm:p-5 md:p-7">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-bg">
              <Image
                src="/avatar.png"
                alt="Portrait"
                fill
                sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 384px"
                className="object-cover animate-jump-in animate-duration-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
