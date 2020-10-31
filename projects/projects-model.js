const db = require('../data/config');

function addResources(rssInfo){
    return db.insert({"name": rssInfo.name, "description" : rssInfo.description}).into("resources")
};

function getResources(id){
    return db("resources as r")
                .select("p.name", "r.name")
                .where("p.ID", id)
                .join("projectResources as pr", "pr.resourceID", "r.ID")
                .join("projects as p", "p.ID", "pr.projectID")
};

function addProject(info){
   let results = db.insert({"name" : info.name, "description" : info.description, "isCompleted" : info.completed}).into("projects")
    return results;
};

function getProject(){
    return db("projects").select("*")
};

function getProjectById(id){
    return db("projects").select("*").where("ID", id)
}

function addTask(info, id){
    return db("tasks").insert({"description" : info.description, "notes" : info.description, "isCompleted" : info.completed, "projectID" : id})
};

function getTasks(id){
    return db("tasks").select("*").where("projectID", id);
};

module.exports = {
    addResources,
    getResources,
    getProjectById,
    addProject,
    getProject,
    addTask,
    getTasks
}