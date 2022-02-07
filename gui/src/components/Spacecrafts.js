import "./Spacecrafts.css";

import { useNavigate } from "react-router";

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


//imports for using prime react
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { FilterMatchMode } from 'primereact/api'

//import actions
import { getSpacecrafts, addSpacecrafts, saveSpacecrafts, deleteSpacecrafts, importSpacecrafts, exportSpacecrafts } from '../actions/spacecraft-actions'

//selectors
const entitySelector = state => state.spacecraft.spacecrafts
const countSelector = state => state.spacecraft.count
const exportSelector = state => state.exported.databse

function Spacecrafts () {

    //navigare
    const navigate = useNavigate();

  const [isDialogShown, setIsDialogShown] = useState(false)
  const [isNewRecord, setIsNewRecord] = useState(true)
  const [selectedEntity, setSelectedEntity] = useState(null)

  const [name, setName] = useState('')
  const [speed, setSpeed] = useState(0)
  const [weight, setWeight] = useState(0)

  //paging, filtering, sorting
  const [filterString, setFilterString] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState(1)

  const [filters, setFilters] = useState({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    speed: { value: null, matchMode: FilterMatchMode.EQUALS }
  })
  const [page, setPage] = useState(0)
  const [first, setFirst] = useState(0)

//FILTERS
  const handleFilter = (evt) => {
    const oldFilters = filters
    oldFilters[evt.field] = evt.constraints.constraints[0]
    setFilters({ ...oldFilters })
  }

  const handleFilterClear = (evt) => {
    setFilters({
      name: { value: null, matchMode: FilterMatchMode.CONTAINS },
      speed: { value: null, matchMode: FilterMatchMode.EQUALS }
    })
  }

  useEffect(() => {
    const keys = Object.keys(filters)
    const computedFilterString = keys.map(e => {
      return {
        key: e,
        value: filters[e].value
      }
    }).filter(e => e.value).map(e => `${e.key}=${e.value}`).join('&')
    setFilterString(computedFilterString)
  }, [filters])

//PAGE
  const handlePageChange = (evt) => {
    setPage(evt.page)
    setFirst(evt.page * 2)
  }

//SORTING  
  const handleSort = (evt) => {
    console.warn(evt)
    setSortField(evt.sortField)
    setSortOrder(evt.sortOrder)
  }

//ELEMS 
  const entities = useSelector(entitySelector)
  const count = useSelector(countSelector)
  const exported = useSelector(exportSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSpacecrafts(filterString, page, 4, sortField, sortOrder))
    dispatch(exportSpacecrafts())
  }, [filterString, page, sortField, sortOrder])

//add
  const handleAddClick = (evt) => {
    setIsDialogShown(true)
    setIsNewRecord(true)
    setName('')
    setSpeed(0)
    setWeight(0)
  }

  const hideDialog = () => {
    setIsDialogShown(false)
  }
  
//save
  const handleSaveClick = () => {
    if (isNewRecord) {
      dispatch(addSpacecrafts({ name,speed,weight }))
    } else {
      dispatch(saveSpacecrafts(selectedEntity, { name,speed,weight }))
    }
    setIsDialogShown(false)
    setSelectedEntity(null)
    setName('')
    setSpeed(0)
    setWeight(0)
  }

//edit
  const editEntity = (rowData) => {
    setSelectedEntity(rowData.id)

    setName(rowData.name)
    setSpeed(rowData.speed)
    setWeight(rowData.weight)

    setIsDialogShown(true)
    setIsNewRecord(false)
  }

//delete
  const handleDeleteEntity = (rowData) => {
    dispatch(deleteSpacecrafts(rowData.id))
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
        <span> </span>
        <Button label='Delete' icon='pi pi-times' className='p-button p-button-danger' onClick={() => handleDeleteEntity(rowData)} />
        <span> </span>
        <Button label='Astronauts' icon='pi pi-heart-fill' className='p-button-secondary p-button-raised p-button-rounded' onClick={() => navigate(`/spacecrafts/${rowData.id}`)} />
      </>
    )
  }

  //read json -> import
  const  handleUpload = (event) =>{
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    console.log(event.target.result);
    var obj = JSON.parse(event.target.result);
    console.log(obj);
    dispatch(importSpacecrafts(obj));
}


  return (
    <div className='container'>
    <div className='spacecrafts'>
        <h1 className="title">Astronauts List</h1>
      <DataTable
      className="table"
        value={entities}
        footer={tableFooter}
        lazy
        paginator
        onPage={handlePageChange}
        first={first}
        rows={4}
        totalRecords={count}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      >
        <Column header='Name' field='name' filter filterField='name' filterPlaceholder='filter by name' onFilterApplyClick={handleFilter} onFilterClear={handleFilterClear} sortable />
        <Column header='Speed' field='speed' filter filterField='speed' dataType="numeric"  filterPlaceholder='filter by speed' onFilterApplyClick={handleFilter} onFilterClear={handleFilterClear} sortable />
        <Column header='Weight' field='weight'/>
        <Column body={opsColumn} />
      </DataTable>

      <Dialog header='Astronaut details' visible={isDialogShown} onHide={hideDialog} footer={dialogFooter}>
        <div className="divDialog">
          <InputText placeholder='name' onChange={(evt) => setName(evt.target.value)} value={name} />
          <small className="p-error block info">Three letters minimum.</small>
        </div>
        <div className="divDialog">
          <InputText placeholder='speed' onChange={(evt) => setSpeed(evt.target.value)} value={speed} />
          <small className="p-error block info">1000 minimum.</small>
        </div>
        <div className="divDialog">
          <InputText placeholder='weight' onChange={(evt) => setWeight(evt.target.value)} value={weight} />
          <small className="p-error block info">200 minimum.</small>
        </div>
      </Dialog>
    </div>
    <div className="imports">
      <div className="button">  
      <a download='spacecrafts.json' href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(exported)
            )}`}
        >
        <Button
             label='Export' icon='pi pi-download' className='p-button-secondary p-button-raised p-button-rounded' onClick={(evt) =>evt.preventDefault}
        />
        </a>  
        </div> 
        <div className="button">
        <input type="file" accept=".json" onChange={handleUpload}></input> 
        </div>
    </div>
    </div>
  )
}

export default Spacecrafts