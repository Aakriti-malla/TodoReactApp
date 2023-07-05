import { useEffect, useState } from "react"
import "./style.css"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import { Pagination } from "./Pagination"

export default function App(){
  
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue==null) return []
    return JSON.parse(localValue)
  })

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sortList, setSortList] = useState(false);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title){
    setTodos((currentTodos) => {
      const newTodo = {
        id: crypto.randomUUID(),
        title,
        status: "Todo"
      };

      const updatedTodos = [...currentTodos, newTodo];

      if (updatedTodos.length > currentPage * itemsPerPage) {
        setCurrentPage(currentPage + 1);
      }

      return updatedTodos;

    });
  }

  function toggleTodoStatus(id, status) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id == id){
          return {...todo, status };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      const updatedTodos = currentTodos.filter((todo) => todo.id !== id);

      if((currentPage -1) * itemsPerPage >= updatedTodos.length){
        setCurrentPage(currentPage - 1);
      }
      return updatedTodos;
    });
  }

  function updateTitle(id, newTitle){
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return {...todo, title: newTitle};
        }
        return todo;
      });
    });
  }

  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstItem, indexOfLastItem);

  return (
  <>
    <NewTodoForm onSubmit={addTodo}/>
    <h1 className="header">TODO List</h1>
    <TodoList 
      todos={currentTodos}
      toggleTodoStatus={toggleTodoStatus}
      deleteTodo={deleteTodo}
      updateTitle={updateTitle}
    />
    <Pagination 
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      totalItems={todos.length}
      setCurrentPage={setCurrentPage}
    />
  </>
  );
}
