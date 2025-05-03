import { useRef, useState } from 'react';
import { Header } from './components/Header';
import { Cursor } from './components/Cursor';

const App = () => {
  const stickyElement = useRef(null);
  const [isHovered, setHovered] = useState(false);

  return (
    <div>
      <Header ref={stickyElement} isHovered={isHovered} />
      <Cursor
        stickyElement={stickyElement}
        isHovered={isHovered}
        setHovered={setHovered}
      />
    </div>
  );
};

export default App;