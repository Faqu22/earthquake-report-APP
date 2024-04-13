import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventList from './EventList';
import {NextUIProvider} from "@nextui-org/react";

// ... otros imports

function App() {  
    return (

        <BrowserRouter>
            <NextUIProvider>
            <Routes>

                    <Route path="/" element={<EventList />} />
            </Routes>
            </NextUIProvider>

        </BrowserRouter>

    );
}
export default App;