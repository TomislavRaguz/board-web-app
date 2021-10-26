import { Backdrop, CircularProgress } from "@mui/material";
import React, { Component } from "react"

export class LoadingOverlay extends Component<{}, { shouldShow: boolean }>{
  state = { shouldShow: false }

  show = (shouldShow: boolean) => {
    this.setState({ shouldShow })
  }

  render() {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme:any) => theme.zIndex.drawer + 1 }}
        open={this.state.shouldShow}
        onClick={() => this.show(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }
}

export const loadingOverlayRef = React.createRef<LoadingOverlay>()
export const showLoadingOverlay = (show: boolean) => loadingOverlayRef.current?.show(show)

