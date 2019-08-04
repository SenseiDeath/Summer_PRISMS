from flask import Flask, jsonify, request, abort
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS 
import uuid
import bson
import time

app = Flask(__name__)

#app.config['MONGO_DBNAME'] = 'meantask'
#app.config['MONGO_URI'] = 'mongodb://localhost:27017/meantask'

app.config['MONGO_DBNAME'] = 'myFlaskdb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/myFlaskdb'

mongo = PyMongo(app)
CORS(app)

@app.route('/api/tasks', methods=['GET'])
def get_all_tasks():
    tasks = mongo.db.sensors
    result = []
    for field in tasks.find():
        result.append({'_id': str(field['_id']), 'metadata':field['metadata'], 'sensors':field['sensors']})
    return jsonify(result)

@app.route('/api/task', methods=['POST'])
def add_task():
    tasks = mongo.db.sensors
    deployment_data = request.get_json()
    print(deployment_data) 
    # Check for invalid data
    if len(deployment_data) == 0:
        abort(400, 'Deployment data must contain at least one key value pair')
        #return jsonify(status="ERROR", message="Deployment data must contain at least one key value pair")    
     # Filter out empty keys
    deployment_data = {key: value for key, value in deployment_data.items() if key != ''}
    deployment_data = {key: value for key, value in deployment_data.items() if key != None}
    print(deployment_data)

    tasks.insert_one({"metadata": deployment_data, "sensors": {}})

    return jsonify(status='OK',message='inserted successfully')

@app.route('/api/task/metadata/<id>', methods=['POST'])
def add_metadata(id):
    tasks = mongo.db.sensors
    deployment_metadata = request.get_json()
    get = tasks.find({'_id':ObjectId(id)},{"metadata":1, "_id":0})
    #
    for element in get:
        dict1 = element['metadata']

    dict1.update(deployment_metadata)
    #print(deployment_metadata) 
    print(dict1)
    tasks.update({'_id' :ObjectId(id)}, {'$set': {"metadata":dict1}},  upsert=True)


    return jsonify(status='OK',message='inserted successfully')


    # deployment_name = request.get_json()['dname']
    # sensor_name = request.get_json()['sname']
    # sensor_location = request.get_json()['location']
    # important_measurement = request.get_json()['im']
    # key1 = request.get_json()['key_1']
    # value1 = request.get_json()['value_1']
    # key2 = request.get_json()['key_2']
    # value2 = request.get_json()['value_2']
    # key3 = request.get_json()['key_3']
    # value3 = request.get_json()['value_3']
    # print(sensor_location)
    # sensor_id = uuid.uuid4()
    # print(key1)
    # print(value1)
    # print(key2)
    # print(value2)
    # if key1 == "":
    #     tasks.insert_one({'name':deployment_name, 'sensors':[{str(sensor_id):{'important_measurement': important_measurement, 'name':sensor_name, 'location':sensor_location}}], 'metadata':{'name':'test2', 'active':"true", 'testing':"true"}})

    # #task_id = tasks.insert({'title': title})
    # #new_task = tasks.find_one({'_id': task_id})
    # else:
    #       tasks.insert_one({'name':deployment_name,'sensors':[{str(sensor_id):{'important_measurement': important_measurement, 'name':sensor_name, 'location':sensor_location}}], 'metadata':{str(key1):value1, 'active':"true", 'testing':"true"}})

    # #result = {'title': new_task['title']}
    # #return jsonify({'result': result})
    # return jsonify(status='OK',message='inserted successfully')

@app.route('/api/task/metadata/<did>/<sid>', methods=['POST'])
def add_metadata_sensor(did, sid):
    tasks = mongo.db.sensors
    deployment_metadata = request.get_json()
    get = tasks.find({'_id':ObjectId(did)},{"sensors":1, "_id":0})
    #
    for element in get:
        dict1 = element['sensors'][str(sid)]

    dict1.update(deployment_metadata)
    #print(deployment_metadata) 
    print(dict1)
    tasks.update({'_id' :ObjectId(did)}, {'$set': {"sensors."+str(sid):dict1}},  upsert=True)


    return jsonify(status='OK',message='inserted successfully')

@app.route('/api/task/<id>', methods = ['POST'])
def add_sensor(id):
    print(id)
    tasks = mongo.db.sensors

    sensor_data = request.get_json()

    # Filter out empty keys
    #sensor_data = {key: value for key, value in sensor_data.items() if value != None}    
    print(sensor_data)
    # d={}
    # for x in range(1,4):
    #     #d[sensor_data['key_{0}'].format(x)]=sensor_data['value_{0}'].format(x)
    #     #"key_{0}".format(x) = sensor_data.get('key_{0}'.format(x))
    #     #"value_{0}".format(x) = sensor_data.get('value_{0}'.format(x))
    #     d[sensor_data.get('key_{0}'.format(x))] = sensor_data.get('value_{0}'.format(x))
    #     del sensor_data['key_{0}'.format(x)]
    #     del sensor_data['value_{0}'.format(x)]
        #print(key1)
    #sensor_data.update(d)
    sensor_data = {key: value for key, value in sensor_data.items() if key != None}
    sensor_data = {key: value for key, value in sensor_data.items() if key != ''}
    
    print(sensor_data)
    #key1 = sensor_data['key_1']
    #value1 = sensor_data['value_1']
    #print(key1)
    #print(value1)

    # Error checking
    if 'important_measurement' not in sensor_data:
        abort(400, 'Sensor must contain important_measurement field')
        #return jsonify(status="ERROR", message="Sensor must contain important_measurement field")

    if 'sensor_name' not in sensor_data:
        abort(400, 'Sensor must contain name field')
        #return jsonify(status="ERROR", message="Sensor must contain name field")



    sensor_id = uuid.uuid4()
    tasks.update({'_id' :ObjectId(id)}, {'$set': {'sensors'+'.'+str(sensor_id):sensor_data}},  upsert=True)
    return jsonify(status='OK',message='inserted successfully')



    """ sensor_name = request.get_json()['sname']
    sensor_location = request.get_json()['location']
    important_measurement = request.get_json()['im']
    key1 = request.get_json()['key_1']
    value1 = request.get_json()['value_1']
    key2 = request.get_json()['key_2']
    value2 = request.get_json()['value_2']
    key3 = request.get_json()['key_3']
    value3 = request.get_json()['value_3']
    print(key1)
    print(value1)
    print(key2)
    print(value2)

    sensor_id = uuid.uuid4()
    tasks.update({'_id' :ObjectId(id)},{ '$push': {'sensors':{str(sensor_id):{'important_measurement': important_measurement, 'name':sensor_name, 'location':sensor_location}}}})
    return jsonify(status='OK',message='inserted successfully')
 """

