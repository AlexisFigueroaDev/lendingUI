export type BackdropLeningProp = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  itemText: itemTextBackdrop[];
  titleBackdrop: string;
  titlePrimaryButton: string;
};

type itemTextBackdrop = {
  bullets: string;
  text: string;
};

export type NavBarLendingProp = {
  onPressIconLeft: () => void;
  onPressIconRigth: () => void;
};
