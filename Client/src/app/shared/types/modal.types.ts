export interface ConfirmModalProps {
  header: string;
  visible: boolean;
  message: string;
  yesLabel: string;
  noLabel: string;
  onYes: () => void;
  onNo: () => void;
}

export interface InfoModalProps {
  header: string;
  visible: boolean;
  message: string;
}
