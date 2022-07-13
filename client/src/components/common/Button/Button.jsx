import { Button } from "@mui/material";
import {styled} from "@mui/material/styles";

const MDButton = styled(Button)(() => ({

}));

export const RoundedButton = styled(MDButton)(() => ({
    borderRadius: '23px'
}));

export default MDButton;