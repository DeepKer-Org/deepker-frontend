import { IconName } from "@/src/enums/IconName";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SectionBlock from "../SectionBlock";
import {useAuth} from "@/src/context/AuthContext";
import Image from "next/image";

const SideBar = () => {
  const [selected, setSelected] = useState<IconName | null>(null);
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { signOut, roles } = useAuth();

  // Define icons for each role
  const adminIcons = [
    { icon: IconName.PersonAdd, route: "/admin/panel", label: "Administración" },
  ];

  const doctorIcons = [
    { icon: IconName.CrisisAlert, route: "/alerts", label: "Alertas" },
    { icon: IconName.Group, route: "/patients", label: "Pacientes" },
    { icon: IconName.DeviceHub, route: "/devices", label: "Dispositivos" },
    { icon: IconName.Info, route: "/guide", label: "Guía Instructiva" },
    { icon: IconName.AccountBox, route: "/account", label: "Cuenta" },
  ];

  // Combine icons based on roles
  const icons = [
    ...(roles.includes("admin") ? adminIcons : []),
    ...(roles.includes("doctor") ? doctorIcons : []),
  ];

  // Handle selected icon based on the current path
  useEffect(() => {
    const matchingIcon = icons.find((icon) => icon.route === pathname);
    if (matchingIcon) {
      setSelected(matchingIcon.icon);
    }
  }, [pathname, icons]);

  // Icon click handler
  const handleIconClick = (icon: IconName, path: string) => {
    setSelected(icon);
    router.push(path);
  };

  // Sign out handler
  const handleSignOut = () => {
    signOut();
    router.push("/auth/login");
  };

  // Sidebar toggle
  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
      <div
          className={`flex flex-col justify-between bg-blue-800 h-full overflow-y-auto py-4 transition-all duration-200 ${
              open ? "w-56 min-w-56 max-w-56 px-4 relative" : "w-16 min-w-16 max-w-16 items-center"
          }`}
      >
        <div className="flex flex-col gap-y-16">
          {open ? (
              <div>
                <SectionBlock
                    className="absolute top-0.5 right-0.5"
                    icon={IconName.Close}
                    onClick={toggleSidebar}
                    showHover={false}
                />
                <div className="title">
                  <Image src={"/icons/deepker-original.webp"} alt={"logo"} width={50} height={50} />
                  <p>DeepKer</p>
                </div>
              </div>
          ) : (
              <SectionBlock icon={IconName.Menu} onClick={toggleSidebar} />
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
            icon={IconName.Logout}
            selected={selected === IconName.Logout}
            label={open ? "Cerrar Sesión" : undefined}
            sidebarOpen={open}
            onClick={handleSignOut}
        />
      </div>
  );
};

export default SideBar;