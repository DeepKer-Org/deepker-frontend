import React from "react";

interface SnackbarTemplateProps {
  message: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  textColor: string;
}

export const SuccessSnackbar = React.forwardRef<
  HTMLDivElement,
  { message: string }
>((props, ref) => {
  return (
    <div
      className={`w-full bg-[#EAF6EA] text-[#1C3E1D] py-5 px-6 rounded-md flex items-center space-x-4`}
      ref={ref}
    >
      <span className={`material-symbols-outlined text-[#3D7E3D]`}>
        check_circle
      </span>
      <span>{props.message}</span>
    </div>
  );
});

export const ErrorSnackbar = React.forwardRef<
  HTMLDivElement,
  { message: string }
>((props, ref) => {
  return (
    <div
      className={`w-full bg-[#FDEAEA] text-[#551E1D] py-5 px-6 rounded-md flex items-center space-x-4`}
      ref={ref}
    >
      <span className={`material-symbols-outlined text-[#D33E3B]`}>error</span>
      <span>{props.message}</span>
    </div>
  );
});

export const WarningSnackbar = React.forwardRef<
  HTMLDivElement,
  { message: string }
>((props, ref) => {
  return (
    <div
      className={`w-full bg-[#FFF2E1] text-[#5B3500] py-5 px-6 rounded-md flex items-center space-x-4`}
      ref={ref}
    >
      <span className={`material-symbols-outlined text-[#EC7027]`}>warning</span>
      <span>{props.message}</span>
    </div>
  );
});

export const InfoSnackbar = React.forwardRef<
  HTMLDivElement,
  { message: string }
>((props, ref) => {
  return (
    <div
      className={`w-full bg-[#E1F4FD] text-[#013A56] py-5 px-6 rounded-md flex items-center space-x-4`}
      ref={ref}
    >
      <span className={`material-symbols-outlined text-[#2788CF]`}>info</span>
      <span>{props.message}</span>
    </div>
  );
});

