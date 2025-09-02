// Type for Universal Button
export type textProps = {
  header: string;
  body: string;
};

//type for Button
export type buttonProperties = {
  buttonName: string;
  buttonColor: string;
  buttonNameColor: string;
  buttonLayout: object;
  disabled?: boolean;
  onPress(): any;
};
