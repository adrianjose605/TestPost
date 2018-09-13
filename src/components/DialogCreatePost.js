import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class DialogCreatePost extends React.Component {
  
  constructor(props) {
    super(props);  
  }
  state={
    name:'',
    description:''
  }

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  handleClose = () => {
     this.props.onClose({});
  };
  handleSave = () => {
     this.props.onClose({name:this.state.name, description:this.state.description});
  };

  handleChangeName = event=>{
    this.setState({name:event.target.value})
  }
  handleChangeDescription = event=>{
    this.setState({description:event.target.value})
  }

  // handleInputChange(event) {
  //   const target = event.target;
  //   // const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [newPost]: {"name":name}
  //   });
  // }


// <Button onClick={this.handleClickOpen}>Open form dialog</Button>
  render() {
    const { onClose, newPost,...other } = this.props;
    return (
      <div>
        
        <Dialog 
          onClose={this.handleClose}
           {...other}         
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Ingrese un nuevo Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre"
              type="string"
              value={this.state.name}
              onChange={this.handleChangeName}
              fullWidth              
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Descripción"
              type="string"
              value={this.state.description}
              onChange={this.handleChangeDescription}
              fullWidth              
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogCreatePost.propTypes = {
  onClose: PropTypes.func,
  newPost: PropTypes.object,
};