import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Pokemon } from "../App";

interface PopupProps {
  showPopup: boolean;
  pokemon: Pokemon;
  handlePopup: Function;
}
export default function Popup(props: PopupProps) {
  return (
    <Dialog open={props.showPopup} onClose={() => props.handlePopup(0)}>
      <DialogTitle>{props.pokemon.name}</DialogTitle>
      <DialogContent>
        <img src={props.pokemon.imgUrl} alt={props.pokemon.name} />
        <DialogContentText>
          Größe: {props.pokemon.height}
          <br />
          Basiserfahrung: {props.pokemon.baseExperience}
        </DialogContentText>
        <Button variant="contained" onClick={() => props.handlePopup(0)}>
          Schließen
        </Button>
      </DialogContent>
    </Dialog>
  );
}
