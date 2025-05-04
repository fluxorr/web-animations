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
      <div className=' flex items-center flex-col' >
        <div className='text-6xl font-serif' >Lorem, ipsum dolor.</div>
        <div className='text-4xl font-mono py-8 ' > Sticky cursor v0.1 </div>
        <div className=' text-xs py-8' >inspo by: Oliver Larose</div>
      </div>
    </div>
  );
};

export default App;