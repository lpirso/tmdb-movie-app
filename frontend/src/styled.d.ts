import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      textPrimary: string;
      textSecondary: string;
      backgroundPrimary: string;
      backgroundSecondary: string;
    };
  }
}