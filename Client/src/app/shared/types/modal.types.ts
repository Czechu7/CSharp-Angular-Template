export type ConfirmModalProps = {
  header: string;
  visible: boolean;
  message: string;
  yesLabel: string;
  noLabel: string;
  onYes: () => void;
  onNo: () => void;
};

export type InfoModalProps = {
  header: string;
  visible: boolean;
  message: string;
};
