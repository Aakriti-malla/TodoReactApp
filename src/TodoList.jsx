import { TodoItem } from "./TodoItem"

export function TodoList({todos, toggleTodoStatus, deleteTodo, updateTitle}){
    return (
      <table className="list">
        <thead>
          <tr>
            <th>Todo</th>
            <th>Status</th>
            <th>Update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem 
              key={todo.id}
              {...todo}
              toggleTodoStatus={toggleTodoStatus}
              deleteTodo={deleteTodo}
              updateTitle={updateTitle}
            />
          ))}
        </tbody>
      </table>
    );
}