import { observer } from "mobx-react-lite"
import React from "react"
import { css } from "../utils/stitches.config"
import "antd/dist/antd.css" // or 'antd/dist/antd.less'
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"

export interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoItemCompoentProps {
  todo: Todo
  onToggle?: (todo: Todo) => void
  onDelete?: (todo: Todo) => void
}

const TodoItem = observer((props: TodoItemCompoentProps) => {
  return (
    <div
      onClick={() => {
        props.onToggle?.(props.todo)
      }}
    >
      <div className={`${styleItem.item}`}>
        <li>{props.todo.text}</li>
        <div
          className="status"
        >
          {props.todo.completed ? <CheckOutlined /> : <div className="status"></div>}
        </div>
        <div
          className="status delete-button"
          onClick={() => {
            props.onDelete?.(props.todo)
          }}
        >
          <CloseOutlined />
        </div>
      </div>
    </div>
  )
})

export default TodoItem

const styleItem = {
  item: css({
    display: "flex",
    li: {
      color: "#333",
    },
    ".status": {
      marginLeft: "3rem",
    },
    ".delete-button": {
      display: "none",
    },

    ":hover": {
      ".delete-button": {
        display: "block",
      },
    },
  }),
}
