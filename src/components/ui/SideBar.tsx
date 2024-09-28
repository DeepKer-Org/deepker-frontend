import { IconNames } from "@/src/enums/IconNames";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SectionBlock } from "./SectionBlock";

export const SideBar = () => {
  const [selected, setSelected] = useState<IconNames | null>(null);
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const icons = [
    { icon: IconNames.CrisisAlert, route: "/alerts", label: "Alertas" },
    { icon: IconNames.Group, route: "/patients", label: "Pacientes" },
    { icon: IconNames.DeviceHub, route: "/sensors", label: "Dispositivos" },
    { icon: IconNames.Info, route: "/guide", label: "Guía Instructiva" },
    { icon: IconNames.Settings, route: "/general", label: "General" },
  ];

  useEffect(() => {
    const matchingIcon = icons.find((icon) => icon.route === pathname);
    if (matchingIcon) {
      setSelected(matchingIcon.icon);
    }
  }, [pathname]);

  const handleIconClick = (icon: IconNames, path: string) => {
    setSelected(icon);
    router.push(path);
  };

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col justify-between bg-blue-800 h-full py-4 transition-all duration-200 ${
        open ? "w-56 px-4 relative" : "w-16 items-center"
      }`}
    >
      <div className="flex flex-col gap-y-16">
        {open ? (
          <div>
            <SectionBlock
              className="absolute top-0.5 right-0.5"
              icon={IconNames.Close}
              onClick={toggleSidebar}
              showHover={false}
            />
            <div className="title">
              <img src="icons/deepker-original.webp" alt="logo" />
              <p>DeepKer</p>
            </div>
          </div>
        ) : (
          <SectionBlock icon={IconNames.Menu} onClick={toggleSidebar} />
        )}
        <div className="flex flex-col gap-y-3">
          {icons.map(({ icon, route, label }) => (
            <SectionBlock
              key={icon}
              icon={icon}
              selected={selected === icon}
              label={open ? label : undefined}
              onClick={() => handleIconClick(icon, route)}
              sidebarOpen={open}
            />
          ))}
        </div>
      </div>
      <SectionBlock
        icon={IconNames.Logout}
        selected={selected === IconNames.Logout}
        label={open ? "Cerrar Sesión" : undefined}
        sidebarOpen={open}
      />
    </div>
  );
};
