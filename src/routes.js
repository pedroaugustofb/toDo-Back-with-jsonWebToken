import { Router } from 'express';
import auth from './middlewares/auth';

import sessionsController from './controllers/sessionsController';
import userController from './controllers/userController';
import TodosController from './controllers/TodosController';

const routes = new Router();


// RESTFull

// rotas publicas
routes.post('/sessions', sessionsController.create)

routes.post('/users/', userController.create);

routes.use(auth);
// rotas privadas


//Users
routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.destroy);

//To do's

routes.get('/users/:user_id/todos', TodosController.index)
routes.post('/users/:user_id/todos', TodosController.create)
routes.delete('/users/:user_id/todos/:id', TodosController.destroy);


export default routes;