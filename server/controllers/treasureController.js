async function get_treas(req, res){
    const db = req.app.get('db');
    const treas = await db.get_dragon_treasure(1);
    return res.status(200).json(treas)
}
async function getUserTreasure(req, res){
    const db = req.app.get('db');
    // const id = req.session.user;
    const result = await db.get_user_treasure([req.session.user.id]);
    return res.status(200).json(result)
}
async function addUserTreasure(req, res){
    const {treasureURL} = req.body;
    const {id} = req.session.user;
    const db = req.app.get('db');
    const userTreasure = await db.add_user_treasure([treasureURL, id]);
    return res.status(200).json(userTreasure)
}

module.exports={
    get_treas, getUserTreasure, addUserTreasure
}