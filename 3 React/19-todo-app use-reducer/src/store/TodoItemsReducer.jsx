import initialTodoItems from "./InitialTodoItems";

const TodoItemsReducer = (initialTodoItems, action) => {
    switch(action.type){
        case 'Add-Item':
            const todoText = action.payload.todoText;
            const todoDate = action.payload.todoDate;
            const item = {id: Date.now().toString(), todoText, todoDate};
            return [...initialTodoItems, item];
        case 'Delete-Item':
            return initialTodoItems.filter((item) => (item.id!=action.payload.todoId));
        default:
            return initialTodoItems;
    }
}

export default TodoItemsReducer;