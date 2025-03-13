export interface IEditorProps {
  style?: Record<string, string>;
  styleClass?: string;
  placeholder?: string;
  formats?: string[];
  modules?: Record<string, unknown>;
  readOnly?: boolean;
}

export interface ITextChangeEvent {
  htmlValue: string;
  textValue: string;
  delta: unknown;
  source: string;
}
