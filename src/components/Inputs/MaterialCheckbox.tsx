import { Checkbox, CheckboxProps, FormControl, FormControlLabel, FormGroup } from "@mui/material";

export function MaterialCheckbox (props: { 
  label: string
  checkboxProps?: CheckboxProps
}) {
  return (
    <FormControlLabel 
      control={<Checkbox {...props.checkboxProps}/>} 
      label={props.label}
    />
  )
}