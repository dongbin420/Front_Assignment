import DragAndDrop from './components/DragAndDrop/DragAndDrop';
import DndProvider from './components/DragAndDrop/DndProvider/DndProvider';

function App() {
  return (
    <DndProvider>
      <DragAndDrop />
    </DndProvider>
  );
}

export default App;