@app.route('/api/task/<uid>/<sid>', methods=['PUT'])
def update_task(uid,sid):
    results = "Hello Update"
    print(results)
    print(uid)
    tasks = mongo.db.sensors
    sensor_data= request.get_json()
    #sensor_location = request.get_json()['location']
    #important_measurement = request.get_json()['im']
    #sensor_id = request.get_json()['sid']
    #print(sensor_name.strip())
    #print(sensor_id)
    print(sid)
    sensor_data = {key: value for key, value in sensor_data.items() if value != ''}
    sensor_data = {key: value for key, value in sensor_data.items() if value != None}

    get = tasks.find({'_id':ObjectId(uid)},{"sensors":1, "_id":0})
    #
    for element in get:
        dict1 = element['sensors'][str(sid)]



    dict1.update(sensor_data)

    tasks.update({'_id' :ObjectId(uid)}, {'$set': {'sensors'+'.'+str(sid):dict1}},  upsert=True)
    #tasks.update({'_id': ObjectId(uid)}, {'$set': {"sensors"+'.'+'$[]'+'.'+sid+'.name': sensor_name}}, upsert=True)
    #tasks.update({'_id': ObjectId(uid)}, {'$set': {"sensors"+'.'+'$[]'+'.'+sid+'.location': sensor_location}}, upsert=True)
    #tasks.update({'_id': ObjectId(uid)}, {'$set': {"sensors"+'.'+'$[]'+'.'+sid+'.important_measurement': important_measurement}}, upsert=True)
    #stasks.find_one_and_update({'_id': ObjectId(id)}, {'$set': {'sensors':[{str(sensor_id):{'important_measurement': important_measurement.strip(), 'name':sensor_name.strip(), 'location':sensor_location.strip()}}]}}, upsert=False)
    #new_task = tasks.find_one({'_id': ObjectId(id)})

    #result = {'title': new_task['name']}
    return jsonify(status='OK',message='updated successfully')
    #return jsonify({'result': result})

@app.route('/api/task/<id>', methods=['DELETE'])
def delete_task(id):
    tasks = mongo.db.sensors 
    print(id)
    result = "Hello"
    if (bson.objectid.ObjectId.is_valid(id)):
        response = tasks.delete_one({'_id': ObjectId(id)})
        if response.deleted_count == 1:
            result = {'message': 'record deleted'}
        else: 
            result = {'message': 'no record found'}
    
    return jsonify({'result': result})

@app.route('/api/task/<sid>/<did>', methods=['DELETE'])
def delete_sensor(sid, did):
    tasks = mongo.db.sensors 
 
    print(sid)
    print(did)

    #tasks.update({'_id': ObjectId(did)}, {'$unset': {"sensors"+'.'+'$[]'+'.'+sid: ""}})
    tasks.update({'_id': ObjectId(did)}, {'$unset': {"sensors"+'.'+sid: ""}})
    #tasks.update({"sensors":{}}, {'$pull': {"sensors": {'$in':[{}]}}}, upsert= False)
    return ""


@app.route('/api/task/<sid>/<did>/<oid>', methods=['PUT'])
def move_sensor(sid, did, oid):

    print("Here")

    tasks = mongo.db.sensors
    sensor_data = request.get_json()
    print(sensor_data)
    print(did)
    print(sid)
    #sensor_name = request.get_json()[sid]['name']
    #sensor_location = request.get_json()[sid]['location']
    #important_measurement = request.get_json()[sid]['important_measurement']

    #print(sensor_name.strip())
    print(oid)

    tasks.update({'_id' :ObjectId(did)}, {'$set': {'sensors'+'.'+str(sid):sensor_data}},  upsert=True)
    #time.sleep(5)
    #tasks.update({'_id' :ObjectId(did)},{ '$push': {'sensors':{str(sid):{'important_measurement': important_measurement, 'name':sensor_name, 'location':sensor_location}}}})
    tasks.update({'_id': ObjectId(oid)}, {'$unset': {"sensors"+'.'+sid: ""}})
    #tasks.update({"sensors":{}}, {'$pull': {"sensors": {'$in':[{}]}}}, upsert= False)
    return ""



if __name__ == '__main__':
    app.run(debug=False)