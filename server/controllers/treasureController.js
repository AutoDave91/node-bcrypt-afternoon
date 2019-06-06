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

module.exports={
    get_treas, getUserTreasure
}