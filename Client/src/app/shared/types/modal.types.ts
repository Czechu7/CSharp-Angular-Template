export interface IConfirmModalProps {
  header: string;
  visible: boolean;
  message: string;
  yesLabel: string;
  noLabel: string;
  onYes: () => void;
  onNo: () => void;
}

export interface IInfoModalProps {
  header: string;
  visible: boolean;
  message: string;
}
