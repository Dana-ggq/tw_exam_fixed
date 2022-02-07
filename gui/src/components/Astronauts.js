import {useParams} from 'react-router';
import "./Astronauts.css";

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


//imports for using prime react
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown';

//import actions
import { getAstronauts, addAstronauts, saveAstronauts, deleteAstronauts } from '../actions/astronaut-actions'

//selectors
const entitySelector = state => state.astronaut.astronauts

const Astronauts = () => {

    //playlist id
    const {id} = useParams();


  //states 
  const [isDialogShown, setIsDialogShown] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [isNewRecord, setIsNewRecord] = useState(true)
  const [selectedEntity, setSelectedEntity] = useState(null)

  const entities = useSelector(entitySelector)

  const dispatch = useDispatch()

  //eff
  useEffect(() => {
    dispatch(getAstronauts(id))
  }, [])

  //add
  const handleAddClick = (evt) => {
    setIsDialogShown(true)
    setIsNewRecord(true)
    setName('')
    setRole('')
  }

  const hideDialog = () => {
    setIsDialogShown(false)
  }

  //save
  const handleSaveClick = () => {
    if (isNewRecord) {
      dispatch(addAstronauts({ name, role }, id))
    } else {
      dispatch(saveAstronauts(selectedEntity, { name, role }, id))
    }
    setIsDialogShown(false)
    setSelectedEntity(null)
    setName('')
    setRole('')
  }

  //edit
  const editEntity = (rowData) => {
    setSelectedEntity(rowData.id)

    setName(rowData.name)
    setRole(rowData.role)

    setIsDialogShown(true)
    setIsNewRecord(false)
  }

  //delete
  const handleDeleteEntity = (rowData) => {
    dispatch(deleteAstronauts(rowData.id, id))
  }

  const tableFooter = (
    <div>
      <Button label='Add' icon='pi pi-plus' onClick={handleAddClick} />
    </div>
  )

  const dialogFooter = (
    <div>
      <Button label='Save' icon='pi pi-save' onClick={handleSaveClick} />
    </div>
  )

  const opsColumn = (rowData) => {
    return (
      <>
        <Button label='Edit' icon='pi pi-pencil' onClick={() => editEntity(rowData)} />
        <br></br> <br></br>
        <Button label='Delete' icon='pi pi-times' className='p-button p-button-danger' onClick={() => handleDeleteEntity(rowData)} />
      </>
    )
  }


    const roles = [
        {label: 'commander', value: 'COMMANDER'},
        {label: 'member', value: 'MEMBER'},
        {label: 'technician', value: 'TECHNICIAN'},
        {label: 'fighter', value: 'FIGHTER'}
    ];

    return (
        <div className='astronauts'>
            <h1 className="astronautTitle">Astronauts List</h1>
          <DataTable
            className="tableAstronauts"
            value={entities}
            footer={tableFooter}
            lazy
          >
            <Column header='Name' field='name'/>
            <Column header='Role' field='role'/>
            <Column body={opsColumn} />
          </DataTable>
    
          <Dialog header='Astronaut form' visible={isDialogShown} onHide={hideDialog} footer={dialogFooter}>
            <div className='divDialog'>
              <InputText placeholder='name' onChange={(evt) => setName(evt.target.value)} value={name} />
              <small className="p-error block info">Five letters minimum.</small>
            </div>
            <div className='divDialog'>
                <Dropdown placeholder='role' onChange={(evt) => setRole(evt.target.value)} value={role}  options={roles} />
            </div>
          </Dialog>
        
        </div>
      )
}

export default Astronauts;