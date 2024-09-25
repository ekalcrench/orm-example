import {
  Palette as MuiPallete,
  PaletteOptions as MuiPaletteOptions,
} from "@mui/material/styles/createPalette";

interface InputType {
  placeholder: string;
  borderColor: string;
}

interface CardType {
  boxShadow: string;
  borderColor: string;
}

declare module "@mui/material/styles/createPalette" {
  interface Palette extends MuiPallete {
    regalBlue: MuiPallete["primary"];
    tangerine: MuiPallete["primary"];
    solomie: MuiPallete["primary"];
    concrete: MuiPallete["primary"];
    input: InputType;
    card: CardType;
  }

  interface PaletteOptions extends MuiPaletteOptions {
    regalBlue?: MuiPaletteOptions["primary"];
    tangerine?: MuiPaletteOptions["primary"];
    solomie?: MuiPaletteOptions["primary"];
    concrete?: MuiPaletteOptions["primary"];
    input?: Partial<InputType>;
    card?: Partial<CardType>;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    regalBlue: true;
    tangerine: true;
    solomie: true;
    concrete: true;
    input: true;
  }
}
