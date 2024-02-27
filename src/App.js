import './App.css';
import Modal from "./components /modal/Modal";
import List from "./components /list/List";
import {useState, useEffect} from "react";
import Input from "./components /input/Input";
import {Button} from "./components /button/Button";

function App() {
    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [tasks, setTasks] = useState([
        { id: 1, title: 'coding', completed: false },
        { id: 2, title: 'eat', completed: false },
        { id: 3, title: 'sleep', completed: false }
    ]);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    const onChangeInput = (event) => {
        setInput(event.target.value);
    };

    const handleAddTask = () => {
        setTasks((prevTasks) => [
            ...prevTasks,
            { id: tasks.length + 1, title: input, completed: false }
        ]);
        setInput('');
        handleShowModal();
    };

    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
    };

    const handleDoneTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleEditTask = ({ id, title }) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, title } : task
        );
        setTasks(updatedTasks);
    };

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleClearAllTasks = () => {
        setTasks([]);
        localStorage.removeItem('tasks');
    };

    useEffect(() => {
        // Save tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') {
            return task.title.toLowerCase().includes(search.toLowerCase());
        } else if (filter === 'completed') {
            return task.completed && task.title.toLowerCase().includes(search.toLowerCase());
        } else if (filter === 'notCompleted') {
            return !task.completed && task.title.toLowerCase().includes(search.toLowerCase());
        }
        return true;
    });

    return (
        <>
            {showModal && (
                <Modal handleShow={handleShowModal}>
                    <Input
                        placeholder={'Добавить таск'}
                        onChangeInput={onChangeInput}
                        value={input}
                    />
                    <Button onClick={handleAddTask} text={'добавить'} />
                </Modal>
            )}
            <Input
                placeholder={'Поиск тасков'}
                onChangeInput={(e) => handleSearch(e.target.value)}
                value={search}
            />
            <select onChange={handleFilterChange} value={filter}>
                <option value="all">Все таски</option>
                <option value="completed">Выполненные</option>
                <option value="notCompleted">Не выполненные</option>
            </select>
            <Button onClick={handleShowModal} text={'открыть'} />
            <Button onClick={handleClearAllTasks} text={'очистить все таски'} />
            <List
                tasks={filteredTasks}
                handleDelete={handleDeleteTask}
                handleDone={handleDoneTask}
                handleEdit={handleEditTask}
            />
        </>
    );
}

export default App;
