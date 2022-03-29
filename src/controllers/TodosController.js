import User from "../models/user";

import todos from "../models/todos";

class MoneyController {
    async index(req, res) {
        try{
            const { user_id } = req.params;
            const { q } = req.query;
            const users = await User.findById(user_id);
            
            if(!users){
                return res.status(404).json();
            }

            let query = {};

            if(q){
                query = { url: { $regex: q } }
            }
            const listOfTodos = await todos.find({
                userId: user_id,
                ...query
                
            });

            return res.json(listOfTodos)
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error. "})
        }
    };

    async create(req, res) {
        try {
            const { user_id } = req.params;
            const { name } = req.body;
            const users = await User.findById(user_id);
            
            if(!users){
                return res.status(404).json();
            }

            const todo = await todos.findOne({
                userId : user_id,
                name
            })

            if(todo){
                return res.status(422).json({ message: `To do ${name} already exists.` });
            }

            const newTodo = await todos.create({
                name,
                userId : user_id
            })

            return res.status(201).json(newTodo);
        } catch(err){
            console.error(err);
            return res.status(500).json({ error: "Internal server error. "})
        }
    };
    async destroy(req, res) {
        try {
            const { user_id, id } = req.params;

            const users = await User.findById(user_id);
            
            if(!users){
                return res.status(404).json();
            }

            const todo = await todos.findOne({
                userId: user_id,
                _id: id
            })

            if(!todo){
                return res.status(404).json();
            }

            await todo.deleteOne();

            return res.status(200).json();

        } catch(err){
            console.error(err);
            return res.status(500).json({ error: "Internal server error. "})
        }
    };
}

export default new MoneyController();