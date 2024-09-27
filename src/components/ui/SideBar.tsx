import { IconNames } from "@/src/enums/IconNames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconBlock } from "./IconBlock";

export const SideBar = () => {
  const [selected, setSelected] = useState<IconNames>(IconNames.CrisisAlert);
  const router = useRouter();

  const icons = [
    { icon: IconNames.CrisisAlert, route: "/alerts" },
    { icon: IconNames.Group, route: "/patients" },
    { icon: IconNames.DeviceHub, route: "/sensors" },
    { icon: IconNames.Info, route: "/guide" },
    { icon: IconNames.Settings, route: "/general" },
  ];

  const handleIconClick = (icon: IconNames, path: string) => {
    setSelected(icon);
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-between bg-blue-800 h-full w-16 py-4">
      <div className="flex flex-col gap-y-16">
        <IconBlock icon={IconNames.Menu} />
        <div className="flex flex-col gap-y-3">
          {icons.map(({ icon, route }) => (
            <IconBlock
              key={icon}
              icon={icon}
              selected={selected === icon}
              onClick={() => handleIconClick(icon, route)}
            />
          ))}
        </div>
      </div>
      <IconBlock
        icon={IconNames.Logout}
        selected={selected === IconNames.Logout}
      />
    </div>
  );
};
