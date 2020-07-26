import './App.scss';
import React, { ReactElement } from 'react';
import Input from './components/Input';
import MapboxGLMap from './components/MapboxGLMap';
const App: React.FC = (): ReactElement => <><MapboxGLMap/><Input /></>;

export default App;
