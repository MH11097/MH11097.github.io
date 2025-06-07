---
title: "Understanding React Hooks: useState and useEffect"
date: "2024-06-07"
---

# Understanding React Hooks: useState and useEffect

React Hooks đã thay đổi cách chúng ta viết React components. Hôm nay mình sẽ chia sẻ về hai hooks cơ bản nhất: `useState` và `useEffect`.

## useState Hook

Hook `useState` cho phép chúng ta thêm state vào functional components.

### Cú pháp cơ bản

```javascript
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### Những điều cần lưu ý

1. **Initial state chỉ được sử dụng trong lần render đầu tiên**
2. **State update có thể là asynchronous**
3. **Nên sử dụng functional update khi state mới phụ thuộc vào state cũ**

```javascript
// ❌ Không tốt
setCount(count + 1);

// ✅ Tốt hơn
setCount((prevCount) => prevCount + 1);
```

## useEffect Hook

Hook `useEffect` cho phép chúng ta thực hiện side effects trong functional components.

### Cú pháp cơ bản

```javascript
import React, { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // Dependency array

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Dependency Array

Dependency array là phần quan trọng nhất của `useEffect`:

```javascript
// Chạy sau mỗi render
useEffect(() => {
  console.log("After every render");
});

// Chỉ chạy một lần (như componentDidMount)
useEffect(() => {
  console.log("Only once");
}, []);

// Chạy khi count thay đổi
useEffect(() => {
  console.log("Count changed:", count);
}, [count]);
```

### Cleanup Function

Để tránh memory leaks, chúng ta có thể return một cleanup function:

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Timer tick");
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(timer);
  };
}, []);
```

## Ví dụ thực tế: Todo App

Đây là một ví dụ kết hợp cả `useState` và `useEffect`:

```javascript
import React, { useState, useEffect } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Load todos từ localStorage khi component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos vào localStorage khi todos thay đổi
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
```

## Best Practices

### 1. Tách logic phức tạp thành custom hooks

```javascript
// Custom hook
function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return { todos, addTodo, toggleTodo };
}
```

### 2. Sử dụng useCallback cho optimization

```javascript
import { useCallback } from "react";

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 3. Tránh infinite loops trong useEffect

```javascript
// ❌ Sai - sẽ gây infinite loop
useEffect(() => {
  setCount(count + 1);
}, [count]);

// ✅ Đúng
useEffect(() => {
  const timer = setInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

## Kết luận

React Hooks đã giúp code trở nên sạch hơn và dễ hiểu hơn. Hai hooks cơ bản `useState` và `useEffect` đã đủ để xử lý hầu hết các use cases trong React apps.

Một số điểm quan trọng cần nhớ:

- **useState**: Quản lý state trong functional components
- **useEffect**: Xử lý side effects và lifecycle
- **Dependency array**: Kiểm soát khi nào effect được chạy
- **Cleanup**: Luôn nhớ cleanup để tránh memory leaks
- **Custom hooks**: Tái sử dụng logic giữa các components

Happy coding! 🚀

---

**Tags**: React, JavaScript, Frontend, Hooks, Tutorial
