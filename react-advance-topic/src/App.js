import logo from './logo.svg';
import './App.css';
import Hero from './components/Hero';
import ErrorBoundary from './ErrorBoundary';
import RefsDemo from './components/RefsDemo';
import FocusInput from './components/FocusInput';
import FRParentInput from './components/FRParentInput';
import PortalDemo from './components/PortalDemo';
import HoverCounter from './components/HoverCounter';
import ClickCounter from './components/ClickCounter';
import Counter from './components/Counter';
import HoverCounterTwo from './components/HoverCounterTwo';
import ClickCounterTwo from './components/ClickCounterTwo'
import ParentComponent from './components/callback/ParentComponent';
import CounterMemo from './components/memo/Counter';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
      <Hero heroName='Thor' />
      </ErrorBoundary>
      <ErrorBoundary>
      <Hero heroName='Captain America' />
      </ErrorBoundary>
      <ErrorBoundary>
      <Hero heroName='Joker' />
      </ErrorBoundary>
      <hr />
      REfs
      <RefsDemo />
      <br />
      <hr />
      <br />
      <FocusInput />
      <br />
      <hr />
      <br />
      FORWARDING REFs
      <FRParentInput />
      <br />
      <hr />
      <PortalDemo />
      <br />
      <hr />
      <h1>Higher Order Components</h1>
      <br />
      <HoverCounter />
      <hr />
      <br />
      <ClickCounter />
      <br />
      <hr />
      <h1>Render Props</h1>
      <br />
      <Counter render={(count,incrementCount)=>  <HoverCounterTwo count={count} incrementCount= {incrementCount} />} />
      <br />
      <hr />
      <Counter render={(count,incrementCount)=>  <ClickCounterTwo count={count} incrementCount= {incrementCount} />} />
      <br />
      <hr />
      <h1>useCallback Hook</h1>
      <br />
      <ParentComponent />
      <br />
      <hr />
      <h1>useMemo Hook</h1>
      <br />
     <CounterMemo />
    </div>
  );
}

export default App;
