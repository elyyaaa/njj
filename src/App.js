import './App.css';
import Modal from "./components /modal/Modal";
import List from "./components /list/List";
import {useState, useEffect} from "react";
import Input from "./components /input/Input";
import {Button} from "./components /button/Button";
import Pagination from "./components /pagination /Pagination";
import PokemonCard from "./components /pokemonCard/PokemonCard";

function App() {
    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pokemonList, setPokemonList] = useState([]);

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

    const handleNext = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrev = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`
                );
                const result = await response.json();
                setTasks(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page, limit]);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch(
                    'https://pokeapi.co/api/v2/pokemon'
                );
                const data = await response.json();
                setPokemonList(data.results);
            } catch (error) {
                console.error('Error fetching Pokemon list:', error);
            }
            setLimit(20)
        };

        fetchPokemonList();
    }, []);

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
            <Pagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                page={page}
            />
            {pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}

        </>
    );
}

export default App;
