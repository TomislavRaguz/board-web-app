import React from 'react';
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  Button, 
  DialogTitle, 
  DialogContentText 
} from "@mui/material";
type AlertDialogState = {
  shown: boolean,
  title: string,
  content: string,
  dialogActions: Array<{
    label: string
    onClick: () => void
  }>
}

export class AlertDialog extends React.Component<{}, AlertDialogState>{
  constructor(props:{}){
    super(props)
    this.state = {
      shown: false,
      title: 'title',
      content: 'content',
      dialogActions: [],
    }
  }

  show = (title:string, content:string, dialogActions: Array<{
    label: string
    onClick: () => void
  }>) => { 
    this.setState({ shown: true, title, content, dialogActions }) 
  }
  handleClose = () => {
    this.setState({ shown: false })
  };

  render(){
    return(
      <Dialog
        open={this.state.shown}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.state.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!this.state.dialogActions.length ? (
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
            ):(
              this.state.dialogActions.map(dialogAction => (
                <Button key={dialogAction.label} onClick={() => { dialogAction.onClick();this.handleClose()}} color="primary">
                  {dialogAction.label}
                </Button>
              ))
            )
          }
        </DialogActions>
      </Dialog>
    )
  }
}

export const alertDialogRef = React.createRef<AlertDialog>()
export const displayAlertDialog = (title:string, content:string, dialogActions: Array<{
  label: string
  onClick: () => void
}>) => {
  alertDialogRef.current?.show(title, content, dialogActions)
}