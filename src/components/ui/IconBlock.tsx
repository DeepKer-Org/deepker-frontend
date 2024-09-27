import { IconNames } from "@/src/enums/IconNames";

interface IconBlockProps {
  icon: IconNames;
  selected?: boolean;
  onClick?: () => void;
}

export const IconBlock: React.FC<IconBlockProps> = ({
  icon,
  selected = false,
  onClick,
}) => {
  return (
    <span
      className={`material-symbols-outlined ${
        selected ? "selected text-blue-800 bg-white" : "text-white"
      } p-2 rounded-md text-lg`}
      onClick={onClick}
    >
      {icon}
    </span>
  );
};
