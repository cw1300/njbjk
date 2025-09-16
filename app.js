// Simple App Component that only renders Landing
const App = () => {
    return (
        <div className="App">
            <Landing />
        </div>
    );
};

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);