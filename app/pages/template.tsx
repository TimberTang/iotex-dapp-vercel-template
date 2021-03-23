import { BlitzPage } from "blitz"
import { observer, useLocalObservable } from "mobx-react-lite"
import Layout from "app/layouts/Layout"
import { useStore } from "app/stores"
import React, { useState } from 'react'
import { css } from "../utils/stitches.config"
import { globalStyles } from '../utils/styles'
import TodoItem, { Todo } from "../components/TodoItem"
import { Form, Input, Button } from "antd"

const Template: BlitzPage = observer(() => {
  const { todoStore, lang } = useStore()
  const [inputValue, setInputValue] = useState('')

  const [form] = Form.useForm()

  const store = useLocalObservable(() => ({
    toggle(item: Todo) {
      const index = todoStore.todos.indexOf(item)
      if (index > -1) {
        todoStore.toggleTodo(index)
      }
    },
    delete(item: Todo) {
      const index = todoStore.todos.indexOf(item)
      if (index > -1) {
        todoStore.deleteTodo(index)
      }
    },
    async addTodo() {
      const values = await form.validateFields()
      todoStore.addTodo(values["todo"])
      form.resetFields()
    }
  }))

  return (
    <div>
      <div className={`${globalStyles.container} ${styles.form}`}>
        <ul >
          {todoStore.todos.map((item, index) => {
            return (
              <TodoItem
                key={item.id}
                todo={item}
                onToggle={store.toggle}
                onDelete={store.delete}
              />
            )
          })}
        </ul>
        <Form form={form} layout="inline">
          <Form.Item
            rules={[{ required: true, message: 'Please input your todo!' }]}
            name="todo"
          >
            <Input
              className="input"
              value={inputValue}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={store.addTodo}>{lang.t('add-new')}</Button>
          </Form.Item>
        </Form>
        <div>{`${lang.t('completed')}: ${todoStore.todos.length - todoStore.remainingTodos}`}</div>
      </div>
    </div>
  )
})

Template.getLayout = (page) => <Layout title={"Teamplate"}>{page}</Layout>


const styles = {
  form: css({
    '.todo-item': {
      color: '#333333'
    }
  })
}

export default Template

