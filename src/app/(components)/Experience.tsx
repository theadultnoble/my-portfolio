import React from "react";
import Image from "next/image";
import back4app from "../../public/assets/b4a-logo.png";
import openReplay from "../../public/assets/OpenReplay-logo.png";
import muo from "../../public/assets/MUO-logo.png";
import mindrift from "../../public/assets/Mindrift-logo.png";

function Experience() {
  return (
    <div className="flex flex-col gap-5 mt-6 h-48 overflow-y-auto scrollbar-w-none">
      <div className="flex items-center gap-2">
        <Image src={openReplay} alt="openreplay-logo" width={50} className="rounded-full" />
        <div>
          <p className="font-medium text-[#464644]">OpenReplay</p>
          <p className="text-xs">Sep 2022 - Dec 2022</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Image src={mindrift} alt="mindrift-logo" width={50} className="rounded-full" />
        <div>
          <p className="font-medium text-[#464644]">Mindrift</p>
          <p className="text-xs">Oct 2022 - Jan 2024</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Image src={muo} alt="MUO-logo" width={50} className="rounded-full" />
        <div>
          <p className="font-medium text-[#464644]">MakeUseOf</p>
          <p className="text-xs">Mar 2024 - Aug 2024</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Image src={back4app} alt="back4app-logo" width={50} className="rounded-full" />
        <div>
          <p className="font-medium text-[#464644]">Back4app</p>
          <p className="text-xs">Jun 2023 - Present</p>
        </div>
      </div>
    </div>
  );
}

export default Experience;
