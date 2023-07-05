import { useState } from "react";

export function TodoItem({id, title, status, toggleTodoStatus, deleteTodo, updateTitle}){
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);

  const handleStatusChange = (e) => {
    toggleTodoStatus(id, e.target.value);
  };

  const handleEdit = () => {
    setEditMode(true);
  }

  const handleSave = () => {
    updateTitle(id, updatedTitle);
    setEditMode(false);
  }

  const handleCancel = () => {
    setEditMode(false);
  }

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  }

  return (
    <tr>
      <td>
        {editMode ? (
          <input type="text" value={updatedTitle} onChange={handleTitleChange}/>
        ) : (title)}
      </td>
      <td>{status}</td>
      <td className="dropdown">
        <select value={status} onChange={handleStatusChange}>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </td>
      <td>
        {editMode ? (
          <>
            <button onClick={handleSave} className="btn btn-save">Save</button>
            <button onClick={handleCancel} className="btn btn-cancel">Cancel</button>
          </>
        ): (
          <>
            <button onClick={handleEdit} className="btn btn-edit"><img src="src/edit.png" alt="" /></button>
            <button onClick={() => deleteTodo(id)} className="btn btn-delete"><img src="src/delete.png" alt="" /></button>
          </>
        )}
      </td>   
    </tr>
  );
}
