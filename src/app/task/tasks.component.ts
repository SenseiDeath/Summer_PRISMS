import { Component, OnInit } from '@angular/core'
import { Task } from './task'
import { TasksService } from './tasks.service'
import { HttpClient } from '@angular/common/http'
import { TouchSequence } from 'selenium-webdriver';
import {NgForm} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common'


import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ValueTransformer } from '@angular/compiler/src/util';

export interface Metadata {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    providers: [TasksService]
})

export class TasksComponent implements OnInit {
    tasks: Task[]
    //keys = [{value: 'active'}, {value: 'testing'}];
    //values = [{value: 'true'}, {value: 'true'}];
    keys = []
    values = []
    editTask: Task
    display = 'none'
    display1 = 'none'
    display2 = 'none'
    display3 = 'none'
    display5 = 'none'
    display6 = 'none'
    display7 = 'none'
    display8 = 'none'
    showModal = false
    changes: any
    update_id: any
    sensor_data: any
    deletetask: any
    did : any
    sid : any
    savetask: any
    info: any
    deployment_id: any
    original_id: any
    sensor_id:any
    show: boolean = false;
    //update_keys = new Array();
    //update_values = new Array();
    update_keys = []
    update_values = []
   
    myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  isCollapsed = true
  jsonData: any;
  expandedIndex = -1  
  ParentList = []; 

  activeIds: string[] =[];
  panels = [0,1,2,3]

  fieldArray: Array<any> = [];
  fieldArray_1: Array<any> = [];
  newAttribute: any = {};
  d : any = {}

  firstField = true;
  firstFieldName = 'First Item name';
  isEditItems: boolean;

  options: Metadata[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];


    constructor(private taskService: TasksService, private http: HttpClient) { var vm = this; vm.info = {}}

    ngOnInit () {
        //this.getTasks()
        //this.createFormControls();
        //this.createForm();
        //console.log(this.getTasks())

        this.getTasks()
    }
    onCloseHandled(){
        this.display='none';

    }

    openAll()
    {
      this.activeIds = this.panels.map(p => "panel-"+ p);
      console.log(this.activeIds);
    }
    Collaps(index: number) {  
        var ChildList
        this.expandedIndex = index === this.expandedIndex ? -1 : index;  
        //some values  
        ChildList = [];  
        }     
    
     openModal(){
         this.display = "block";
     }

     addMetadata(id: any){
         this.deployment_id= id
         this.display7 = "block"

     }

     addMetadataSens(sid:any, id: any){
         this.deployment_id = id
         this.sensor_id = sid
         this.display8 = "block"
     }

     onAddMetadataCloseHandled(){
         this.display7 = 'none';
     }
     onAddMetadataSensCloseHandled(){
         this.display8 = 'none';
     }
     onDeleteCloseHandled(){
        this.display1='none';
    }
     openDeleteModal(sid:any, id:string){
         this.deletetask = sid
         this.did = id
         this.display1 = "block";
         //console.log(this.deletetask)
     }

    openDeleteDModal(){
        this.display2 = "block";
        //console.log(this.deletetask)
    }

    onDeleteDCloseHandled(){
        this.display2 = 'none'
    }
    openSaveModal(task:string){
        this.savetask = task
        this.display3 = "block";
        console.log(this.savetask)
    }
    onSaveCloseHandled(){
        this.display3 = 'none'
         
    }

    opeMoveModal(sid:any, sensor_data: any, oid: any){
        this.sensor_data = sensor_data
        this.original_id = oid
        this.sensor_id = sid

        console.log(this.sensor_id)
        this.display5 = "block"
    }

    onMoveCloseHandled(){
        this.display5 = 'none'
    }

    openUpdateModal(sid: any, sensors: any, id:any){
        this.update_id = id
        this.sensor_id = sid
        this.sensor_data = sensors

        this.update_keys = []
        this.update_values = []
       // this.update_keys = new Array();
        //this.update_jsondata = {};  
        //console.log(order)
        for (let key of Object.keys(this.sensor_data)){
    
                  //console.log(key)
                  this.update_keys.push(key)
                  this.update_values.push(this.sensor_data[key])

        }
        console.log(this.sensor_data)
        this.display6 = "block"
    }

    onUpdateCloseHandled(){
        this.display6 = 'none'
    }

    select() {
        console.log("selected");
    }
    
    apply(selectValue:any){
        console.log(selectValue)
        var sv = selectValue.split(":")
        selectValue = sv[1].trim()
        console.log(selectValue)
        console.log(this.sensor_data)
        console.log(this.sensor_id)

        //var keyArray = Object.keys(this.sensor_value);
        //console.log(keyArray)
        //this.sensor_id = keyArray[0]


        this.taskService.moveTask(this.sensor_data, selectValue, this.sensor_id, this.original_id ).subscribe(() => {
            this.getTasks()
           })
    }

     open() {
        this.showModal = true;
      }
      
      ok() {
        this.showModal = false;
      }
      
