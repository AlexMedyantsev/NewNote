import React from 'react'

function FolderItem({
  activeFolder,
  folderName,
  count,
  isDeleteMode,
  canBeDeleted,
  folderClickHandler,
  deleteCallback,
}) {
  return (
    <li
      className={activeFolder === folderName ? "sidebar__folder-item sidebar__folder-item--active" : "sidebar__folder-item" }
      onClick={() => folderClickHandler(folderName)}
    >
      {isDeleteMode && canBeDeleted &&
        <div
          className="button button--remove"
          onClick={(e) => deleteCallback(folderName, e)}
        >

        </div>
      }
      <p>{folderName}</p>
      <span>{count}</span>
    </li >
  )
}

export default FolderItem