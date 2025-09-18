

const SessionIdToUserMap = new Map();

const SetUser = ( id, user) => {
    SessionIdToUserMap.set(id,user) 
}

const getUser = (id) => {
    return SessionIdToUserMap.get(id);
}

module.exports = {
    SetUser , 
    getUser
}