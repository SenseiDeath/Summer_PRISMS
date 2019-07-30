import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'
import { Task } from './task'

@Injectable()
export class TasksService {
    constructor(private http: HttpClient) { }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>('api/tasks')
    }

    addTask(task: Task): Observable<Task> {
        return this.http.post<Task>('api/task', task)
    }

    addSensor(task: Task, id: number): Observable<Task> {
        const url = `api/task/${id}`
        return this.http.post<Task>(url, task)
    }

    addDeploymentMetadata(task:Task, id:Number): Observable<Task>{
        const url = `api/task/metadata/${id}`
        return this.http.post<Task>(url, task)

    }

    addSensorMetadata(task:Task, did:Number, sid:Number): Observable<Task>{
        const url = `api/task/metadata/${did}/${sid}`
        return this.http.post<Task>(url, task)

    }
    deleteTask(id: number): Observable<{}> {
        const url = `api/task/${id}`
        return this.http.delete(url)
    }
    deleteSensor(sid: number, did: number): Observable<{}> {
        const url = `api/task/${sid}/${did}`
        return this.http.delete(url)
    }

    updateSensor(task: Task, uid:number, sid:number): Observable<Task> {
        const url = `api/task/${uid}/${sid}`
        return this.http.put<Task>(url, task)
    }

  

    moveTask(task: Task, did:number, sid:number, oid:number): Observable<Task> {
        const url = `api/task/${sid}/${did}/${oid}`
        return this.http.put<Task>(url, task)
    }
}