      cancel() {
        this.showModal = false;
      };
    getTasks (): void {
        this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks))
    }
    addMachine(){
        console.log("You are here!!")
        console.log(this.info.name)
    
    }

    add (title: string): void {
        this.editTask = undefined
        title = title.trim()
        if (!title) {
            return
        }
        const newTask: Task = { title } as Task
        this.taskService.addTask(newTask).subscribe(() => this.getTasks())
    }

    delete (id: any): void {

        var sv = id.split(":")
        this.deployment_id = sv[1].trim()
        console.log(this.deployment_id)
        //this.tasks = this.tasks.filter(h => h !== task)
        this.taskService
          .deleteTask(this.deployment_id)
            .subscribe(() => this.getTasks())
        
        this.deployment_id = ''
        id = ''

    }

    edit (task) {
        this.editTask = task
    }

    update (id: any) {
        console.log("Here")
        console.log(this.changes)
        
       // var arr= this.changes.split(":");
       // console.log(arr)
     
        //console.log(obj)
    }

    onSubmit(f: NgForm) {
    
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false
        
        for (let key in this.keys){
            //console.log(key)
            //console.log(this.keys[key])
            this.d[this.keys[key].value] = this.values[key].value
            delete this.keys[key]
            delete this.values[key]

        }
        this.d["Deployment_name"] = f.value.Deployment_name
        console.log(this.d)
        
        this.taskService.addTask(this.d).subscribe(() => this.getTasks())
        f.reset()
        this.ngOnInit()
      }

      
    onSubmitfunc(f: NgForm) {
        console.log(f.value);  // { first: '', last: '' }
        for (let key in this.keys){
            //console.log(key)
            //console.log(this.keys[key])
            this.d[this.keys[key].value] = this.values[key].value
            delete this.keys[key]
            delete this.values[key]

        }
        this.d["sensor_name"] = f.value.sensor_name
        this.d["location"] = f.value.location
        this.d["important_measurement"] = f.value.important_measurement
        console.log(this.d)
        this.taskService.addSensor(this.d, this.savetask).subscribe(() => this.getTasks())
        f.reset()
        location.reload()
        
      }

    onAddMetadatafunc(f:NgForm){
        for (let key in this.keys){
            //console.log(key)
            //console.log(this.keys[key])
            this.d[this.keys[key].value] = this.values[key].value
            delete this.keys[key]
            delete this.values[key]

        }
        console.log(this.d)
        this.taskService.addDeploymentMetadata(this.d, this.deployment_id).subscribe(() => this.getTasks())
        f.reset()
        location.reload()

    }

    onAddMetadataSensFunc(f:NgForm){
        for (let key in this.keys){
            //console.log(key)
            //console.log(this.keys[key])
            this.d[this.keys[key].value] = this.values[key].value
            delete this.keys[key]
            delete this.values[key]

        }
        console.log(this.sensor_id)
        
        this.taskService.addSensorMetadata(this.d, this.deployment_id, this.sensor_id).subscribe(() => this.getTasks())
        f.reset()
        location.reload()
    }

    onUpdatefunc(f: NgForm) {
        console.log("here")
        //console.log(f.value);  // { first: '', last: '' }
        //console.log(this.sensor_id)
        //console.log(this.update_id)
        //console.log(Object.keys(this.sensor_data)[0])
        //this.sid = Object.keys(this.sensor_data)[0]
        this.taskService.updateSensor(f.value, this.update_id, this.sensor_id).subscribe(() => this.getTasks())
        f.reset()
    }

    delete_sensor(){
        //console.log(value); 
        console.log(this.deletetask)
        console.log(this.did)
        //console.log(Object.keys(this.deletetask)[0])
        //this.sid = Object.keys(this.deletetask)[0]
        this.taskService
            .deleteSensor(this.deletetask, this.did)
            .subscribe(() => this.getTasks())
    }

    onRowClick(event:any, id:any){
        console.log(event.target.outerText, id);
        //console.log(event.target.innerText);
        this.changes = event.target.outerText
        this.update_id = id
        var obj = {}
       var  a = this.changes.trim()
       var arr2 = a.replace("location",'')
           arr2 = arr2.replace("important_measurement",'')
           arr2 = arr2.replace("name",'')
       var arr1 = arr2.replace(/(\r\n|\n|\r|")/gm, "");
       //var arr1 = arr2.filter(function(e){ return e.replace(/(\r\n|\n|\r)/gm,"")});
       
        //var arr1 = a.match(/\b([0-9][a-z])\b/);
        //console.log(this.changes)

        var arr= arr1.split(":")
        var filtered = arr.filter(function(el) { return el; });
        //var arr1 = arr.filter(function(e){ return e.replace(/(\r\n|\n|\r)/gm,"")});
        //arr=arr.trim()
        console.log(arr1)
        console.log(filtered)

        obj["sid"]= filtered[0]
        obj["name"]= filtered[3]
        obj["location"]= filtered[2]
        obj["important_measurement"]= filtered[1]

        //console.log(obj)
        this.changes = obj


      }
      getKeys(obj){
          //console.log(obj)
          //console.log(Object.keys(obj))
          var result
          var order = new Array();
          var jsondata = {};  
          //console.log(order)
          for (let key of Object.keys(obj)){
              if (key == "sensor_name" || key == "location" || key == "important_measurement" || key == "Deployment_name")
              {
                 continue
          }
                else{
                    //console.log(key)
                    order.push(key)
                    jsondata[key] = obj[key]
  
                }
          }
        //return `<div data-val-id="${order}"> ${order} - ${obj[order[0]]} </div>`;

        //return IDs;
        // console.log(jsondata)
        return order
        
        //return order.join(obj[order[0]]);

      }
      getValue(obj){
          //console.log(obj)
          return obj
      }

      add_1() {
        this.keys.push({value: ''});
        this.values.push({value: ''})
        console.log(this.keys)
        console.log(this.values)
      }

      addFieldValue(index) {
        if (this.fieldArray.length <= 5) {
          this.fieldArray.push(this.newAttribute);
          this.newAttribute = {};
        } else {
          
        }
        console.log(this.fieldArray)
      }
    
    
      onEditCloseItems() {
        this.isEditItems = !this.isEditItems;
      }

      onEdit(event: any, id: any, value:string) {
        console.log('ContentEditableDirective.onEdit');
        console.log(event.target.innerText)
        console.log(id)
        console.log(value)
        //var value = innerText
        //this.update.emit(value)
    }

    deleteFieldValue(index) {
        console.log("Here")
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
      }
}