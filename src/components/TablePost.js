import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogCreatePost from './DialogCreatePost'
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
const styles = theme => ({
  root: {

    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5,
    overflowX: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
  },
  table: {
    minWidth: 700,
    
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  },
});

let id = 0;
function createData(name, description) {
  id += 1;
  return { id, name, description };
}


const data = [
{id:1,name:'Post 1', description:'Hola Mundo'},
{id:2,name:'Post 2', description:'Hola Mundo'},
{id:3,name:'Post 3', description:'Hola Mundo'},
{id:4,name:'Post 4', description:'Hola Mundo'},
{id:5,name:'Post 5', description:'Hola Mundo'}
];
var dataTable=[];
axios.get(`http://localhost:9000/api/post`).then(data=>{
  dataTable=data.data;
  // console.log(dataTable);
})
// var dataFiltered=data;
var dataPost = [];
  class TablePost extends React.Component {
    state = {
      name: '',
      dataFiltered:[],
      open:false,
      newPost:{}
    };

    componentDidMount(){
    this.getDataPost();
    }

    getDataPost=()=>{
      axios.get(`http://localhost:9000/api/post`)
      .then(res => {
        if(res.data)
        dataPost = res.data;
        this.setState({ dataFiltered:dataPost });
      })
    }
    createDataPost = (data)=> {
      axios.post(`http://localhost:9000/api/post`,data)
      .then(res => {
        this.getDataPost();
      })
    };
    deleteDataPost = (data)=> {
      axios.delete(`http://localhost:9000/api/post/`+data)
      .then(res => {
        if(res.data && res.data.id)
        this.getDataPost();
      })
    };
        
    handleClose = value => {
      if(value.name)
      this.createDataPost(value);
      this.setState({newPost:value, open: false });
    };

    handleClickOpen = () => {
      this.setState({open:true});
    };

    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    };

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });

      this.setState({
        dataFiltered:dataPost.filter(val=>val.name.toLowerCase().search(event.target.value)!=-1)
      });

    };
    render(){
      const { classes } = this.props;

      return (
        <Paper className={classes.root}>
        <TextField
        id="name"
        label="Busqueda por nombre"
        className={classes.textField}
        value={this.state.name}
        onChange={this.handleChange('name')}
        margin="normal"
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.dataFiltered.map(n => {
            return (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.name}
              </TableCell>
              <TableCell >{n.description}</TableCell>
            <TableCell >
          <Tooltip title="Eliminar">
            <IconButton className={classes.button} onClick={this.deleteDataPost.bind(this,n.id)} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
            </TableCell>
          </TableRow>
          );
        })}
        </TableBody>
        </Table>
        <Button variant="fab" onClick={this.handleClickOpen} color="primary" aria-label="add" className={classes.fab}>
          <AddIcon />
        </Button>
          <DialogCreatePost  onClose={this.handleClose} name={this.state.newPost} open={this.state.open}/>
        </Paper>
        );
      }
    }

    TablePost.propTypes = {
      classes: PropTypes.object.isRequired
    };

    export default withStyles(styles)(TablePost);
