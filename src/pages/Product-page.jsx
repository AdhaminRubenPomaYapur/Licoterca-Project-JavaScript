import { Box } from "@mui/material";
import { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import Sidenav from "../components/Sidenav";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';

const urlProducts    = "http://localhost:3000/api/products";
const urlInventories = "http://localhost:3000/api/inventories";

class ProductPage extends Component {

    state = {
        dataProduct     : [],
        dataInventories : [],

        modalInsertar   : false,
        modalEliminar   : false,

        inventoryForm: {
            id       : '',
            type     : '',
            stock    : 0,
            products : [],
        },
        productForm: {
            id           : '',
            name         : '',
            description  : '',
            stock        : 0,
            price        : 0,
            productids   : [],
            state        : false,
            created      : '',
        },

        typeModal : '',
    }
    
    peticionGet = () => {
        axios.get(urlProducts).then(response => {
            this.setState({dataProduct: response.data.products})
        }).catch(error => console.log(error.message));
    }

    peticionGetInventories = () => {
        axios.get(urlInventories).then(response => {
            this.setState({dataInventories: response.data.inventories})
        }).catch(error => console.log(error.message));
    }

    peticionPost = async () => {
        await axios.post(urlProducts, {product: this.state.productForm}).then(async response => {
            await this.peticionPostInventoryAddProduct(response.data.product.id);
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => console.log(error.message));
    }

    peticionPostInventoryAddProduct = async (id) => {
        await axios.post(urlInventories+`/${this.state.inventoryForm.id}`, {product_id: id}).then(response => {
        }).catch(error => console.log(error.message));
    }

    peticionPut = () => {
        axios.put(urlProducts+`/${this.state.productForm.id}`, {product: this.state.productForm}).then( response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => console.log(error.message));
    }

    peticionDelete = () => {
        axios.delete(urlProducts+`/${this.state.productForm.id}`).then( response => {
            this.setState({modalEliminar: false});
            this.peticionGet();
        })
    }

    modalInsertar = () => {
        this.setState({modalInsertar: !this.state.modalInsertar})
    }
    
    selectProduct = (product) => {
        this.setState({
            typeModal   : 'update',
            productForm : {
                id           : product.id,
                name         : product.name,
                description  : product.description,
                stockmin     : product.stockmin,
                stockmax     : product.stockmax,
                stock        : product.stock,
                price        : product.price,
                productids   : product.productids,
                state        : product.state,
                created      : product.created,
            }
        })
    }


    handleChange = async (evt) => {
        evt.persist();
        await this.setState({
            productForm: {
            ...this.state.productForm,
            [evt.target.name]: evt.target.value
            }
        })
        console.log(this.state.productForm)
    }

    handleChangeInventory = async (evt) => {
        evt.persist();
        await this.setState({
            inventoryForm: {
            ...this.state.inventoryForm,
            [evt.target.name]: evt.target.value
            }
        })
        console.log(this.state.inventoryForm)
    }

    componentDidMount() {
        this.peticionGet();
        this.peticionGetInventories();
    }

    render() {

        const {productForm: form} = this.state;

        return(
            <>
                <Box sx={{display: 'flex'}}>
                    <Sidenav/>
                    <Box component="main" sx={{flexFlow: 1, p: 3}}>
                        <div className='App'>
                            <br/>
                            <button className='btn btn-success' onClick={ () => {this.setState({form: {}, typeModal: 'insert'}), this.modalInsertar()}}>Add Product</button>
                            {" "}
                            {/* <button className='btn btn-success' onClick={ () => {this.setState({form: {}, typeModal: 'insert'}), this.modalInsertar()}}>Add Product</button> */}
                            <br/> <br/>

                            <table className='table'>
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.dataProduct.map((product) => {
                                    return (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.price}</td>
                                        <td>
                                        <button className='btn btn-primary' onClick={() => {this.selectProduct(product); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                        {" "}
                                        <button className='btn btn-danger'  onClick={() => {this.selectProduct(product); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                        </td>
                                    </tr>
                                    )
                                })
                                }
                            </tbody>
                            </table>
                        
                            

                            <Modal isOpen={this.state.modalInsertar}>
                                <ModalHeader>
                                    Add Product
                                </ModalHeader>

                                <ModalBody>

                                    <FormGroup>
                                    <Label>Name:</Label>
                                    <Input className='form-control' type='text' name='name' onChange={this.handleChange} value={form?form.name : form.name}/>
                                    </FormGroup>

                                    <FormGroup>
                                    <Label>description:</Label>
                                    <Input className='form-control' type='text' name='description'  onChange={this.handleChange} value={form?form.description : form.description}/>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                    <Label>Select inventory:</Label>
                                    <Input 
                                        className='form-control'
                                        type='select' 
                                        name='id'
                                        onChange={this.handleChangeInventory}
                                    >
                                        { 
                                            this.state.dataInventories.map(inventory => {
                                                return (
                                                    <option key={inventory.id} value={inventory.id}>{inventory.type}</option>
                                                )
                                            })
                                        }
                                    </Input>
                                    </FormGroup>

                                </ModalBody>

                                <ModalFooter>
                                    {
                                    this.state.typeModal === 'insert' ?
                                    <button className='btn btn-success' onClick={() => {this.peticionPost()}}>Insert</button>
                                    :
                                    <button className='btn btn-primary' onClick={() => this.peticionPut() }>Update</button>
                                    }
                                    <Button color='secundary' onClick={this.modalInsertar}>Cancel</Button>
                                </ModalFooter>

                                </Modal>

                                <Modal isOpen={this.state.modalEliminar}>
                                <ModalBody>
                                    Estas seguro que deseas eliminar a esta persona {form && form.name}
                                </ModalBody>
                                <ModalFooter>
                                    <button className='btn btn-danger'    onClick={() => this.peticionDelete()}>Yes</button>
                                    <button className='btn btn-secundary' onClick={() => this.setState({modalEliminar: false})}>No</button>
                                </ModalFooter>
                            </Modal>

                        </div>
                    </Box>
                </Box>
            </>
        )
    }
}

export default ProductPage

