async function get_treas(req, res){
    const db = req.app.get('db');
    const treas = await db.get_dragon_treasure(1);
    return res.status(200).json(treas)
}

module.exports={
    get_treas
}